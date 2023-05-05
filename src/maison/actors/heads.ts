import * as THREE from 'three'
import { app } from '../app'
import face1 from '@/maison/assets/textures/face1.jpg'
import face2 from '@/maison/assets/textures/face2.jpg'
import face3 from '@/maison/assets/textures/face3.jpg'
import side from '@/maison/assets/textures/pilliers.jpg'
import { parseImages } from '../scripts/parseAssets'
import { secondFloorDimensions } from '../house/configs'
import type { PlanMesh } from '../house/scripts/planMesh'
import { snapToGround } from './shared/snapToGround'
//import { InteractionZone } from './shared/interactionZone'

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

  constructor() {
    super()

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

    /* = new InteractionZone(
      new THREE.Vector2(10, 10),
      new THREE.Vector3(0, -this.snapOffset + 5, 10)
    )

    this.add(this.interactionZone) */

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

  snapToGround = () => {
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

  interact = () => {
    this.spinning = true
    this.refVelocity = Math.random() * 0.7 + 1
    this.time = this.refVelocity * 100
    this.timeIncrement = 100 / this.time
    this.velocity = this.refVelocity
    this.goal = null
  }

  animate = () => {
    //this.interactionZone.findGrid()
    if (this.spinning === false) return

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
    if (Math.abs(angleDiff) <= 0.005) {
      this.movingParts.rotation.x = this.goal
      this.spinning = false
      return
    }

    //We spin
    this.movingParts.rotateX(this.velocity)
  }
}
