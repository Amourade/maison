import { app } from '../app'

export const addGeomToArrays = (geometry: THREE.Group) => {
  geometry.traverse(function (object) {
    if (object.name === 'wall' || object.name === 'door') {
      app.INTERACTIONS.walls.push(object)
    }
  })
}
