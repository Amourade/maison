import { app } from './app'
import * as THREE from 'three'
import { init as initHouse } from './house'
import { init as initControls } from './controls'
import { init as initNature } from './nature'
import { init as initActors } from './actors'
import { animate } from './animate'
import { CustomCamera } from './controls/camera'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export const loader = 'loading'

export const setup = (): {
  DOMElement: HTMLCanvasElement | undefined
} => {
  initCamera()
  initControls()

  app.LOADER.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
    app.LOADING_PERCENT.value = Math.floor((itemsLoaded / itemsTotal) * 100)
  }

  app.LOADER.onLoad = () => {
    //littleTimeout to fix something i have no clue
    //how to fix otherwise
    //fingers crossed
    setTimeout(() => {
      app.SCENE.camera?.initSounds()
      initHouse()
      initNature()
      initActors()
      animate()
      app.LOADED.value = true
    }, 50)
  }

  //Return rendrerer DOMElement once everything is initialized
  return { DOMElement: app.SCENE.renderer?.domElement }
}

export const maisonApp = app

export const lock = () => {
  app.CONTROLS.lock()
  app.SCENE.paused.value = false
  app.SCENE.bg?.play()
}

export const unlock = () => {
  app.CONTROLS.unlock()
  app.SCENE.paused.value = true
  app.SCENE.bg?.pause()
}

function initCamera() {
  //Camera
  app.SCENE.camera = new CustomCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    3000,
    //Basic
    //new THREE.Vector3(-299, 10.5, -868)
    //billboard
    new THREE.Vector3(273, 10.5, -894)
    //sittingGirl
    //new THREE.Vector3(-90, 10.5, 356)
    //clown
    //new THREE.Vector3(38.5, 76.5, 17)
  )
  app.SCENE.camera?.loadSounds()

  //Camera
  app.SCENE.camera.lookAt(new THREE.Vector3(0, 0, 0))
  app.SCENE.scene.add(app.SCENE.camera)

  //Audio Listerner
  app.SCENE.camera.add(app.SCENE.listener)
  //Controls

  app.CONTROLS = new PointerLockControls(app.SCENE.camera, document.body)
}
