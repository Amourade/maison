import { app } from '@/maison/app'
import * as vis from 'vis-network'

export const makeGlobalMap = () => {
  const allSpaces = app.PLANS.all.map((s) => s.space)
  app.PLANS.space_map = new Map(allSpaces.map((s) => [s.id, s]))
  const Edge = (() => {
    // Do not support two way edges. Cache from and to internally:

    const cache = new Map()

    const Edge = (from: number, to: number) => {
      const id = `${Math.min(from, to)}.${Math.max(from, to)}`
      const length = 1

      if (!cache.has(id)) {
        cache.set(id, { from, to, id, length })
      }

      return cache.get(id)
    }

    return (from: number) => (to: number) => Edge(from, to)
  })()

  const edges = uniques(
    allSpaces.reduce(
      (edges, node) => edges.concat(node.connectedSpaces.map(Edge(node.id))),
      [] as number[]
    )
  )

  const nodes = allSpaces.map(({ id, name }) => ({ id, label: name + ' ' + id }))

  if (app.DEBUG.map) {
    const cvs = document.getElementById('cvs')
    if (!cvs) return
    new vis.Network(cvs, { nodes, edges }, {})
  }
}

function uniques(arr: Array<any>) {
  return Array.from(new Set(arr).values())
}
