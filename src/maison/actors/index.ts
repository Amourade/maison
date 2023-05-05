import * as THREE from 'three'
import { app } from '../app'
import { SittingGirl } from './sittingGirl'
import { config } from './paintings'
import { Painting } from './paintings/painting'
import { Dog } from './dog'
import { Clown } from './clown'
import { RotatingHeads } from './heads'

export const init = () => {
  app.SCENE.scene.add(new SittingGirl())
  app.SCENE.scene.add(new Dog())
  app.SCENE.scene.add(new Clown())
  app.SCENE.scene.add(new RotatingHeads())
  config.forEach((painting) => {
    app.SCENE.scene.add(
      new Painting(painting.material, painting.dimensions, painting.position, painting.rotation)
    )
  })
}
