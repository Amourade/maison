import * as THREE from 'three'
import { houseGeometry } from '../configs'
import { firstFloorDimensions } from '../configs'
import { entranceLeftDimensions } from '../configs'
import { entranceRightDimensions } from '../configs'
import { backRightDimensions } from '../configs'
import { secondFloorDimensions } from '../configs'
import { floorHeight } from '../configs'
import { makePlan } from '../scripts/makePlan'
//Main Room

export const secondFloorPlan = () => {
  const geometry = houseGeometry.getObjectByName('secondFloor')
  const dimensions = firstFloorDimensions

  //geometry.floorGrid = []

  if (!geometry) return

  const gridName = 'secondFloorRightOutsideGrid'
  makePlan(
    geometry,
    gridName,
    new THREE.Vector3(
      (secondFloorDimensions.width + secondFloorDimensions.wallDepth) / 2 +
        (dimensions.width - secondFloorDimensions.width) / 4,
      floorHeight,
      0
    ),
    0,
    {
      width:
        (dimensions.width -
          dimensions.wallDepth * 2 -
          (secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2) -
          4) /
        2,
      height: dimensions.height,
      depth: dimensions.depth - dimensions.wallDepth
    },
    30,
    [
      {
        grid: 'secondFloorTopOutsideGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorBackOutsideGrid',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 15,
      name: gridName,
      connectedSpaces: [14, 16]
    },
    true,
    true,
    false
  )

  const gridNameTwo = 'secondFloorLeftOutsideGrid'
  makePlan(
    geometry,
    gridNameTwo,
    new THREE.Vector3(
      -(secondFloorDimensions.width + secondFloorDimensions.wallDepth) / 2 -
        (dimensions.width - secondFloorDimensions.width) / 4,
      floorHeight,
      0
    ),
    0,
    {
      width:
        (dimensions.width -
          dimensions.wallDepth * 2 -
          (secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2) -
          4) /
        2,
      height: dimensions.height,
      depth: dimensions.depth - dimensions.wallDepth
    },
    30,
    [
      {
        grid: 'gardenTopGrid',
        through: 'stairs',
        side: 'negative'
      },
      {
        grid: 'secondFloorTopOutsideGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorBackOutsideGrid',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 13,
      name: gridNameTwo,
      connectedSpaces: [2, 14, 16]
    },
    true,
    true,
    false
  )

  const gridNameThree = 'secondFloorTopOutsideGrid'
  makePlan(
    geometry,
    gridNameThree,
    new THREE.Vector3(
      0,
      floorHeight,
      -(secondFloorDimensions.depth + secondFloorDimensions.wallDepth) / 2 -
        (dimensions.depth - secondFloorDimensions.depth) / 4
    ),
    0,
    {
      width: dimensions.depth - dimensions.wallDepth,
      height: dimensions.height,
      depth:
        (dimensions.depth -
          dimensions.wallDepth * 2 -
          (secondFloorDimensions.depth - secondFloorDimensions.wallDepth * 2) -
          4) /
        2
    },
    30,
    [
      {
        grid: 'secondFloorLeftOutsideGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorRightOutsideGrid',
        through: 'sharedFloor',
        side: null
      }
    ],
    {
      id: 14,
      name: gridNameThree,
      connectedSpaces: [13, 15]
    },
    true,
    true,
    false
  )

  const gridNameFour = 'secondFloorBackOutsideGrid'
  makePlan(
    geometry,
    gridNameFour,
    new THREE.Vector3(
      0,
      floorHeight,
      (secondFloorDimensions.depth + secondFloorDimensions.wallDepth) / 2 +
        (dimensions.depth - secondFloorDimensions.depth) / 4
    ),
    0,
    {
      width: dimensions.depth - dimensions.wallDepth,
      height: dimensions.height,
      depth:
        (dimensions.depth -
          dimensions.wallDepth * 2 -
          (secondFloorDimensions.depth - secondFloorDimensions.wallDepth * 2) -
          4) /
        2
    },
    30,
    [
      {
        grid: 'secondFloorLeftOutsideGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorRightOutsideGrid',
        through: 'sharedFloor',
        side: null
      },
      {
        grid: 'secondFloorInsideGrid',
        through: 'doorSecondFloor',
        side: 'negative'
      }
    ],
    {
      id: 16,
      name: gridNameFour,
      connectedSpaces: [13, 15, 17]
    },
    true,
    true,
    false
  )

  const gridNameFive = 'secondFloorInsideGrid'
  makePlan(
    geometry,
    gridNameFive,
    new THREE.Vector3(0, floorHeight, 0),
    0,
    {
      width: secondFloorDimensions.width - secondFloorDimensions.wallDepth * 2,
      height: dimensions.height,
      depth: secondFloorDimensions.depth - secondFloorDimensions.wallDepth * 2
    },
    30,
    [
      {
        grid: 'secondFloorBackOutsideGrid',
        through: 'doorSecondFloor',
        side: 'positive'
      }
    ],
    {
      id: 17,
      name: gridNameFive,
      connectedSpaces: [16]
    },
    true,
    false,
    true
  )
}
