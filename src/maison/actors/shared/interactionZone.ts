import { app } from '@/maison/app'
import * as THREE from 'three'

export class InteractionZone extends THREE.Mesh {
  constructor(size: THREE.Vector2, position: THREE.Vector3) {
    super(
      new THREE.PlaneGeometry(size.x, size.y, 5, 5),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        visible: true /* app.DEBUG.grids */
      })
    )

    this.position.copy(position)
    this.rotateX(-Math.PI / 2)
  }
}
