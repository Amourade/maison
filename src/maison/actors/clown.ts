import * as THREE from 'three'
import { MovingActor } from './shared/movingActor'
import { app } from '@/maison/app'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// @ts-ignore
import modelGLTF from '@/maison/assets/models/clown.glb'
import step1 from '@/maison/assets/sounds/clown/pas1.mp3'
import step2 from '@/maison/assets/sounds/clown/pas2.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'

const steps = {
  one: step1,
  two: step2
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

export class Clown extends MovingActor {
  constructor() {
    super(model, 0, parsedSteps)

    this.setInitial(new THREE.Vector3(-0, 70, 0), new THREE.Vector3(2, 2, 2), Math.PI / 2)

    this.makeGrabArea(new THREE.Vector3(0, 7.5, 2))

    this.walkDelta = 0.001

    app.INTERACTIONS.interactives.push(this)
    app.ANIMATED.push(this)

    this.dialogues.push(
      'Je ne suis pas le vender de peinture mais je le connais bien',
      "Je crois qu'il est parti acheter des peintures"
    )
  }

  interact = () => {
    //    this.getRandomDestination()
    //const flower =
    //app.INTERACTIONS.flowers[Math.floor(Math.random() * app.INTERACTIONS.flowers.length)]
    //if (flower.grid && flower.grid.space) this.getDestination(flower.grid.space.id, flower, 'grab')
    Math.random() > 0.5
      ? this.goToActor(app.INTERACTIONS.actors.heads, 'interact')
      : this.getDestination(17)
    /* console.log(app.INTERACTIONS.actors.heads.interactionZone.grid?.space.id)
    this.getDestination(app.INTERACTIONS.actors.heads.interactionZone.grid?.space.id) */
    //app.INTERACTIONS.actors.heads.interact()
    /* this.talking = true

    if (this.currentDialogueStep + 1 == this.dialogues.length) {
      this.stopTalk()
      return
    }
    if (this.currentDialogueStep === -1) {
      this.currentDialogueStep = 0
      console.log(this.dialogues[this.currentDialogueStep])
      app.DIALOGUE.value = this.dialogues[this.currentDialogueStep]
    } else {
      this.currentDialogueStep++
      console.log(this.dialogues[this.currentDialogueStep])
      app.DIALOGUE.value = this.dialogues[this.currentDialogueStep]
    } */
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
    if (this.talking) {
      this.talkAnimation()
      return
    }
    if (this.walking) this.walkToObjective()
    if (this.interacting) this.interactAnimation()
  }
}
