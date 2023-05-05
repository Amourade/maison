import * as THREE from 'three'
import { houseGeometry } from '../configs'
import { gardenDimensions } from '../configs'
import { firstFloorDimensions } from '../configs'
import { makePlan } from '../scripts/makePlan'

export const gardenPlan = () => {
  //Garden Grids
  const geometry = houseGeometry.getObjectByName('garden')
  const dimensions = gardenDimensions
  const gardenGridName = 'gardenTopGrid'

  if (!geometry) return

  makePlan(
    geometry,
    gardenGridName,
    new THREE.Vector3(0, 0, (dimensions.depth - firstFloorDimensions.depth) / 2),
    0,
    {
      width: dimensions.width - 10,
      depth: dimensions.depth - firstFloorDimensions.depth,
      height: firstFloorDimensions.height
    },
    100,
    [
      {
        grid: 'mainRoomTopGrid',
        through: 'backDoor',
        side: 'negative'
      },
      {
        grid: 'gardenLeftGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorLeftOutsideGrid',
        through: 'stairs',
        side: 'positive'
      }
    ],
    {
      id: 2,
      name: gardenGridName,
      connectedSpaces: [1, 7, 13]
    },
    true,
    true,
    false
  )

  //Left Garden Grid
  const gardenLeftGridName = 'gardenLeftGrid'
  makePlan(
    geometry,
    gardenLeftGridName,
    new THREE.Vector3(((dimensions.width - firstFloorDimensions.width) / 3) * 2 + 25, 0, 0),
    0,
    {
      width: ((dimensions.width - firstFloorDimensions.width) / 3) * 2,
      depth: dimensions.depth - 10,
      height: firstFloorDimensions.height
    },
    100,
    [
      {
        grid: 'gardenTopGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'pathLeftTop',
        through: 'doorGardenLeft',
        side: 'positive'
      }
    ],
    {
      id: 7,
      name: gardenLeftGridName,
      connectedSpaces: [2, 8]
    },
    true,
    true,
    false
  )
}
