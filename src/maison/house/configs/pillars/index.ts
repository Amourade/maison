import * as THREE from 'three'
import { materials } from './assetsRefs'
import { pillarsDimensions as dimensions, pillarsPosition as position } from '../index'

const getPillars = (): Array<WallObject> => {
  const array: Array<WallObject> = []
  for (let i = 0; i < dimensions.pillarAmount; i++) {
    array.push(
      {
        dimensions: {
          width: dimensions.pillarWidth,
          height: dimensions.height,
          depth: dimensions.pillarDepth,
          ceilingDepth: 0,
          wallDepth: 0
        },
        position: new THREE.Vector3(
          dimensions.width / 2,
          0,
          i * (dimensions.pillarDepth + dimensions.pillarDistance)
        ),
        rotation: -Math.PI / 2,
        material: materials.walls,
        borderMaterial: undefined,
        hole: []
      },
      {
        dimensions: {
          width: dimensions.pillarWidth,
          height: dimensions.height,
          depth: dimensions.pillarDepth,
          ceilingDepth: 0,
          wallDepth: 0
        },
        position: new THREE.Vector3(
          -dimensions.width / 2,
          0,
          i * (dimensions.pillarDepth + dimensions.pillarDistance)
        ),
        rotation: Math.PI / 2,
        material: materials.walls,
        borderMaterial: undefined,
        hole: []
      }
    )
  }

  return array
}

export const config: RoomConfig = {
  walls: getPillars(),
  ceiling: undefined,
  floor: undefined,
  name: 'pillars',
  position: position.clone()
}

export const geometry = new THREE.Group()
