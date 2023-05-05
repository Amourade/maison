import { app } from '@/maison/app'
import { Doors, LeftDoor, RightDoor } from '@/maison/house/scripts/doors'
import * as THREE from 'three'

export class Painting extends THREE.Mesh {
  raycaster: THREE.Raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, -1),
    0,
    20
  )
  held: boolean = false
  snapped: boolean = false
  falling: boolean = false
  fallingSpeed: number = 5
  heldRotation: number = 0
  heldRotationIncrement: number = 0.005
  dimensions!: any

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

    app.INTERACTIONS.interactives.push(this)
    app.INTERACTIONS.paintings.push(this)
    app.ANIMATED.push(this)
  }

  interact = () => {
    this.held = !this.held
    this.fallingSpeed = 5
  }

  animate = () => {
    if (!this.held) {
      if (!this.snapped) this.snap()
      return
    }

    const vector = new THREE.Vector3(0, 0, -1)
    vector.applyEuler(app.SCENE.camera.rotation)
    vector.setLength(11)

    let scalingFactor: number
    //regle de troie pour une largeur de 5.5 unitées;
    if (this.dimensions.x < this.dimensions.y) {
      scalingFactor = 6 / this.dimensions.y
    } else {
      scalingFactor = 6 / this.dimensions.x
    }
    this.scale.set(scalingFactor, scalingFactor, scalingFactor)
    vector.add(app.SCENE.camera.position)

    this.position.set(vector.x, vector.y, vector.z)

    this.lookAt(app.SCENE.camera.position)
    this.rotateZ(this.heldRotation)
    this.rotateX(-this.heldRotation)

    if (this.heldRotation >= 0.15) this.heldRotationIncrement = -this.heldRotationIncrement

    if (this.heldRotation <= -0.15) this.heldRotationIncrement = -this.heldRotationIncrement

    this.heldRotation += this.heldRotationIncrement

    this.snapped = false
  }

  snap = () => {
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

      return
    }

    //Fall to the ground
    this.position.y += 2
    this.falling = true
  }
}
