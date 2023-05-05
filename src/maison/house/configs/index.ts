import * as THREE from 'three'

//Global House
export const houseConfig = {
  width: 300,
  depth: 300,
  height: 62.5,
  wallDepth: 4,
  ceilingDepth: 6,
  roomBackRightDeph: 100
}

export const floorHeight = 0.6

//Wall Offset
export const wallsWidthOffset = houseConfig.wallDepth - 0.1

//First Floor
export const firstFloorDimensions: Dimensions = {
  width: houseConfig.width,
  depth: houseConfig.depth,
  height: houseConfig.height,
  wallDepth: houseConfig.wallDepth,
  ceilingDepth: houseConfig.ceilingDepth
}

//Entrance Right Room
export const entranceRightDimensions: Dimensions = {
  width: 100,
  height: houseConfig.height,
  depth: houseConfig.roomBackRightDeph,
  wallDepth: 2.5,
  ceilingDepth: 0
}

export const entranceRightPosition = new THREE.Vector3(
  -firstFloorDimensions.width / 2 +
    entranceRightDimensions.width / 2 +
    firstFloorDimensions.wallDepth / 4,
  0,
  -firstFloorDimensions.depth / 2 +
    entranceRightDimensions.depth / 2 +
    firstFloorDimensions.wallDepth / 4
)

//Entrance Left Room
export const entranceLeftDimensions: Dimensions = {
  width: 100,
  height: houseConfig.height,
  depth: 175,
  wallDepth: 2.5,
  ceilingDepth: 0
}

export const entranceLeftPosition = new THREE.Vector3(
  firstFloorDimensions.width / 2 -
    entranceLeftDimensions.width / 2 -
    firstFloorDimensions.wallDepth / 4,
  0,
  -firstFloorDimensions.depth / 2 +
    entranceLeftDimensions.depth / 2 +
    firstFloorDimensions.wallDepth / 4
)

//Back Right Room
export const backRightDimensions: Dimensions = {
  width: 100,
  height: houseConfig.height,
  depth: houseConfig.depth - houseConfig.roomBackRightDeph - houseConfig.wallDepth / 2,
  wallDepth: 2.5,
  ceilingDepth: 0
}

export const backRightPosition = new THREE.Vector3(
  -firstFloorDimensions.width / 2 +
    backRightDimensions.width / 2 +
    firstFloorDimensions.wallDepth / 4,
  0,
  firstFloorDimensions.depth / 2 -
    backRightDimensions.depth / 2 -
    firstFloorDimensions.wallDepth / 4
)

//Pillars
export const pillarsDimensions = {
  height: 40,
  width: 100,
  pillarDepth: 8,
  pillarWidth: 8,
  pillarAmount: 8,
  pillarDistance: 25
}

export const pillarsPosition = new THREE.Vector3(
  0,
  0,
  -(
    (pillarsDimensions.pillarDepth + pillarsDimensions.pillarDistance) *
      pillarsDimensions.pillarAmount +
    firstFloorDimensions.depth / 2
  )
)

//Garden
const gardenWidth = 550
export const gardenDimensions = {
  width: gardenWidth,
  depth: 600,
  height: 15,
  wallDepth: 3,
  leftFenceWidth: ((gardenWidth - firstFloorDimensions.width) / 3) * 2,
  rightFenceWidth: (gardenWidth - firstFloorDimensions.width) / 3
}

export const gardenPosition = new THREE.Vector3(
  (gardenDimensions.width - firstFloorDimensions.width) / 6,
  0,
  (gardenDimensions.depth - firstFloorDimensions.depth) / 2
)

//Stairs

export const stairsDimensions = {
  height: firstFloorDimensions.height + 0.5,
  width: 25,
  stepHeight: 4,
  stepDepth: 7,
  finalheight: 0,
  finalDepth: 0,
  supportSize: 2
}
export const stairsRotation = new THREE.Vector3(0, Math.PI / 2, 0)

export const stairsPosition = new THREE.Vector3(
  -stairsDimensions.finalDepth,
  0,
  firstFloorDimensions.depth / 2 + stairsDimensions.width / 2 + firstFloorDimensions.wallDepth / 2
)

//Second Floor
export const secondFloorDimensions = {
  width: 200,
  depth: 200,
  height: 50,
  wallDepth: 4,
  ceilingDepth: 4
}

export const secondFloorPosition = new THREE.Vector3(
  0,
  firstFloorDimensions.height + firstFloorDimensions.ceilingDepth / 2,
  0
)

//House Geometry
export const houseGeometry = new THREE.Group()
