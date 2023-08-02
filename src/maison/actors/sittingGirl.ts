import * as THREE from 'three'
import { MovingActor } from './shared/movingActor'
import { app } from '@/maison/app'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// @ts-ignore
import modelGLTF from '@/maison/assets/models/sitting-girl.glb'
import step1 from '@/maison/assets/sounds/sittingGirl/steps/1.mp3'
import step2 from '@/maison/assets/sounds/sittingGirl/steps/2.mp3'
import step3 from '@/maison/assets/sounds/sittingGirl/steps/3.mp3'
import step4 from '@/maison/assets/sounds/sittingGirl/steps/4.mp3'
import step5 from '@/maison/assets/sounds/sittingGirl/steps/5.mp3'
import step6 from '@/maison/assets/sounds/sittingGirl/steps/6.mp3'
import step7 from '@/maison/assets/sounds/sittingGirl/steps/7.mp3'
import step8 from '@/maison/assets/sounds/sittingGirl/steps/8.mp3'
import talk1 from '@/maison/assets/sounds/sittingGirl/talk.wav'
import { parseSounds } from '@/maison/scripts/parseAssets'
import { getRandomFlower, getRandomUnplantedFlower } from '../scripts/plans'
import type { CustomCamera } from '../controls/camera'

const steps = {
  one: step1,
  two: step2,
  three: step3,
  four: step4,
  five: step5,
  six: step6,
  seven: step7,
  height: step8
}

const parsedSteps = parseSounds(steps)

const talks = {
  one: talk1
}

const parsedTalks = parseSounds(talks)

let model: THREE.Group

new GLTFLoader(app.LOADER).load(modelGLTF, (gltf) => {
  gltf.scene.traverse(function (child: THREE.Object3D | THREE.Mesh) {
    if (child instanceof THREE.Mesh) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        reflectivity: 1,
        shininess: 1,
        vertexColors: true
      })
      child.material.vertexColors = false
      child.material = material
    }
  })
  model = gltf.scene
})

export class SittingGirl extends MovingActor {
  constructor() {
    super(model, 0, parsedSteps)

    this.dialogueCutoffRadius = 100

    Object.keys(parsedTalks).forEach((key) => {
      if (parsedTalks[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedTalks[key])
        audio.setRefDistance(10)
        audio.setVolume(0.6)
        audio.loop = true
        //this.add(this.sounds.open)
        this.sounds.talk.push(audio)
        this.add(audio)
      }
    })

    this.setInitial(new THREE.Vector3(-146, 10, 383), new THREE.Vector3(3.5, 3.5, 3.5), Math.PI / 2)

    this.makeGrabArea(new THREE.Vector3(0, 2, 2))

    this.dialogueLength = 4
    this.name = 'sittingGirl'

    app.INTERACTIONS.interactives.push(this)
    app.ANIMATED.push(this)
  }

  interact(interactor: CustomCamera | MovingActor) {
    this.sounds.talk[0].play()

    if (interactor.heldFlowers.length) {
      return this.talkFlowers(interactor)
    }

    if (interactor.heldPainting) {
      return this.talk('painting')
    } else {
      return this.talk('regular')
    }
  }

  talkFlowers(from: CustomCamera | MovingActor) {
    const flowersToTake = [...from.heldFlowers]
    this.talking = true
    app.DIALOGUE.value = [this.name, `flowers[0]`]
    for (let index = 0; index < flowersToTake.length; index++) {
      flowersToTake[index].interact(this)
    }
    from.heldFlowers = []
    this.startWait(1, () => {
      this.stopTalk()
    })
  }

  decideAction() {
    if (!this.holding) {
      //Get any non planted flowers
      const unplantedFlower = getRandomUnplantedFlower()
      if (unplantedFlower) return this.goToActor(unplantedFlower, 'grab')

      //Otherwise, move randomly || pick up planted flower
      const flower = getRandomFlower()
      Math.random() < 0.7 && flower ? this.goToActor(flower, 'grab') : this.getRandomDestination()

      return
    }

    if (this.heldFlowers.length) {
      //Maybe pick fallen flower
      const unplantedFlower = getRandomUnplantedFlower()
      if (Math.random() < 0.6 && unplantedFlower) return this.goToActor(unplantedFlower, 'grab')

      //Slightly maybe pick a planted flower
      const flower = getRandomFlower()
      if (Math.random() < 0.2 && flower) return this.goToActor(flower, 'grab')

      //Go plant a flower
      this.getRandomDestination('plant')

      return
    }
  }

  iddleAnimation() {
    this.scale.x += this.scaleOffsetFactor
    this.scale.z += this.scaleOffsetFactor
    if (this.scaleOffset > 0.06 || this.scaleOffset < 0) this.scaleOffsetFactor *= -1
    this.scaleOffset += this.scaleOffsetFactor
  }

  animate() {
    //snap
    if (!this.snapped) this.snapToGround()
    if (!app.SCENE.camera) return
    //looks at me talk and return
    if (this.talking) {
      this.lookAt(app.SCENE.camera.position.x, this.position.y, app.SCENE.camera.position.z)
      if (!this.waiting) return this.talkAnimation()
      this.talkAnimation()
    }
    //idle if not talking
    if (!this.talking) this.iddleAnimation()
    //walk and return
    if (this.walking) return this.walkToObjective()
    //interact and return
    if (this.interacting) return this.interactAnimation()

    //Wait if we have some wait thing
    if (this.waiting) return this.wait()

    //If nothing is happening, add delta for eventual decision making
    this.currentDelta += app.SCENE.delta

    //Return if the threshold for decision is not reached
    if (this.currentDelta < this.decisionDelta) return

    //Decide flowering action
    this.decideAction()

    //Get new decision delta
    this.currentDelta = 0
    this.decisionDelta = Math.random() * 15
  }
}
