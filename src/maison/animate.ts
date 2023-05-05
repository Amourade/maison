import { app } from './app'
import { animate as animateControls } from './controls/logic'
import { SittingGirl } from './actors/sittingGirl'
import { Dog } from './actors/dog'
import { Clown } from './actors/clown'
import type { MovingActor } from './actors/shared/movingActor'
import type { Painting } from './actors/paintings/painting'
import type { FlowerActor } from './nature/scripts/flowerActor'

export const animate = () => {
  app.SCENE.delta = app.SCENE.clock.getDelta()

  requestAnimationFrame(animate)

  console.log(app.SCENE.camera.position)

  if (app.CONTROLS.isLocked === true) {
    app.SCENE.paused.value = false
    animateControls()
    animateActors()
  } else {
    app.SCENE.paused.value = true
  }

  app.SCENE.renderer.render(app.SCENE.scene, app.SCENE.camera)
}

const animateActors = () => {
  app.ANIMATED.forEach((element) => element.animate())
  /* 
  app.INTERACTIONS.interactives.forEach((element) => {
    if (element.animate) element.animate()
  }) 
  app.INTERACTIONS.actors.forEach((element: MovingActor) => {
    if (element instanceof SittingGirl) element.animate()
    if (element instanceof Dog) element.animate()
    if (element instanceof Clown) element.animate()
  })
  app.INTERACTIONS.faces.animate()
  app.INTERACTIONS.paintings.forEach((element: Painting) => {
    element.animate()
  })
  app.INTERACTIONS.flowers.forEach((element: FlowerActor) => {
    element.animate()
  }) */
}
