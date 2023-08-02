import * as THREE from 'three'
import { app } from '../app'
import face1 from '@/maison/assets/textures/heads/1.webp'
import face2 from '@/maison/assets/textures/heads/2.webp'
import face3 from '@/maison/assets/textures/heads/3.webp'
import side from '@/maison/assets/textures/pilliers.jpg'
import { parseImages } from '../scripts/parseAssets'
import { secondFloorDimensions } from '../house/configs'
import type { PlanMesh } from '../house/scripts/planMesh'
import { CustomCamera } from '../controls/camera'
import type { MovingActor } from './shared/movingActor'
import { snapToGround } from './shared/snapToGround'
//import { InteractionZone } from './shared/interactionZone'
import spin from '@/maison/assets/sounds/heads/spin.mp3'
import result1 from '@/maison/assets/sounds/heads/1.mp3'
import result2 from '@/maison/assets/sounds/heads/2.mp3'
import result3 from '@/maison/assets/sounds/heads/3.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'

const spinSFX = {
  one: spin
}

const parsedSpinSFX = parseSounds(spinSFX)

const resultsSfx = {
  one: result3,
  two: result2,
  three: result1
}

const parsedResultsSfx = parseSounds(resultsSfx)

const rawMaterials = {
  faceOne: face1,
  faceTwo: face2,
  faceThree: face3,
  side: side
}

const parsedMaterials = parseImages(rawMaterials)

