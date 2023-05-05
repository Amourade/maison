import * as THREE from 'three'
import { materials } from './assetsRefs'
import { gardenDimensions as dimensions, gardenPosition as position } from '..'

const wallsWidthOffset = dimensions.wallDepth - 0.1

export const config: RoomConfig = {
  walls: [
    {
      dimensions: {
        height: dimensions.height,
        width: dimensions.width + wallsWidthOffset,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      position: new THREE.Vector3(0, 0, dimensions.depth / 2),
      rotation: Math.PI,
      material: materials.fence,
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
      position: new THREE.Vector3(dimensions.width / 2, 0, 0),
      rotation: -Math.PI / 2,
      material: materials.fence,
      borderMaterial: undefined,
      hole: []
    },
    {
      dimensions: {
        height: dimensions.height,
        depth: dimensions.wallDepth,
        width: dimensions.depth / 2 + wallsWidthOffset,
        ceilingDepth: 0,
        wallDepth: 0
      },
      material: materials.fence,
      borderMaterial: undefined,
      position: new THREE.Vector3(-dimensions.width / 2, 0, dimensions.depth / 4),
      rotation: Math.PI / 2,
      hole: []
    },
    {
      dimensions: {
        height: dimensions.height,
        width: dimensions.leftFenceWidth + wallsWidthOffset,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      position: new THREE.Vector3(
        dimensions.width / 2 - dimensions.leftFenceWidth / 2,
        0,
        -dimensions.depth / 2
      ),
      material: materials.fence,
      borderMaterial: undefined,
      rotation: 0,
      hole: [
        {
          type: 'hole',
          width: 40,
          height: dimensions.height,
          position: { x: 1 / 2, y: 0 },
          hasBorders: false,
          name: 'doorGardenLeft'
        }
      ]
    },
    {
      dimensions: {
        width: dimensions.rightFenceWidth + wallsWidthOffset,
        height: dimensions.height,
        depth: dimensions.wallDepth,
        ceilingDepth: 0,
        wallDepth: 0
      },
      position: new THREE.Vector3(-dimensions.width / 2 + dimensions.rightFenceWidth / 2, 0, 0),
      material: materials.fence,
      borderMaterial: undefined,
      rotation: 0,
      hole: [
        {
          type: 'hole',
          width: 15,
          height: dimensions.height,
          position: { x: 1 / 2, y: 0 },
          hasBorders: false,
          name: 'doorGardenRight'
        }
      ]
    }
  ],
  ceiling: undefined,
  floor: undefined,
  name: 'garden',
  position: position.clone()
}

export const geometry = new THREE.Group()
