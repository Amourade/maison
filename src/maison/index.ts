import { app } from './app'
import { init as initHouse } from './house'
import { init as initControls } from './controls'
import { init as initNature } from './nature'
import { init as initActors } from './actors'
import { animate } from './animate'

export const loader = 'loading'

export const setup = (): {
  DOMElement: HTMLCanvasElement | undefined
} => {
  app.LOADER.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
    app.LOADING_PERCENT.value = Math.floor((itemsLoaded / itemsTotal) * 100)
  }
  app.LOADER.onLoad = () => {
    initHouse()
    initNature()
    initActors()
    animate()

    app.LOADED.value = true
  }

  initControls()

  //Return rendrerer DOMElement once everything is initialized
  return { DOMElement: app.SCENE.renderer?.domElement }
}

export const maisonApp = app

export const lock = () => {
  app.CONTROLS.lock()
  app.SCENE.paused.value = false
}

export const unlock = () => {
  app.CONTROLS.unlock()
  app.SCENE.paused.value = true
}
