import * as THREE from 'three'
import { MovingActor } from './shared/movingActor'
import { app } from '@/maison/app'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// @ts-ignore
import modelGLTF from '@/maison/assets/models/clown.glb'
import step1 from '@/maison/assets/sounds/clown/pas1.mp3'
import step2 from '@/maison/assets/sounds/clown/pas2.mp3'
import talk1 from '@/maison/assets/sounds/clown/talk.wav'
import { parseSounds } from '@/maison/scripts/parseAssets'
import type { CustomCamera } from '../controls/camera'

const steps = {
  one: step1,
  two: step2
}

const parsedSteps = parseSounds(steps)

const talk = {
  one: talk1
}

const parsedTalk = parseSounds(talk)

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

export class Clown extends MovingActor {
  paintingDialogueStep = 0
  waitForHeadResult = false
  paintingResult: number | null = null

  constructor() {
    super(model, 0, parsedSteps)

    Object.keys(parsedTalk).forEach((key) => {
      if (parsedTalk[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(parsedTalk[key])
        audio.setRefDistance(20)
        audio.loop = true
        //this.add(this.sounds.open)
        this.sounds.talk.push(audio)
        this.add(audio)
      }
    })

    this.setInitial(new THREE.Vector3(-0, 70, 0), new THREE.Vector3(2, 2, 2), Math.PI / 2)

    this.makeGrabArea(new THREE.Vector3(0, 10, 3))

    this.walkDelta = 0.001

    this.dialogueLength = 3
    this.dialogueCutoffRadius = 150
    this.name = 'clown'

    this.decisionDelta = Math.random() * 20

    app.INTERACTIONS.interactives.push(this)
    app.ANIMATED.push(this)
  }

  decideTalk(interactor: CustomCamera | MovingActor) {
    if (this.heldPainting) {
      return
    }

    this.sounds.talk[0].play()
    if (interactor.heldPainting) {
      this.talkPainting(interactor)
      return
    }
    this.talk('regular')
  }

  interact(interactor: CustomCamera | MovingActor) {
    if (interactor instanceof MovingActor) return
    if (this.waitForHeadResult) return
    //Painting checking behavior
    this.decideTalk(interactor)

    this.closeDoors()
  }

  talkPainting(from: CustomCamera | MovingActor) {
    //console.log('talkPainting')
    //Drop current painting
    if (this.heldPainting) {
      this.heldPainting.drop()
      this.heldPainting = null
    }

    //Start talking
    this.talking = true

    //Steal camera painting
    from.heldPainting?.interact(this)
    from.heldPainting = null

    //Wait for stop talkin
    this.startWait(1, () => {
      this.stopTalk()
    })

    //dialogue
    app.DIALOGUE.value = [this.name, `painting[${this.paintingDialogueStep}]`]
  }

  talkPainingResult() {
    if (this.heldPainting) {
      this.heldPainting.drop()
      this.heldPainting = null
    }
    this.talking = true
    this.sounds.talk[0].play()
    const talkingPoint = this.paintingResult !== null ? this.paintingResult + 1 : 1
    app.DIALOGUE.value = [this.name, `painting[${talkingPoint}]`]

    this.startWait(3, () => {
      this.stopTalk()
    })
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
    //talk
    if (this.talking) this.talkAnimation()
    //idle if no talk
    if (!this.talking) this.iddleAnimation()
    //walk and return

    //Wait if we have some wait thing
    if (this.waiting) this.wait()

    if (this.walking) return this.walkToObjective()

    //interact and return
    if (this.interacting) return this.interactAnimation()
    //if talking and not moving, look at me
    if (this.talking) {
      //Check if there are doors to close first
      //Then look at me
      if (!this.closeDoors()) {
        this.lookAt(app.SCENE.camera.position.x, this.position.y, app.SCENE.camera.position.z)
      }
    }

    if (this.waitForHeadResult) {
      //Return if we're waiting for results
      if (app.INTERACTIONS.actors.heads.currentFaceIndex === null) return
      //We have a result! lets talk about it

      this.paintingResult = app.INTERACTIONS.actors.heads.currentFaceIndex

      //Wait a second before saying the result
      this.waitForHeadResult = false
      this.startWait(1, () => {
        this.talkPainingResult()
      })
    }

    //If nothing is happening, add delta for eventual decision making
    this.currentDelta += app.SCENE.delta

    //Return if the threshold for decision is not reached
    if (this.currentDelta < this.decisionDelta) return

    //Flick the heads or move around if no doors to close
    if (!this.closeDoors()) {
      if (this.heldPainting) {
        this.goToActor(app.INTERACTIONS.actors.heads, 'interact')
        this.waitForHeadResult = true
      } else {
        this.getDestination(17)
      }
    }

    //Get new decision delta
    this.currentDelta = 0
    this.decisionDelta = Math.random() * 20
  }
}
