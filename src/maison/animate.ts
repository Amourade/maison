import { app } from './app'
import { animate as animateControls } from './controls/logic'

//let pictureTimeout: ReturnType<typeof setTimeout> | undefined = undefined

export const animate = () => {
  app.SCENE.delta = app.SCENE.clock.getDelta()

  requestAnimationFrame(animate)

  if (!app.SCENE.camera) return

  if (app.CONTROLS.isLocked === true && !app.PICTURE.taking.value && !app.SHOWALLPICTURES.value) {
    app.SCENE.paused.value = false
    app.SCENE.listener.setMasterVolume(1)
    animateControls()
    animateActors()
  }
  if (!app.CONTROLS.isLocked && !app.PICTURE.taking.value && !app.SHOWALLPICTURES.value) {
    app.SCENE.listener.setMasterVolume(0)
    app.SCENE.paused.value = true
  }

  app.SCENE.renderer.render(app.SCENE.scene, app.SCENE.camera)
}

const animateActors = () => {
  app.ANIMATED.forEach((element) => element.animate())
}
