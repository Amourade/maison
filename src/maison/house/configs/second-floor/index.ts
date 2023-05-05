import * as THREE from 'three'
import { materials } from './assetsRefs'
import { secondFloorDimensions as dimensions, secondFloorPosition as position } from '..'

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
      position: new THREE.Vector3(0, 0, dimensions.depth / 2),
      rotation: Math.PI,
      material: materials.outerWalls,
      borderMaterial: materials.frame,
      hole: [
        {
          type: 'door',
          width: 20,
          height: 25,
          position: { x: 1 / 2, y: 0 },
          material: materials.doors,
          name: 'doorSecondFloor'
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
      position: new THREE.Vector3(0, 0, -dimensions.depth / 2),
      material: materials.outerWalls,
      borderMaterial: materials.frame,
      rotation: 0,
      hole: [
        {
          type: 'window',
          width: 100,
          height: 15,
          position: { x: 1 / 2, y: 2 / 3 },
          hasBorders: true
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
      position: new THREE.Vector3(dimensions.width / 2, 0, 0),
      rotation: -Math.PI / 2,
      material: materials.outerWalls,
      borderMaterial: undefined,
      hole: []
    },
    {
      dimensions: {
        width: dimensions.depth + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      position: new THREE.Vector3(-dimensions.width / 2, 0, 0),
      rotation: Math.PI / 2,
      material: materials.outerWalls,
      borderMaterial: undefined,
      hole: []
    }
  ],
  ceiling: {
    dimensions: {
      width: dimensions.width + dimensions.wallDepth * 2,
      height: dimensions.ceilingDepth,
      depth: dimensions.depth + dimensions.wallDepth * 2
    },
    material: materials.ceiling,
    position: new THREE.Vector3(0, dimensions.height, 0),
    isGround: true
  },
  floor: {
    dimensions: {
      width: dimensions.width,
      height: 1,
      depth: dimensions.depth
    },
    material: materials.floor,
    position: new THREE.Vector3(0, 0.05, 0),
    isGround: true
  },
  name: 'secondFloor',
  position: position.clone()
}

export const geometry = new THREE.Group()
