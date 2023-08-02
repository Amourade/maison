import * as THREE from 'three'
import { FlowerActor } from './scripts/flowerActor'
import { flowers } from './scripts/models'
import fall from '@/maison/assets/sounds/nature/fall2.mp3'
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

export class Flower extends FlowerActor {
  fallingSpeed = 2
  heldRotation = new THREE.Vector3(
    Math.random() * 1 - 0.5,
    Math.random() * 1 - 0.5,
    Math.random() * 1 - 0.5
  )

  constructor(position: THREE.Vector3) {
    const whichFlower = Math.random()

    const scale = Math.random() / 3.5 + 0.05

    let fleur

    if (whichFlower > 0.5) {
      fleur = flowers[0]()
    } else {
      fleur = flowers[1]()
    }

    super(fleur, new THREE.Vector3(0.2 + scale, 0.2 + scale, 0.2 + scale))

    this.snapOffset = 7.5 * 0.2 + scale - this.height / 2

    this.rotation.y = Math.PI * 2 * whichFlower
    this.position.copy(position)
    this.position.y = this.snapOffset

    this.makeCameraAnchor(new THREE.Vector3(-1, 20 * this.refScale.y + this.height / 2, 5))
    this.makeStareZone(new THREE.Vector3(0, 8 * this.refScale.y + this.height / 2, 0))

    this.originalPosition.copy(this.position)
    this.originalRotation.copy(this.rotation)

    this.sounds.fall = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.fall.setBuffer(parsedSounds.fall)
    this.sounds.fall.setRefDistance(20)
    this.sounds.fall.loop = false
    this.add(this.sounds.fall)

    this.sounds.pluck = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.pluck.setBuffer(parsedSounds.pluck)
    this.sounds.pluck.setRefDistance(20)
    this.sounds.pluck.loop = false
    this.add(this.sounds.pluck)

    this.sounds.plant = new THREE.PositionalAudio(app.SCENE.listener)
    this.sounds.plant.setBuffer(parsedSounds.plant)
    this.sounds.plant.setRefDistance(20)
    this.sounds.plant.loop = false
    this.sounds.plant.setVolume(1)
    this.add(this.sounds.plant)

    this.snapToGround()
  }
}
