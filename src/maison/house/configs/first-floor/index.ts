import * as THREE from 'three'
import { materials } from './assetsRefs'
import { firstFloorDimensions as dimensions, wallsWidthOffset, entranceRightDimensions } from '..'

export const config: RoomConfig = {
  walls: [
    {
      dimensions: {
        width: dimensions.width + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      position: new THREE.Vector3(0, 0, dimensions.depth / 2),
      rotation: Math.PI,
      material: materials.outerWalls,
      borderMaterial: materials.windowsill,
      hole: [
        {
          type: 'door',
          height: 35,
          width: 30,
          position: { x: 4 / 5, y: 0 },
          material: materials.doors,
          name: 'backDoor'
        },
        {
          type: 'window',
          height: 20,
          width: 50,
          position: { x: 1 / 2, y: 3 / 4 },
          hasBorders: true
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.width + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      position: new THREE.Vector3(0, 0, -dimensions.depth / 2),
      rotation: 0,
      material: materials.outerWalls,
      borderMaterial: materials.windowsill,
      hole: [
        {
          type: 'door',
          height: 35,
          width: 50,
          position: { x: 1 / 2, y: 0 },
          material: materials.doors,
          name: 'frontDoor'
        },
        {
          type: 'window',
          height: 20,
          width: 20,
          position: { x: 7 / 8, y: 2 / 3 },
          hasBorders: true
        },
        {
          type: 'window',
          height: 20,
          width: 20,
          position: { x: 1 / 8, y: 2 / 3 },
          hasBorders: true
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.depth + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        wallDepth: 0,
        ceilingDepth: 0
      },
      position: new THREE.Vector3(dimensions.width / 2, 0, 0),
      rotation: -Math.PI / 2,
      material: materials.outerWalls,
      borderMaterial: materials.windowsill,
      hole: [
        {
          type: 'window',
          height: 20,
          width: 50,
          position: { x: 3 / 5, y: 2 / 3 },
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
      position: new THREE.Vector3(-dimensions.width / 2, 0, 0),
      rotation: Math.PI / 2,
      material: materials.outerWalls,
      borderMaterial: materials.windowsill,
      hole: [
        {
          type: 'window',
          height: 20,
          width: 50,
          position: { x: 3 / 5, y: 2 / 3 },
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
      position: new THREE.Vector3(
        -dimensions.width / 2 + entranceRightDimensions.width + dimensions.wallDepth / 2,
        0,
        0
      ),
      rotation: -Math.PI / 2,
      material: materials.wallRight,
      borderMaterial: materials.windowsill,
      hole: [
        {
          type: 'door',
          height: 40,
          width: 25,
          position: { x: 1 / 8, y: 0 },
          material: materials.doorsDivision,
          name: 'doorBackRight'
        }
      ]
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
  name: 'firstFloorMainRoom',
  position: undefined
}

export const geometry = new THREE.Group()
