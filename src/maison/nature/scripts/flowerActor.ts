import type { MovingActor } from '@/maison/actors/shared/movingActor'
import { app } from '@/maison/app'
import { CustomCamera } from '@/maison/controls/camera'
import { PlanMesh } from '@/maison/house/scripts/planMesh'
import * as THREE from 'three'

export class FlowerActor extends THREE.Group {
  //interactions related info
  ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10)
  snapped = false
  refScale!: THREE.Vector3
  height!: number
  cameraAnchor!: THREE.Mesh
  stareZone!: THREE.Mesh
  grid!: PlanMesh | undefined
  snapOffset!: number

  originalPosition = new THREE.Vector3()
  originalRotation = new THREE.Euler()

  //Grab information
  held = false
  heldBy!: MovingActor | CustomCamera | undefined
  fallingSpeed = 2
  heldRotation: THREE.Vector3 = new THREE.Vector3(
    Math.random() * 0.3 - 0.3,
    0,
    Math.random() * 0.3 - 0.3
  )
  falling: boolean = false

  stop = true

  sounds: { [key: string]: THREE.PositionalAudio } = {}

  //sway infos
  swayLimits = [-0.2, 0.2]
  swaySpeed = 0.0005
  currentSway = 0
  swayDirection

  planted = true

  constructor(model: THREE.Group, scale = new THREE.Vector3(1, 1, 1)) {
    super()

    model.scale.copy(scale)
    const height = this.getActorHeight(model)

    const swayMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, height * 2, 1),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    model.position.y += height / 2
    swayMesh.add(model)
    //this.flower = model

    this.add(swayMesh)
    this.refScale = scale
    this.height = height

    //sway informations
    this.swayDirection = new THREE.Vector3(Math.random(), 0, Math.random())
    this.currentSway = Math.random() * this.swayLimits[1] - this.swayLimits[1]

    app.ANIMATED.push(this)
  }

  getActorHeight(model: THREE.Group) {
    const box = new THREE.Box3().setFromObject(model)
    return box.max.y - box.min.y
  }

  makeCameraAnchor(position: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    )
    mesh.position.z += position.z
    mesh.position.y += position.y
    mesh.position.x += position.x
    this.add(mesh)
    this.cameraAnchor = mesh
    app.DEBUG.helpers.push(mesh)
  }

  makeStareZone(position: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    )
    mesh.position.z += position.z
    mesh.position.y += position.y
    mesh.position.x += position.x
    this.add(mesh)
    this.stareZone = mesh
    app.DEBUG.helpers.push(mesh)
  }

  snapToGround() {
    //Two ray casting, one for ground snapping and one for space grid detection
    this.position.y += 5
    this.ray.ray.origin.copy(this.position)

    //Grid Detection
    const gridIntersections = this.ray.intersectObjects(app.PLANS.all)

    if (gridIntersections.length > 0 && gridIntersections[0].object instanceof PlanMesh) {
      this.grid = gridIntersections[0].object
    } else {
      this.grid = undefined
    }

    //Ground snapping
    const Groundintersections = this.ray.intersectObjects(app.INTERACTIONS.grounds)

    if (Groundintersections.length > 0) {
      const intersected = Groundintersections[0]

      this.position.y = intersected.point.y + this.snapOffset
      this.snapped = true

      return
    }

    this.position.y -= 5
  }

  throw() {
    this.ray.ray.origin.copy(this.position)

    if (this.falling) {
      this.position.y -= this.fallingSpeed * app.SCENE.delta
      this.fallingSpeed += 1

      const vector = new THREE.Vector3(0, -1, 0)
      this.ray.ray.direction.copy(vector)

      const intersections = this.ray.intersectObjects(app.INTERACTIONS.grounds)

      if (intersections.length === 0 || intersections[0].distance >= 2 || this.fallingSpeed < 0)
        return

      //fall over
      this.rotation.x = -Math.PI / 2
      //this.rotation.z = this.rotation.y;
      this.rotation.z = Math.random() * Math.PI
      this.rotation.y = 0
      this.position.y = intersections[0].point.y
      this.sounds.fall.play()

      //Grid Detection
      const Gridintersections = this.ray.intersectObjects(app.PLANS.all)

      if (Gridintersections.length > 0 && Gridintersections[0].object instanceof PlanMesh) {
        this.grid = Gridintersections[0].object
      }

      console.log(Gridintersections)

      this.falling = false
      this.snapped = true

      return
    }

    this.fallingSpeed = -50
    this.falling = true
  }

  reset() {
    this.position.copy(this.originalPosition)
    this.rotation.copy(this.originalRotation)
    this.snapToGround()
    this.held = false
    this.heldBy = undefined
  }

  animate() {
    /* if (this.cameraAnchor) this.cameraAnchor.updateMatrixWorld();
        if (this.stareZone) this.stareZone.updateMatrixWorld(); */
    if (this.position.y < -50) this.reset()

    if (this.planted) {
      this.currentSway += this.swaySpeed
      this.rotateOnWorldAxis(this.swayDirection, this.swaySpeed)
      if (
        (this.currentSway <= this.swayLimits[0] && this.swaySpeed < 0) ||
        (this.currentSway >= this.swayLimits[1] && this.swaySpeed > 0)
      )
        this.swaySpeed *= -1

      return
    }

    if (this.held && this.heldBy) {
      const position = this.heldBy.grabPoint.getWorldPosition(new THREE.Vector3())
      this.position.set(position.x, position.y, position.z)
      this.translateY(-this.height * 0.5)

      this.rotation.setFromQuaternion(
        this.heldBy.grabPoint.getWorldQuaternion(new THREE.Quaternion())
      )

      this.rotateX(this.heldRotation.x)
      this.rotateZ(this.heldRotation.z)

      if (this.heldBy instanceof CustomCamera) {
        //Custom Camera Movement More like Painting?

        return
      }

      return
    }

    if (!this.snapped) {
      this.throw()
    }
  }

  //Camera interactions
  interact() {
    console.log(this.heldBy)
    if (!this.held) {
      this.held = true
      this.planted = false
      this.heldBy = app.SCENE.camera
      this.snapped = false
      this.sounds.pluck.play()
      return
    }
    if (this.heldBy instanceof CustomCamera) {
      this.drop()
      return
    }
    //Code flower stealing
    if (this.held && this.heldBy) {
      const holdingIndex = this.heldBy?.heldObjects.findIndex((element) => element.id === this.id)
      this.heldBy.heldObjects.splice(holdingIndex, 1)
      this.held = true
      this.planted = false
      this.heldBy = app.SCENE.camera
      this.snapped = false
      return
    }
  }

  plant() {
    this.planted = true
    this.held = false
    this.rotation.copy(this.originalRotation)
    this.currentSway = 0
    this.sounds.plant.play()
    this.snapToGround()
  }

  grab(by: MovingActor) {
    this.held = true
    this.planted = false
    this.heldBy = by
    this.snapped = false
    this.sounds.pluck.play()
  }

  drop() {
    this.heldBy = undefined
    this.held = false
  }
}
