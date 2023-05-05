import { app } from '@/maison/app'
import * as THREE from 'three'
import { firstFloorDimensions } from '../configs'
import { pillarsDimensions } from '../configs'
import { makePlan } from '../scripts/makePlan'

export const outsidePlan = () => {
  //Garden path grids
  const geometry = app.SCENE.scene
  //geometry.floorGrid = []
  const leftPathTopName = 'pathLeftTop'

  makePlan(
    geometry,
    leftPathTopName,
    new THREE.Vector3(235, 0, -210),
    0,
    { width: 46, depth: 110, height: firstFloorDimensions.height },
    100,
    [
      {
        grid: 'gardenLeftGrid',
        through: 'doorGardenLeft',
        side: 'negative'
      },
      {
        grid: 'pathLeftMiddle',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 8,
      name: leftPathTopName,
      connectedSpaces: [7, 9]
    },
    false,
    false,
    false
  )

  const leftPathMiddleName = 'pathLeftMiddle'
  makePlan(
    geometry,
    leftPathMiddleName,
    new THREE.Vector3(132, 0, -360),
    0.76,
    { width: 46, depth: 320, height: firstFloorDimensions.height },
    100,
    [
      {
        grid: 'pathLeftTop',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'entranceGrid',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 9,
      name: leftPathMiddleName,
      connectedSpaces: [8, 3]
    },
    false,
    false,
    false
  )

  const pathRightTopName = 'pathRightTop'
  makePlan(
    geometry,
    pathRightTopName,
    new THREE.Vector3(-195, 0, -80),
    0,
    { width: 46, depth: 455, height: firstFloorDimensions.height },
    100,
    [
      {
        grid: 'gardenTopGrid',
        through: 'doorGardenRight',
        side: 'negative'
      },
      {
        grid: 'pathRightMiddle',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 10,
      name: pathRightTopName,
      connectedSpaces: [2, 11]
    },
    false,
    false,
    false
  )

  const pathRightMiddleName = 'pathRightMiddle'
  makePlan(
    geometry,
    pathRightMiddleName,
    new THREE.Vector3(-160, 0, -419.5),
    -0.28,
    { width: 46, depth: 269, height: firstFloorDimensions.height },
    100,
    [
      {
        grid: 'pathRightTop',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 11,
      name: pathRightMiddleName,
      connectedSpaces: [10]
    },
    false,
    false,
    false
  )

  const pathRightBottomName = 'pathRightBottom'
  makePlan(
    geometry,
    pathRightBottomName,
    new THREE.Vector3(-75.5, 0, -605.5),
    -0.7,
    { width: 46, depth: 170, height: firstFloorDimensions.height },
    100,
    [
      {
        grid: 'pathRightMiddle',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'entranceGrid',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 12,
      name: pathRightBottomName,
      connectedSpaces: [11, 3]
    },
    false,
    false,
    false
  )

  entranceGrid()
}

const entranceGrid = () => {
  //Entrance Grid
  const geometry = app.SCENE.scene
  const dimensions = pillarsDimensions
  const gridName = 'entranceGrid'

  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(0, 0, -(firstFloorDimensions.depth / 2 + 600 / 2)),
    0,
    {
      width: dimensions.width - 10,
      depth: 600 - 10,
      height: firstFloorDimensions.height
    },
    100,
    [
      {
        grid: 'mainRoomMiddleGrid',
        through: 'frontDoor',
        side: 'negative'
      },
      {
        grid: 'pathLeftMiddle',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'pathRightBottom',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 3,
      name: gridName,
      connectedSpaces: [0, 9, 12]
    },
    true,
    true,
    false
  )
}
