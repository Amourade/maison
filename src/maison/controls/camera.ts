import * as THREE from 'three'
import type { Flower } from '../nature/flower'
import type { Sunflower } from '../nature/sunflower'
import { Painting } from '../actors/paintings/painting'
import { app } from '../app'

import step1 from '@/maison/assets/sounds/camera/steps/1.mp3'
import step2 from '@/maison/assets/sounds/camera/steps/2.mp3'
import step3 from '@/maison/assets/sounds/camera/steps/3.mp3'
import step4 from '@/maison/assets/sounds/camera/steps/4.mp3'
import step5 from '@/maison/assets/sounds/camera/steps/5.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'
import type { ParsedSoundsList } from '../types'

const steps = {
  one: step1,
  two: step2,
  three: step3,
  four: step4,
  five: step5
}

export class CustomCamera extends THREE.PerspectiveCamera {
  grabPoint!: THREE.Mesh
  heldFlowers: Array<Flower | Sunflower> = []
  heldPainting: Painting | null = null
  sounds: { [key: string]: Array<THREE.PositionalAudio> } = { steps: [] }
  parsedSteps!: ParsedSoundsList

  constructor(fov: number, aspect: number, near: number, far: number, position: THREE.Vector3) {
    super(fov, aspect, near, far)

    this.position.copy(position)

    this.makeGrabArea(new THREE.Vector3(0, 0, -20))
  }

  loadSounds() {
    //add camera sounds to loading
    this.parsedSteps = parseSounds(steps)
  }

  initSounds() {
    Object.keys(this.parsedSteps).forEach((key) => {
      if (this.parsedSteps[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(this.parsedSteps[key])
        audio.setRefDistance(10)
        audio.setVolume(1)
        audio.loop = false
        //this.add(this.sounds.open)
        this.sounds.steps.push(audio)
        this.add(audio)
      }
    })
  }

  makeGrabArea(position: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    )
    mesh.position.copy(position)
    this.add(mesh)
    this.grabPoint = mesh
  }

  interact() {
    //If holding something, don't interact with a painting
    if (this.heldPainting && app.INTERACTIONS.INTERSECTED.value instanceof Painting) return
    app.INTERACTIONS.INTERSECTED.value.interact(this)
  }

  dropPainting() {
    this.heldPainting?.drop()
    this.heldPainting = null
  }

  dropFlower() {
    if (!this.heldFlowers.length) return
    const index = Math.floor(Math.random() * this.heldFlowers.length)
    const object = this.heldFlowers[index]

    object.drop()
    this.heldFlowers.splice(index, 1)
  }

  playStep() {
    this.sounds.steps.forEach((step) => {
      step.stop()
    })
    const worldListener = new THREE.Vector3()
    app.SCENE.listener.getWorldPosition(worldListener)
    const randomSoundIndex = Math.floor(Math.random() * this.sounds.steps.length)
    this.sounds.steps[randomSoundIndex].play()
  }
}
