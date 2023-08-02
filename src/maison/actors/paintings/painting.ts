import { app } from '@/maison/app'
import { CustomCamera } from '@/maison/controls/camera'
import type { MovingActor } from '../shared/movingActor'
import * as THREE from 'three'

import grabSFX from '@/maison/assets/sounds/paintings/take.wav'
import placeSFX from '@/maison/assets/sounds/paintings/place.mp3'
import dropSFX from '@/maison/assets/sounds/paintings/drop.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'

const grab = {
  one: grabSFX
}
const parsedGrabSFX = parseSounds(grab)

const place = {
  one: placeSFX
}
const parsedPlaceSFX = parseSounds(place)

const drop = {
  one: dropSFX
}
const parsedDropSFX = parseSounds(drop)

export class Painting extends THREE.Mesh {
  raycaster: THREE.Raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, -1),
    0,
    20
  )
  held: boolean = false
  heldBy!: CustomCamera | MovingActor
  snapped: boolean = false
  falling: boolean = false
  fallingSpeed: number = 5
  heldRotation: number = 0
  heldRotationIncrement: number = 0.005
  dimensions!: any
  sounds: { [key: string]: Array<THREE.PositionalAudio> } = { grab: [], drop: [], place: [] }

  constructor(
    material: any,
    dimensions: THREE.Vector3,
    position: THREE.Vector3,
    rotation: THREE.Vector3
  ) {
    super(new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z), material)

    this.rotation.set(rotation.x, rotation.y, rotation.z)
    this.position.copy(position)
    this.dimensions = dimensions

    //Parse grab SFX
    Object.keys(parsedGrabSFX).forEach((key) => {
      if (parsedGrabSFX[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedGrabSFX[key])
        audio.setRefDistance(10)
        audio.loop = false
        this.sounds.grab.push(audio)
        this.add(audio)
      }
    })

    //Parse place sfx
    Object.keys(parsedPlaceSFX).forEach((key) => {
      if (parsedPlaceSFX[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedPlaceSFX[key])
        audio.setRefDistance(10)
        audio.loop = false
        this.sounds.place.push(audio)
        this.add(audio)
      }
    })

    //Parse drop sfx
    Object.keys(parsedDropSFX).forEach((key) => {
      if (parsedDropSFX[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedDropSFX[key])
        audio.setRefDistance(20)
        audio.loop = false
        this.sounds.drop.push(audio)
        this.add(audio)
      }
    })

    app.INTERACTIONS.interactives.push(this)
    app.INTERACTIONS.paintings.push(this)
    app.ANIMATED.push(this)
  }

  interact(interactor: CustomCamera | MovingActor) {
    if (!this.held) {
      this.stopSounds()
      this.sounds.grab[0].play()
    }
    this.held = true
    interactor.heldPainting = this
    this.heldBy = interactor
  }

  drop() {
    this.held = false
    this.fallingSpeed = 5
  }

  animate() {
    if (!this.held) {
      if (!this.snapped) this.snap()
      return
    }
    if (this.heldBy instanceof CustomCamera) {
      const vector = new THREE.Vector3(0, 0, -1)
      vector.applyEuler(this.heldBy.rotation)
      vector.setLength(11)

      let scalingFactor: number
      if (this.dimensions.x < this.dimensions.y) {
        scalingFactor = 6 / this.dimensions.y
      } else {
        scalingFactor = 6 / this.dimensions.x
      }
      this.scale.set(scalingFactor, scalingFactor, scalingFactor)
      vector.add(this.heldBy.position)

      this.position.set(vector.x, vector.y, vector.z)

      this.lookAt(this.heldBy.position)
      this.rotateZ(this.heldRotation)
      this.rotateX(-this.heldRotation)

      if (this.heldRotation >= 0.15) this.heldRotationIncrement = -this.heldRotationIncrement

      if (this.heldRotation <= -0.15) this.heldRotationIncrement = -this.heldRotationIncrement

      this.heldRotation += this.heldRotationIncrement
      this.snapped = false

      return
    }

    //Moving actor holding behavior
    this.heldBy.grabPoint.getWorldPosition(this.position)

    this.scale.set(1, 1, 1)

    this.lookAt(this.heldBy.position.x, this.position.y, this.heldBy.position.z)
    this.snapped = false
  }

  snap() {
    //snap to wall if close enough or fall on floor;

    //something like if a ray from the current position hits a wall in less than 5 units it snaps to it otherwise it falls
    //and snaps to the floor;
    //raycast a partir du dos->detection

    this.raycaster.ray.origin.copy(this.position)
    this.scale.set(1, 1, 1)

    if (this.falling) {
      this.position.y -= this.fallingSpeed * app.SCENE.delta
      this.fallingSpeed += 5

      const vector = new THREE.Vector3(0, -1, 0)
      this.raycaster.ray.direction.copy(vector)

      const intersections = this.raycaster.intersectObjects(app.INTERACTIONS.grounds)
      if (intersections.length === 0 || intersections[0].distance >= 3) return

      //fall over

      this.rotation.x = -Math.PI / 2
      this.rotation.z = this.rotation.y
      this.rotation.y = 0
      this.position.y = intersections[0].point.y
      this.falling = false
      this.snapped = true
      this.stopSounds()
      this.sounds.drop[0].play()

      return
    }

    /**
     * Set Vector for wall detection
     */
    const vector = new THREE.Vector3(0, 0, -1)
    vector.applyEuler(this.rotation)
    vector.normalize()

    this.raycaster.ray.direction.copy(vector)
    const intersections = this.raycaster.intersectObjects(app.INTERACTIONS.walls)

    if (
      this.falling === false &&
      intersections.length > 0 &&
      intersections[0].object.name === 'wall'
    ) {
      /**
       * We have a wall to snap to
       * We find it,
       */

      const intersected = intersections[0]

      this.position.x = intersected.point.x
      this.position.y = intersected.point.y
      this.position.z = intersected.point.z

      this.rotation.x = 0
      this.rotation.z = 0

      this.rotation.y = intersected.object.parent!.rotation.y

      if (intersected.face!.normal.z < 0) {
        this.rotation.y += Math.PI
      }
      if (intersected.face!.normal.x < 0) {
        this.rotation.y -= Math.PI / 2
      }
      if (intersected.face!.normal.x > 0) {
        this.rotation.y += Math.PI / 2
      }

      this.snapped = true
      this.stopSounds()
      this.sounds.place[0].play()

      return
    }

    //Fall to the ground
    this.position.y += 2
    this.falling = true
  }

  stopSounds() {
    for (const key in this.sounds) {
      this.sounds[key].forEach((sound) => {
        sound.stop()
      })
    }
  }
}
