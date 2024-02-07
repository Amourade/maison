import { app } from './app'
import * as THREE from 'three'
import cameraSound from '@/maison/assets/sounds/camera.mp3'
import { parseSounds } from './scripts/parseAssets'

const sounds = {
  shutter: cameraSound
}

const parsedSounds = parseSounds(sounds)

let sfx: THREE.Audio | undefined = undefined

const takePicture = async () => {
  const { PICTURE } = app
  if (PICTURE.taking.value || !app.SCENE.camera || app.SCENE.paused.value || PICTURE.taken.value)
    return

  if (!sfx) {
    sfx = new THREE.Audio(app.SCENE.listener)
    sfx.setBuffer(parsedSounds.shutter)
    sfx.loop = false
    app.SCENE.scene.add(sfx)
  }
  sfx.play()

  //Set picture taking to ON
  PICTURE.taking.value = true

  //Give controls a speed of 0 to stop movement without releasing cursor
  app.CONTROLS.pointerSpeed = 0

  //Render the scene
  app.SCENE.renderer.render(app.SCENE.scene, app.SCENE.camera)

  //Get scene as DataURL
  const sceneRender = app.SCENE.renderer.domElement.toDataURL('image/webp', 0.8)

  PICTURE.image.value = await getBlob(sceneRender)
}

const deletePicture = () => {
  const { PICTURE } = app

  PICTURE.taking.value = false
  PICTURE.image.value = undefined
}

const hidePicture = () => {
  const { PICTURE } = app

  PICTURE.taking.value = false
}

async function getBlob(url: string) {
  const blob = await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return blob
    })
    .catch(console.error)
  return blob
}

export { takePicture, deletePicture, hidePicture }
