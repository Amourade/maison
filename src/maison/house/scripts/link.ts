import * as THREE from 'three'
import { app } from '@/maison/app'

export class Link extends THREE.Object3D {
  links!: Array<string>
  constructor() {
    super()
  }

  makeDoorLinks = (width: number, position: Array<number>) => {
    const plane = new THREE.PlaneGeometry(width, 5, 10, 10)
    plane.rotateX(Math.PI / 2)

    const entry = new THREE.Mesh(
      plane,
      new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    )
    entry.visible = app.DEBUG.general
    entry.position.z += position[0]
    entry.position.y -= position[1]
    entry.name = 'positive'
    this.add(entry)

    const exit = new THREE.Mesh(
      plane,
      new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    )
    exit.visible = app.DEBUG.general
    exit.position.z -= position[0]
    exit.position.y -= position[1]
    exit.name = 'negative'
    this.add(exit)
  }
}
