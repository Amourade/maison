import * as THREE from 'three'

export class CustomMaterial extends THREE.MeshBasicMaterial {
  fullWidth: boolean
  constructor(
    mat: { color: number; reflectivity: number; map: THREE.Texture },
    fullWidth: boolean
  ) {
    super(mat)

    this.fullWidth = fullWidth
  }
}
