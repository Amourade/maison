import * as THREE from 'three'
import type { Flower } from '../nature/flower'
import type { Sunflower } from '../nature/sunflower'

export class CustomCamera extends THREE.PerspectiveCamera {
  grabPoint!: THREE.Mesh
  heldObjects: Array<Flower | Sunflower> = []

  constructor(fov: number, aspect: number, near: number, far: number, position: THREE.Vector3) {
    super(fov, aspect, near, far)

    this.position.copy(position)

    this.makeGrabArea(new THREE.Vector3(0, 0, -20))
  }

  makeGrabArea(position: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    )
    mesh.position.copy(position)
    this.add(mesh)
    this.grabPoint = mesh
  }
}
