import * as THREE from 'three'
import { materials } from './assetsRefs'
import { backRightDimensions as dimensions, backRightPosition as position } from '../../..'

export const config: RoomConfig = {
  walls: [
    {
      dimensions: {
        width: dimensions.depth,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.walls,
      borderMaterial: undefined,
      position: new THREE.Vector3(-dimensions.width / 2, 0, 0),
      rotation: Math.PI / 2,
      hole: [
        {
          type: 'window',
          width: 50,
          height: 20,
          position: { x: 1.2 / 3, y: 2 / 3 },
          hasBorders: false
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.width,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.walls,
      borderMaterial: undefined,
      position: new THREE.Vector3(0, 0, dimensions.depth / 2),
      rotation: Math.PI,
      hole: []
    }
  ],
  ceiling: undefined,
  floor: {
    dimensions: {
      width: dimensions.width,
      height: 1,
      depth: dimensions.depth
    },
    material: materials.walls,
    position: new THREE.Vector3(0, 0.07, 0),
    isGround: true
  },
  name: 'roomBackRight',
  position: position.clone()
}

export const geometry = new THREE.Group()
