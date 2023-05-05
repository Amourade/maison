import * as THREE from 'three'
import { houseGeometry } from '../configs'
import { firstFloorDimensions } from '../configs'
import { entranceLeftDimensions } from '../configs'
import { entranceRightDimensions } from '../configs'
import { backRightDimensions } from '../configs'
import { floorHeight } from '../configs'
import { makePlan } from '../scripts/makePlan'
//Main Room

export const firstFloorPlan = () => {
  const geometry = houseGeometry.getObjectByName('firstFloorMainRoom')
  const dimensions = firstFloorDimensions
  const gridName = 'mainRoomMiddleGrid'

  //geometry.floorGrid = []

  if (!geometry) return

  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(dimensions.wallDepth / 4, floorHeight, 0),
    0,
    {
      width:
        dimensions.width -
        entranceLeftDimensions.width -
        entranceRightDimensions.width -
        dimensions.wallDepth * 2 -
        4,
      height: dimensions.height,
      depth: dimensions.depth - dimensions.wallDepth * 2 - 4
    },
    100,
    [
      {
        grid: 'roomEntranceLeftGrid',
        through: 'holeLeftRoom',
        side: 'negative'
      },
      {
        grid: 'mainRoomTopGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'roomBackRightGrid',
        through: 'doorBackRight',
        side: 'negative'
      },
      {
        grid: 'entranceGrid',
        through: 'frontDoor',
        side: 'positive'
      }
    ],
    {
      id: 0,
      name: gridName,
      connectedSpaces: [1, 4, 3, 6]
    },
    true,
    false,
    true
  )

  //Top Grid
  const topGridName = 'mainRoomTopGrid'
  makePlan(
    geometry,
    topGridName,
    new THREE.Vector3(
      entranceRightDimensions.width / 2 + dimensions.wallDepth / 4,
      floorHeight,
      entranceLeftDimensions.depth / 2
    ),
    0,
    {
      width: dimensions.width - entranceRightDimensions.width - dimensions.wallDepth * 2 - 4,
      height: dimensions.height,
      depth: dimensions.depth - entranceLeftDimensions.depth - dimensions.wallDepth * 2 - 4
    },
    100,
    [
      {
        grid: 'roomEntranceLeftGrid',
        through: 'doorLeftRoom',
        side: 'negative'
      },
      {
        grid: 'mainRoomMiddleGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'roomBackRightGrid',
        through: 'doorBackRight',
        side: 'negative'
      },
      {
        grid: 'gardenTopGrid',
        through: 'backDoor',
        side: 'positive'
      }
    ],
    {
      id: 1,
      name: topGridName,
      connectedSpaces: [0, 6, 4, 2]
    },
    true,
    false,
    true
  )

  entranceLeftPlan()
  entranceRightPlan()
  backRightPlan()
}

const entranceLeftPlan = () => {
  //room entrance left
  const geometry = houseGeometry.getObjectByName('roomEntranceLeft')
  //geometry.floorGrid = []
  const dimensions = entranceLeftDimensions
  const gridName = 'roomEntranceLeftGrid'

  if (!geometry) return

  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(0, floorHeight, 0),
    0,
    {
      width: dimensions.width - dimensions.wallDepth * 2 - 4,
      depth: dimensions.depth - dimensions.wallDepth * 2 - 4,
      height: dimensions.height
    },
    100,
    [
      {
        grid: 'mainRoomTopGrid',
        through: 'doorLeftRoom',
        side: 'positive'
      },
      {
        grid: 'mainRoomMiddleGrid',
        through: 'holeLeftRoom',
        side: 'positive'
      }
    ],
    {
      id: 4,
      name: gridName,
      connectedSpaces: [1, 0]
    },
    true,
    false,
    true
  )
}

const entranceRightPlan = () => {
  //Room entrance right
  const geometry = houseGeometry.getObjectByName('roomEntranceRight')
  //geometry.floorGrid = []
  const dimensions = entranceRightDimensions
  const gridName = 'roomEntranceRightGrid'

  if (!geometry) return

  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(0, floorHeight, 0),
    0,
    {
      width: dimensions.width - dimensions.wallDepth * 2 - 4,
      depth: dimensions.depth - dimensions.wallDepth * 2 - 4,
      height: dimensions.height
    },
    100,
    [
      {
        grid: 'roomBackRightGrid',
        through: 'doorRightRooms',
        side: 'positive'
      }
    ],
    {
      id: 5,
      name: gridName,
      connectedSpaces: [6]
    },
    true,
    false,
    true
  )
}

const backRightPlan = () => {
  //Room back right
  const geometry = houseGeometry.getObjectByName('roomBackRight')
  //geometry.floorGrid = []
  const dimensions = backRightDimensions
  const gridName = 'roomBackRightGrid'

  if (!geometry) return

  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(0, floorHeight, 0),
    0,
    {
      width: dimensions.width - dimensions.wallDepth * 2 - 4,
      depth: dimensions.depth - dimensions.wallDepth * 2 - 4,
      height: dimensions.height
    },
    100,
    [
      {
        grid: 'roomEntranceRightGrid',
        through: 'doorRightRooms',
        side: 'negative'
      },
      {
        grid: 'mainRoomMiddleGrid',
        through: 'doorBackRight',
        side: 'positive'
      },
      {
        grid: 'mainRoomTopGrid',
        through: 'doorBackRight',
        side: 'positive'
      }
    ],
    {
      id: 6,
      name: gridName,
      connectedSpaces: [5, 1, 0]
    },
    true,
    false,
    true
  )
}
