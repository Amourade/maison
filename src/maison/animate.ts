import { app } from './app'
import { animate as animateControls } from './controls/logic'

export const animate = () => {
  app.SCENE.delta = app.SCENE.clock.getDelta()

  requestAnimationFrame(animate)

  if (!app.SCENE.camera) return

  if (app.CONTROLS.isLocked === true) {
    app.SCENE.paused.value = false
    app.SCENE.listener.setMasterVolume(1)
    animateControls()
    animateActors()
  } else {
    app.SCENE.listener.setMasterVolume(0)
    app.SCENE.paused.value = true
  }

  app.SCENE.renderer.render(app.SCENE.scene, app.SCENE.camera)
}

const animateActors = () => {
  app.ANIMATED.forEach((element) => element.animate())
}
