import * as THREE from 'three'

export class PlanMesh extends THREE.Mesh {
  linksTo!: LinksArray
  space!: Space
  cameraAnchors!: Array<THREE.Mesh>
  constructor(
    plane: THREE.PlaneGeometry,
    material: THREE.MeshBasicMaterial,
    links: LinksArray,
    space: Space
  ) {
    super(plane, material)
    this.linksTo = links
    this.space = space
  }
}
