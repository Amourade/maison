import * as THREE from 'three'
import { app } from '@/maison/app'
import { PlanMesh } from '@/maison/house/scripts/planMesh'
import type { MovingActor } from './movingActor'
import type { FlowerActor } from '@/maison/nature/scripts/flowerActor'
import type { RotatingHeads } from '../heads'

const groundRay: THREE.Raycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, -1, 0),
  0,
  20
)
export const snapToGround = (obj: MovingActor | FlowerActor | RotatingHeads) => {
  //Two ray casting, one for ground snapping and one for space grid detection
  obj.position.y += 5
  groundRay.ray.origin.copy(obj.position)

  //Grid Detection
  const Gridintersections = groundRay.intersectObjects(app.PLANS.all)

  if (Gridintersections.length > 0 && Gridintersections[0].object instanceof PlanMesh) {
    obj.grid = Gridintersections[0].object
  }

  //Ground snapping
  const Groundintersections = groundRay.intersectObjects(app.INTERACTIONS.grounds)

  if (Groundintersections.length > 0) {
    const intersected = Groundintersections[0]

    obj.position.y = intersected.point.y + obj.snapOffset
    obj.snapped = true

    return
  }

  obj.position.y -= 5
}