export class RotatingHeads extends THREE.Group {
  movingParts: THREE.Group = new THREE.Group()
  spinning: boolean = false
  goal: number | null = null
  refVelocity: number = 0
  time: number = 0
  timeIncrement: number = 0
  velocity: number = 0
  facePosition: Array<number> = []
  interactionZone!: THREE.Mesh
  grid!: PlanMesh
  snapped: boolean = false
  snapOffset: number = 10
  groundRay: THREE.Raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    20
  )
  currentFaceIndex: number | null = null
  sounds: { [key: string]: Array<THREE.PositionalAudio> } = { spin: [], results: [] }

  constructor() {
    super()

    Object.keys(parsedSpinSFX).forEach((key) => {
      if (parsedSpinSFX[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedSpinSFX[key])
        audio.setRefDistance(20)
        audio.loop = true
        //this.add(this.sounds.open)
        this.sounds.spin.push(audio)
        this.add(audio)
      }
    })

    Object.keys(parsedResultsSfx).forEach((key) => {
      if (parsedResultsSfx[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedResultsSfx[key])
        audio.setRefDistance(20)
        audio.loop = false
        //this.add(this.sounds.open)
        this.sounds.results.push(audio)
        this.add(audio)
      }
    })

    let face: THREE.Mesh
    const facesSize = 13

    face = new THREE.Mesh(new THREE.PlaneGeometry(facesSize, facesSize), parsedMaterials.faceOne)
    this.facePosition.push(face.rotation.x)
    face.translateZ(facesSize * 0.4)
    this.movingParts.add(face)

    face = new THREE.Mesh(new THREE.PlaneGeometry(facesSize, facesSize), parsedMaterials.faceTwo)
    face.rotateX(-(Math.PI / 3) * 2)
    this.facePosition.push(face.rotation.x)
    face.translateZ(facesSize * 0.4)
    this.movingParts.add(face)

    face = new THREE.Mesh(new THREE.PlaneGeometry(facesSize, facesSize), parsedMaterials.faceThree)
    face.rotateX((Math.PI / 3) * 2)
    this.facePosition.push(face.rotation.x)
    face.translateZ(facesSize * 0.4)
    this.movingParts.add(face)

    //Sides
    let side: THREE.Mesh

    side = new THREE.Mesh(
      new THREE.CylinderGeometry(facesSize * 0.8 - 0.2, facesSize * 0.8 - 0.2, 1, 3, 1),
      parsedMaterials.side
    )
    side.rotateX(Math.PI / 2)
    side.rotateZ(Math.PI / 2)
    side.rotateY(Math.PI / 6)
    side.translateY(facesSize / 2 - 0.5)
    this.movingParts.add(side)

    side = side.clone()
    side.translateY(-facesSize + 1)
    this.movingParts.add(side)

    this.add(this.movingParts)

    //Poles

    let pole: THREE.Mesh

    pole = new THREE.Mesh(
      new THREE.CylinderGeometry(
        1,
        1,
        (secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2) / 2,
        10,
        1
      ),
      parsedMaterials.side
    )
    pole.rotateZ(Math.PI / 2)
    pole.translateY((secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2) / 4 + 5)
    this.movingParts.add(pole)

    pole = pole.clone()
    pole.translateY(-((secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2) / 2 + 10))
    this.movingParts.add(pole)

    this.position.set(0, 77, -70)
    this.name = 'rotatingHeads'

    snapToGround(this)

    // Interaction Zone

    this.interactionZone = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 5, 5),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        visible: app.DEBUG.grids
      })
    )

    this.interactionZone.position.set(0, -this.snapOffset + 5, 10)
    this.interactionZone.rotateX(-Math.PI / 2)

    this.add(this.interactionZone)

    app.INTERACTIONS.interactives.push(this)
    app.INTERACTIONS.actors.heads = this
    app.ANIMATED.push(this)
  }

  snapToGround() {
    //Two ray casting, one for ground snapping and one for space grid detection
    this.position.y += 5
    this.groundRay.ray.origin.copy(this.position)

    //Ground snapping
    const Groundintersections = this.groundRay.intersectObjects(app.INTERACTIONS.grounds)

    if (Groundintersections.length > 0) {
      const intersected = Groundintersections[0]

      this.position.y = intersected.point.y + this.snapOffset
      this.snapped = true

      return
    }

    this.position.y -= 5
  }

  interact(interactor: CustomCamera | MovingActor) {
    if (this.spinning && interactor instanceof CustomCamera) return
    this.spinning = true
    this.refVelocity = interactor instanceof CustomCamera ? 0.01 : Math.random() * 0.7 + 1
    this.time = interactor instanceof CustomCamera ? this.refVelocity : this.refVelocity * 100
    this.timeIncrement = 100 / this.time
    this.velocity = this.refVelocity
    this.goal = null
    this.currentFaceIndex = null
    this.sounds.spin[0].play()
  }

  animate() {
    if (!this.spinning) return

    this.velocity > 1
      ? this.sounds.spin[0].setPlaybackRate(1)
      : this.velocity < 0.2
      ? this.sounds.spin[0].setPlaybackRate(0.2)
      : this.sounds.spin[0].setPlaybackRate(Math.abs(this.velocity))

    if (this.velocity <= 0.005 && this.goal == null) {
      const needle = this.movingParts.rotation.x
      const closest = this.facePosition.reduce((a, b) => {
        return Math.abs(b - needle) < Math.abs(a - needle) ? b : a
      })
      this.velocity = (closest - needle) / 10
      this.goal = closest
      return
    }

    if (this.goal === null) {
      this.movingParts.rotateX(this.velocity)
      this.velocity -= 0.1 * (this.velocity / 5)
      return
    }

    const angleDiff = this.movingParts.rotation.x - this.goal
    //We are done spinning
    if (Math.abs(angleDiff) <= 0.005) {
      this.movingParts.rotation.x = this.goal
      this.spinning = false
      this.currentFaceIndex = this.facePosition.findIndex((value) => value === this.goal)
      this.sounds.spin[0].stop()
      this.stopSounds()
      this.sounds.results[Math.floor(Math.random() * this.sounds.results.length)].play()
      return
    }

    //We spin
    this.movingParts.rotateX(this.velocity)
  }

  stopSounds() {
    for (const key in this.sounds) {
      this.sounds[key].forEach((sound) => {
        sound.stop()
      })
    }
  }
}
