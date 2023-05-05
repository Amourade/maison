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
import { parseSounds } from '@/maison/scripts/parseAssets'
import { getRandomFlower } from '../scripts/plans'

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

    this.setInitial(new THREE.Vector3(-146, 10, 383), new THREE.Vector3(3.5, 3.5, 3.5), Math.PI / 2)

    this.makeGrabArea(new THREE.Vector3(0, 2, 2))

    app.INTERACTIONS.interactives.push(this)
    app.ANIMATED.push(this)
  }

  interact = () => {
    this.decideAction()
  }

  decideAction() {
    /* if (Math.random() < 0.15) {
      this.getDestination(2)

      return
    }

    if (Math.random() < 0.1) {
      setTimeout(() => {}, Math.random() * 10000)

      return
    } */

    if (!this.holding /*  || Math.random() < 0.5 */) {
      const flower = getRandomFlower()
      flower.grid ? this.goToActor(flower, 'grab') : this.getRandomDestination()
      //this.goToActor(flower, 'grab')

      return
    }

    if (this.holding) {
      //if (Math.random() > 0.2) {
      const flower = getRandomFlower()
      flower.grid ? this.goToActor(flower, 'grab') : this.getRandomDestination()
      //this.goToActor(flower, 'grab')

      return /* 
      Math.random() < 0.9
        ? this.getRandomInsideDestination('plant')
        : this.getRandomDestination('plant')

      return */
      //}

      //this.getRandomDestination()
    }
  }

  iddleAnimation() {
    this.scale.x += this.scaleOffsetFactor
    this.scale.z += this.scaleOffsetFactor
    if (this.scaleOffset > 0.06 || this.scaleOffset < 0) this.scaleOffsetFactor *= -1
    this.scaleOffset += this.scaleOffsetFactor
  }

  animate() {
    if (!this.snapped) this.snapToGround()
    this.iddleAnimation()
    if (this.walking) this.walkToObjective()
    if (this.interacting) this.interactAnimation()
  }
}
