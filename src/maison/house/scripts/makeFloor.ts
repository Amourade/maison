import { app } from '@/maison/app'
import * as THREE from 'three'

export const makeFloor = (config: FloorObject): THREE.Mesh => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(
      config.dimensions.width,
      config.dimensions.height,
      config.dimensions.depth
    ),
    config.material
  )
  mesh.position.y = config.position.y
  if (config.isGround) app.INTERACTIONS.grounds.push(mesh)

  return mesh
}
