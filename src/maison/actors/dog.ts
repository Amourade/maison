import * as THREE from 'three'
import { MovingActor } from './shared/movingActor'
import { app } from '@/maison/app'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// @ts-ignore
import modelGLTF from '@/maison/assets/models/dog.glb'
import step1 from '@/maison/assets/sounds/dog/steps/1.mp3'
import step2 from '@/maison/assets/sounds/dog/steps/2.mp3'
import step3 from '@/maison/assets/sounds/dog/steps/3.mp3'
import step4 from '@/maison/assets/sounds/dog/steps/4.mp3'
import step5 from '@/maison/assets/sounds/dog/steps/5.mp3'
import step6 from '@/maison/assets/sounds/dog/steps/6.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'

const steps = {
  one: step1,
  two: step2,
  three: step3,
  four: step4,
  five: step5,
  six: step6
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
export class Dog extends MovingActor {
  openFace!: THREE.Object3D | undefined
  body!: THREE.Object3D | undefined
  closedFace!: THREE.Object3D | undefined

  constructor() {
    super(model, 0, parsedSteps)

    this.scaleOffset = 1
    this.scaleOffsetFactor = 0.0002

    this.setInitial(new THREE.Vector3(-190, 0, 260.8), new THREE.Vector3(2, 2, 2), 52.59)

    this.makeGrabArea(new THREE.Vector3(0, 2, 2))

    app.INTERACTIONS.interactives.push(this)
    app.ANIMATED.push(this)

    this.openFace = this.getObjectByName('face_ouverte')
    this.openFace!.visible = false
    this.body = this.getObjectByName('corps')
    this.closedFace = this.getObjectByName('face_ferme')
  }

  interact = () => {
    this.openFace!.visible = !this.openFace!.visible
    this.closedFace!.visible = !this.closedFace!.visible
    //this.getRandomDestination()
    /* const flower =
      app.INTERACTIONS.flowers[Math.floor(Math.random() * app.INTERACTIONS.flowers.length)]

    if (flower.grid && flower.grid.space) this.getDestination(flower.grid.space.id, flower, 'grab')
    this.goToActor(flower, 'grab') */
  }

  iddleAnimation() {
    this.body!.scale.x = this.scaleOffset
    this.body!.scale.y = this.scaleOffset
    this.body!.scale.z = this.scaleOffset
    if (this.scaleOffset > 1.03 || this.scaleOffset < 1)
      this.scaleOffsetFactor = this.scaleOffsetFactor * -1
    this.scaleOffset += this.scaleOffsetFactor
  }

  animate() {
    if (!this.snapped) this.snapToGround()
    this.iddleAnimation()
    if (this.walking) this.walkToObjective()
    if (this.interacting) this.interactAnimation()
  }
}
