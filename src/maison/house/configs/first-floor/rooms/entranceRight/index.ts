import * as THREE from 'three'
import { materials } from './assetsRefs'
import { entranceRightDimensions as dimensions, entranceRightPosition as position } from '../../..'

export const config: RoomConfig = {
  walls: [
    {
      dimensions: {
        width: dimensions.width,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      material: materials.walls,
      borderMaterial: materials.frame,
      position: new THREE.Vector3(0, 0, dimensions.depth / 2),
      rotation: Math.PI,
      hole: [
        {
          type: 'door',
          height: 35,
          width: 20,
          material: materials.doors,
          position: { x: 1 / 3, y: 0 },
          name: 'doorRightRooms'
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.width,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      material: materials.walls,
      position: new THREE.Vector3(0, 0, -dimensions.depth / 2),
      borderMaterial: undefined,
      rotation: 0,
      hole: [
        {
          type: 'window',
          height: 20,
          width: 20,
          position: { x: 1.95 / 3, y: 2 / 3 },
          hasBorders: false
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.depth,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      material: materials.walls,
      position: new THREE.Vector3(-dimensions.width / 2, 0, 0),
      rotation: Math.PI / 2,
      borderMaterial: undefined,
      hole: []
    },
    {
      dimensions: {
        width: dimensions.depth,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      material: materials.walls,
      borderMaterial: undefined,
      position: new THREE.Vector3(dimensions.width / 2 - dimensions.wallDepth / 2, 0, 0),
      rotation: -Math.PI / 2,
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
  name: 'roomEntranceRight',
  position: position.clone()
}

export const geometry = new THREE.Group()
