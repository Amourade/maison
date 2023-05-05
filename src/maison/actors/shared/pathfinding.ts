import { app } from '@/maison/app'
import { Doors } from '@/maison/house/scripts/doors'
import { PlanMesh } from '@/maison/house/scripts/planMesh'
import type { Space } from '@/maison/types'
import * as THREE from 'three'

function walk(
  destination: number,
  paths: Array<Array<number>>,
  path: Array<number>,
  node: Space
): Array<Array<number>> {
  // Walking in circles
  if (path.includes(node.id))
    // <-- expensive, for large paths use a Set
    return paths

  // End reached
  if (node.id === destination) return paths.concat([path.concat(node.id)])

  // Take next step recursively
  return node.connectedSpaces.reduce((acc: any, id: number) => {
    const space = app.PLANS.space_map.get(id)
    if (!space) throw new Error('Walk Issue')
    return walk(destination, acc, path.concat(node.id), space)
  }, paths)
}

function calcRoutes(from: number, to: number) {
  const fromNode = app.PLANS.space_map.get(from)
  if (fromNode) {
    const routes = walk(to, [], [], fromNode)
    return routes
  }
}

function buildRoute(from: number, to: number, target: any = null, action: any = null) {
  const scene = app.SCENE.scene

  const routes = calcRoutes(from, to)
  if (!routes) throw new Error('Routes error')

  //const route = routes[Math.floor(Math.random() * routes.length)]
  const route = routes[0]
  const builtRoute: Array<{ coord: THREE.Vector3; object: any; action: any }> = []

  route.forEach((el: number, index: number, arr: Array<any>) => {
    const fromNode = app.PLANS.space_map.get(el)
    if (!fromNode) throw new Error('Node fetch error')

    const fromGrid = scene.getObjectByName(fromNode.name)
    if (!fromGrid) throw new Error('Grid fetch problem')

    if (index < arr.length - 1 && fromGrid instanceof PlanMesh) {
      const toNode = app.PLANS.space_map.get(arr[index + 1])
      if (!toNode) throw new Error('Node fetch error')

      const toGrid = scene.getObjectByName(toNode.name)
      if (!toGrid) throw new Error('Grid fetch problem')

      const link = fromGrid.linksTo.find((obj: { [key: string]: string }) => {
        return obj.grid === toGrid.name
      })

      if (link && link.through !== 'sharedFloor' && link.side) {
        const door = scene.getObjectByName(link.through)
        if (!door) throw new Error('Door fetch problem')

        const side = door.getObjectByName(link.side)
        const otherSide = door.getObjectByName(link.side == 'negative' ? 'positive' : 'negative')

        if (!side || !otherSide) throw new Error('Doors sides error')

        if (door instanceof Doors) {
          builtRoute.push({ coord: getRandomGridPoint(side), object: side.parent, action: 'open' })
          builtRoute.push({
            coord: getRandomGridPoint(otherSide),
            object: otherSide.parent,
            action: 'close'
          })
        } else {
          builtRoute.push({ coord: getRandomGridPoint(side), object: null, action: null })
          builtRoute.push({ coord: getRandomGridPoint(otherSide), object: null, action: null })
        }
      } else {
        if (toGrid instanceof PlanMesh) {
          const intersectionPoint = getGridIntersectionPoint(fromGrid, toGrid)
          builtRoute.push({ coord: intersectionPoint, object: null, action: null })
        } else {
          throw new Error('Invalid destination grid')
        }
      }
    } else {
      if (target) {
        //See if target has a dedicated interaction Zone
        //If so build route using it
        if (target.interactionZone) {
          const targetPosition = new THREE.Vector3()
          target.interactionZone.getWorldPosition(targetPosition)
          builtRoute.push({
            coord: targetPosition,
            object: target,
            action: action
          })
          return
        }
        //Otherwise build route using target actual position
        builtRoute.push({ coord: target.position, object: target, action: action })
      } else {
        builtRoute.push({ coord: getRandomGridPoint(fromGrid), object: target, action: action })
      }
      //Last plane of existence
    }
  })

  return builtRoute
}

function getGridIntersectionPoint(from: PlanMesh, to: PlanMesh) {
  from.geometry.computeBoundingBox()

  const boundingBox = new THREE.Box3().setFromObject(from)

  const limits = {
    max: {
      x: boundingBox.max.x,
      z: boundingBox.max.z
    },
    min: {
      x: boundingBox.min.x,
      z: boundingBox.min.z
    }
  }

  const coord = new THREE.Vector3()
  do {
    coord.copy(getRandomGridPoint(to))
  } while (
    coord.x < limits.min.x ||
    coord.x > limits.max.x ||
    coord.z < limits.min.z ||
    coord.z > limits.max.z
  )

  return coord
}

function getRandomGridPoint(refMesh: any) {
  const vertices = refMesh.geometry.getAttribute('position')

  const vertice = Math.floor(Math.random() * vertices.count)
  const coord = new THREE.Vector3()
  coord.fromBufferAttribute(vertices, vertice)

  const worldDest = refMesh.localToWorld(coord)

  return worldDest
}

export { buildRoute, getRandomGridPoint }
