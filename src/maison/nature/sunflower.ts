import * as THREE from 'three'
import { FlowerActor } from './scripts/flowerActor'
import { sunflower } from './scripts/models'
import fall from '@/maison/assets/sounds/nature/fall1.mp3'
import pluck from '@/maison/assets/sounds/nature/pluck.mp3'
import plant from '@/maison/assets/sounds/nature/plant.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'
import { app } from '../app'

const sounds = {
  fall: fall,
  pluck: pluck,
  plant: plant
}

const parsedSounds = parseSounds(sounds)

export class Sunflower extends FlowerActor {
  heldRotation = new THREE.Vector3(
    Math.random() * 1 - 0.5,
    Math.random() * 1 - 0.5,
    Math.random() * 1 - 0.5
  )

  constructor(position: THREE.Vector3) {
    //super(sunflower(), new THREE.Vector3(0, 0, 0))
    super(sunflower(), new THREE.Vector3(1, 1, 1))

    this.snapOffset = 7.5 - this.height / 2

    this.position.copy(position)
    this.position.y = this.snapOffset

    this.makeCameraAnchor(new THREE.Vector3(-3, 17 + this.height / 2, -5))
    this.makeStareZone(new THREE.Vector3(0, 7 + this.height / 2, 0))

    this.originalPosition.copy(this.position)
    this.originalRotation.copy(this.rotation)

    this.sounds.fall = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.fall.setBuffer(parsedSounds.fall)
    this.sounds.fall.setRefDistance(75)
    this.sounds.fall.loop = false
    this.add(this.sounds.fall)

    this.sounds.pluck = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.pluck.setBuffer(parsedSounds.pluck)
    this.sounds.pluck.setRefDistance(75)
    this.sounds.pluck.loop = false
    this.add(this.sounds.pluck)

    this.sounds.plant = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.plant.setBuffer(parsedSounds.plant)
    this.sounds.plant.setRefDistance(75)
    this.sounds.plant.loop = false
    this.sounds.plant.setVolume(1)
    this.add(this.sounds.plant)

    this.snapToGround()
  }
}
