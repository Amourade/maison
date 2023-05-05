import * as THREE from 'three'
import { materials } from './assetsRefs'

interface paintingConfig {
  material: any
  dimensions: THREE.Vector3
  position: THREE.Vector3
  rotation: THREE.Vector3
}

export const config: Array<paintingConfig> = [
  {
    material: materials.ver,
    dimensions: new THREE.Vector3(5.5, 3.5, 0.5),
    position: new THREE.Vector3(-35, 15, 36),
    rotation: new THREE.Vector3(1.45, 1.21, -1.45)
  },
  {
    material: materials.sommeil,
    dimensions: new THREE.Vector3(36, 18, 1),
    position: new THREE.Vector3(140, 25, -84),
    rotation: new THREE.Vector3(0, -1.56, 0)
  },
  {
    material: materials.epee,
    dimensions: new THREE.Vector3(12, 10, 0.75),
    position: new THREE.Vector3(0, 100, 108),
    rotation: new THREE.Vector3(0, 0, 0)
  },
  {
    material: materials.anneau,
    dimensions: new THREE.Vector3(13.5, 29, 0.75),
    position: new THREE.Vector3(140, 30, 80),
    rotation: new THREE.Vector3(1.21, -1.4, 1.21)
  },
  {
    material: materials.bleu,
    dimensions: new THREE.Vector3(5.75, 2.75, 0.5),
    position: new THREE.Vector3(46, 20, 133),
    rotation: new THREE.Vector3(2.9, 0, -3.14)
  },
  {
    material: materials.cheveux,
    dimensions: new THREE.Vector3(4.5, 6, 0.5),
    position: new THREE.Vector3(111, 18, 28),
    rotation: new THREE.Vector3(0, 0, 0)
  },
  {
    material: materials.conversation,
    dimensions: new THREE.Vector3(3.5, 5.5, 0.5),
    position: new THREE.Vector3(54, 20, 163),
    rotation: new THREE.Vector3(0, 0, 0)
  },
  {
    material: materials.mouche,
    dimensions: new THREE.Vector3(6, 8, 0.5),
    position: new THREE.Vector3(-32, 22, -82),
    rotation: new THREE.Vector3(1.77, 1.33, -1.78)
  },
  {
    material: materials.murEpee,
    dimensions: new THREE.Vector3(18, 18, 0.75),
    position: new THREE.Vector3(-144, 20, 108),
    rotation: new THREE.Vector3(0.77, 1.42, -0.77)
  },
  {
    material: materials.part,
    dimensions: new THREE.Vector3(12, 9, 0.5),
    position: new THREE.Vector3(-51, 18, 34.6),
    rotation: new THREE.Vector3(0.89, -1.45, 0.89)
  },
  {
    material: materials.portrait,
    dimensions: new THREE.Vector3(10, 12, 0.5),
    position: new THREE.Vector3(-140, 18, -118.5),
    rotation: new THREE.Vector3(1.7, 0.99, -1.73)
  },
  {
    material: materials.radeau,
    dimensions: new THREE.Vector3(4.5, 6, 0.5),
    position: new THREE.Vector3(-58, 18, -110),
    rotation: new THREE.Vector3(-1.25, -1.5, -1.25)
  },
  {
    material: materials.repasMinuit,
    dimensions: new THREE.Vector3(12, 18, 1),
    position: new THREE.Vector3(-90, 82, -7.7),
    rotation: new THREE.Vector3(1.55, 1.5, -1.55)
  },
  {
    material: materials.room,
    dimensions: new THREE.Vector3(12, 12, 1),
    position: new THREE.Vector3(90, 82, -10),
    rotation: new THREE.Vector3(1.34, -1.54, 1.34)
  },
  {
    material: materials.saule,
    dimensions: new THREE.Vector3(13.5, 29, 0.3),
    position: new THREE.Vector3(130, 25, 154.7),
    rotation: new THREE.Vector3(0, 0, 0)
  }
]
