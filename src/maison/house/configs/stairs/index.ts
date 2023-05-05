import * as THREE from 'three'
import { materials } from './assetsRefs'
import {
  stairsDimensions as dimensions,
  stairsRotation as rotation,
  stairsPosition as position
} from '../index'
import { app } from '@/maison/app'
import type { CustomMaterial } from '../../scripts/customMaterial'
import { Link } from '../../scripts/link'

/**TODO Make entrance and exit so they can act as doors */

//Entrance on the first instance of foreach
//Exite on the last thing

export const makeStairs = () => {
  const geometry = new THREE.Group()

  //Positive Side

  const entryPlane = new THREE.PlaneGeometry(dimensions.width, 10, 10, 10)
  entryPlane.rotateX(Math.PI / 2)
  const entry = new THREE.Mesh(
    entryPlane,
    new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  )
  entry.visible = app.DEBUG.general
  entry.position.z += dimensions.stepDepth * 2
  entry.position.y = 0.5
  entry.name = 'positive'
  geometry.add(entry)

  for (let i = 0; i < dimensions.height / dimensions.stepHeight; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        dimensions.width,
        dimensions.stepHeight /* * (i + 1) */,
        dimensions.stepDepth
      ),
      materials.steps instanceof Array<CustomMaterial> ? materials.steps : undefined
    )
    mesh.position.y = dimensions.stepHeight * (i + 1) - dimensions.stepHeight / 2 /*/2*/
    mesh.position.z -= dimensions.stepDepth * (i + 1)
    app.INTERACTIONS.grounds.push(mesh)
    geometry.add(mesh)
    dimensions.finalheight += dimensions.stepHeight
    dimensions.finalDepth += dimensions.stepDepth

    /**
     * Support for stair
     */

    const supportMesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        dimensions.supportSize,
        dimensions.stepHeight * (i + 1) - dimensions.stepHeight,
        dimensions.supportSize
      ),
      materials.support instanceof Array<CustomMaterial> ? materials.support : undefined
    )
    supportMesh.position.y = (dimensions.stepHeight * (i + 1)) / 2 - dimensions.stepHeight / 2
    supportMesh.position.z -=
      dimensions.stepDepth * (i + 1) /* + dimensions.stepDepth/2 - dimensions.supportSize*/
    supportMesh.position.x -= dimensions.width / 2 - dimensions.supportSize
    geometry.add(supportMesh)
  }

  //Stair End

  const finalStair = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.width,
      dimensions.stepHeight,
      dimensions.stepDepth * 5 - dimensions.stepDepth / 2
    ),
    materials.steps instanceof Array<CustomMaterial> ? materials.steps : undefined
  )
  finalStair.position.y = dimensions.finalheight - dimensions.stepHeight / 2
  finalStair.position.z -=
    dimensions.finalDepth + dimensions.stepDepth * 2.5 + dimensions.stepDepth / 4
  app.INTERACTIONS.grounds.push(finalStair)
  geometry.add(finalStair)

  //negative side

  const exitPlane = new THREE.PlaneGeometry(
    dimensions.width,
    dimensions.stepDepth * 5 - dimensions.stepDepth / 2,
    10,
    10
  )
  exitPlane.rotateX(Math.PI / 2)
  const exit = new THREE.Mesh(
    exitPlane,
    new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
  )
  exit.visible = app.DEBUG.general
  exit.position.z -= dimensions.finalDepth + dimensions.stepDepth * 2.5 + dimensions.stepDepth / 4
  exit.position.y = dimensions.finalheight + 0.5
  exit.name = 'negative'
  geometry.add(exit)

  dimensions.finalDepth += dimensions.stepDepth * 5

  /**
   * Support for stair
   */
  const firstSupport = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.supportSize,
      dimensions.finalheight - dimensions.stepHeight,
      dimensions.supportSize
    ),
    materials.support instanceof Array<CustomMaterial> ? materials.support : undefined
  )
  firstSupport.position.y = dimensions.finalheight / 2 - dimensions.stepHeight / 2
  firstSupport.position.z -= dimensions.finalDepth - dimensions.supportSize
  firstSupport.position.x -= dimensions.width / 2 - dimensions.supportSize

  geometry.add(firstSupport)

  const secondSupport = new THREE.Mesh(
    new THREE.BoxGeometry(
      dimensions.supportSize,
      dimensions.finalheight - dimensions.stepHeight,
      dimensions.supportSize
    ),
    materials.support instanceof Array<CustomMaterial> ? materials.support : undefined
  )
  secondSupport.position.y = dimensions.finalheight / 2 - dimensions.stepHeight / 2
  secondSupport.position.z -=
    dimensions.finalDepth -
    (dimensions.stepDepth * 5 - dimensions.stepDepth / 2) / 2 -
    dimensions.supportSize
  secondSupport.position.x -= dimensions.width / 2 - dimensions.supportSize

  geometry.add(secondSupport)

  geometry.rotation.y += rotation.y
  geometry.position.copy(position)
  geometry.name = 'stairs'

  return geometry
}

export class Stairs extends Link {}
