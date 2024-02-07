import * as THREE from 'three'
import { app } from '../app'
import * as firstFloor from './configs/first-floor'
import * as entranceRight from './configs/first-floor/rooms/entranceRight'
import * as entranceLeft from './configs/first-floor/rooms/entranceLeft'
import * as backRight from './configs/first-floor/rooms/backRight'
import * as secondFloor from './configs/second-floor'
import * as garden from './configs/garden'
import * as pillars from './configs/pillars'
import { makeStairs } from './configs/stairs'
import { makeWall } from './scripts/makeWall'
import { makeFloor } from './scripts/makeFloor'
import { addGeomToArrays } from '../scripts/addGeomToArrays'
import { houseGeometry } from './configs'
import { firstFloorPlan } from './maps/firstFloor'
import { gardenPlan } from './maps/garden'
import { outsidePlan } from './maps/outside'
import { makeGlobalMap } from './scripts/makeGlobalMap'
import { secondFloorPlan } from './maps/secondFloor'
import { init as initBillboard } from './billboard'
import type { RoomConfig } from '../types'
import { degToRad } from 'three/src/math/MathUtils'

const makeRoom = (config: RoomConfig, geometry: THREE.Group) => {
  config.walls.forEach((element) => {
    geometry.add(makeWall(element))
  })
  if (config.ceiling) geometry.add(makeFloor(config.ceiling))
  if (config.floor) geometry.add(makeFloor(config.floor))
  if (config.position) geometry.position.copy(config.position)
  if (config.name) geometry.name = config.name
  houseGeometry.add(geometry)
}

export const init = function () {
  makeRoom(firstFloor.config, firstFloor.geometry)
  makeRoom(entranceRight.config, entranceRight.geometry)
  makeRoom(entranceLeft.config, entranceLeft.geometry)
  makeRoom(backRight.config, backRight.geometry)
  makeRoom(pillars.config, pillars.geometry)
  makeRoom(secondFloor.config, secondFloor.geometry)
  makeRoom(garden.config, garden.geometry)
  houseGeometry.add(makeStairs())

  firstFloorPlan()
  gardenPlan()
  outsidePlan()
  secondFloorPlan()

  makeGlobalMap()

  addGeomToArrays(houseGeometry)
  houseGeometry.updateWorldMatrix(true, true)
  app.SCENE.scene.add(houseGeometry)

  const billboard = initBillboard()
  billboard.position.set(261, 20, -669)
  billboard.rotateOnAxis(new THREE.Vector3(0, 1, 0), degToRad(180))
  app.SCENE.scene.add(billboard)
}
