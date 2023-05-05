import * as THREE from 'three'
import { materials } from './assetsRefs'
import { entranceLeftDimensions as dimensions, entranceLeftPosition as position } from '../../..'

const wallsWidthOffset = dimensions.wallDepth - 0.1

export const config: RoomConfig = {
  walls: [
    {
      dimensions: {
        width: dimensions.width + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
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
          name: 'doorLeftRoom'
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.width + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.walls,
      borderMaterial: materials.frame,
      position: new THREE.Vector3(0, 0, -dimensions.depth / 2),
      rotation: 0,
      hole: [
        {
          type: 'window',
          height: 20,
          width: 20,
          position: { x: 1.06 / 3, y: 2 / 3 },
          hasBorders: false
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.depth + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.walls,
      borderMaterial: materials.frame,
      position: new THREE.Vector3(-dimensions.width / 2, 0, 0),
      rotation: Math.PI / 2,
      hole: [
        {
          type: 'hole',
          height: dimensions.height - 7,
          width: dimensions.depth - 60,
          position: { x: 1 / 2, y: 0 },
          hasBorders: true,
          name: 'holeLeftRoom'
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.depth + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.walls,
      borderMaterial: materials.frame,
      position: new THREE.Vector3(dimensions.width / 2, 0, 0),
      rotation: -Math.PI / 2,
      hole: [
        {
          type: 'window',
          height: 20,
          width: 50,
          position: { x: 0.97 / 3, y: 2 / 3 },
          hasBorders: false
        }
      ]
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
  name: 'roomEntranceLeft',
  position: position.clone()
}

export const geometry = new THREE.Group()
