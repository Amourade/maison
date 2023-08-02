import { app } from '@/maison/app'
import * as THREE from 'three'
import { getRandomPlan, getRandomInsidePlan, getRandomOutsidePlan } from '@/maison/scripts/plans'
import { buildRoute, getRandomGridPoint } from './pathfinding'
import { PlanMesh } from '@/maison/house/scripts/planMesh'
import { easingFunctions } from '@/maison/scripts/easingFunctions'
import { Doors } from '@/maison/house/scripts/doors'
import type { ParsedSoundsList } from '@/maison/types'
import type { RotatingHeads } from '../heads'
import type { SittingGirl } from '../sittingGirl'
import type { Clown } from '../clown'
import type { Dog } from '../dog'
import type { Painting } from '../paintings/painting'
import { Flower } from '@/maison/nature/flower'
import { Sunflower } from '@/maison/nature/sunflower'

export class MovingActor extends THREE.Group {
  //Interaction Info
  groundRay: THREE.Raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    20
  )
  snapped: boolean = false
  interacting: boolean = false
  crouchingStep: number = 0
  crouchSpeed: number = 0.05
  grabPoint!: THREE.Mesh
  sounds: { [key: string]: Array<THREE.PositionalAudio> } = { steps: [], talk: [] }
  holding: boolean = false
  heldFlowers: Array<Flower | Sunflower> = []
  heldPainting: Painting | null = null

  //Talking Info
  talking: boolean = false
  talkSpeed: number = 0.1
  talkingStep: number = 0
  currentDialogueStep: number = -1
  dialogueCutoffRadius: number = 70
  dialogueStep: number = -1
  dialogueLength: number = 0

  //Pathfinding Info
  grid!: PlanMesh
  walking: boolean = false
  walkCounter: number = 0
  walkDelta: number = 0.01
  destination!: any
  destinationSteps!: any
  destinationPosition: THREE.Vector3 = new THREE.Vector3()
  destinationPositionDelta: Number = 0
  previousDestinationPosition: THREE.Vector3 = new THREE.Vector3()
  currentStep!: any
  step: number = 0
  movePath!: THREE.CatmullRomCurve3
  moveIncrement!: number
  movePercent: number = 0
  wobbleCounter: number = 0
  wobbling: boolean = false
  wobbleAxis: THREE.Vector3 = new THREE.Vector3(0, 1, 1)
  wobbleStrength: number = 0.02
  previousWobble: number = 0
  minIncrement: number = 0.01
  speed: number = 40
  callback!: Function

  //Basic info
  refScale: THREE.Vector3 = this.scale.clone()

  decisionDelta = Math.random() * 30
  currentDelta = 0
  scaleOffset = 0
  scaleOffsetFactor = 0.0006
  snapOffset!: number
  refSnapOffset!: number
  model!: THREE.Group

  constructor(model: THREE.Group, snapOffset: number, steps: ParsedSoundsList) {
    super()
    this.snapOffset = snapOffset
    this.refSnapOffset = snapOffset
    this.add(model)
    Object.keys(steps).forEach((key) => {
      if (steps[key] instanceof AudioBuffer) {
        const audio = new THREE.PositionalAudio(app.SCENE.listener)
        audio.setBuffer(steps[key])
        audio.setRefDistance(20)
        audio.loop = false
        //this.add(this.sounds.open)
        this.sounds.steps.push(audio)
        this.add(audio)
      }
    })
    this.model = model
    //app.INTERACTIONS.actors.push(this)
  }

  setInitial(position: THREE.Vector3, scale: THREE.Vector3, rotation: number) {
    this.position.copy(position)
    this.scale.copy(scale)
    this.refScale = this.scale.clone()

    if (rotation) this.rotation.y = rotation
  }

  makeGrabArea(position: THREE.Vector3) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    )
    mesh.position.copy(position)
    this.add(mesh)
    this.grabPoint = mesh
    app.DEBUG.helpers.push(mesh)
  }

  snapToGround() {
    //Two ray casting, one for ground snapping and one for space grid detection
    this.position.y += 5
    this.groundRay.ray.origin.copy(this.position)

    //Grid Detection
    const Gridintersections = this.groundRay.intersectObjects(app.PLANS.all)

    if (Gridintersections.length > 0 && Gridintersections[0].object instanceof PlanMesh) {
      this.grid = Gridintersections[0].object
    }

    //Ground snapping
    const Groundintersections = this.groundRay.intersectObjects(app.INTERACTIONS.grounds)

    if (Groundintersections.length > 0) {
      const intersected = Groundintersections[0]

      this.position.y = intersected.point.y + this.snapOffset
      this.snapped = true

      return
    }

    this.position.y -= 5
  }

  walkToObjective() {
    this.walkCounter += app.SCENE.delta
    if (this.walkCounter < this.walkDelta) return

    this.walkCounter = 0
    this.destinationPosition.copy(
      this.movePath.getPointAt(easingFunctions.easeInOutQuad(this.movePercent))
    )

    this.position.x = this.destinationPosition.x
    this.position.z = this.destinationPosition.z

    this.movePercent += this.moveIncrement
    this.snapToGround()

    this.lookAt(
      this.destination[this.currentStep].coord.x,
      this.position.y,
      this.destination[this.currentStep].coord.z
    )

    this.wobbleCounter++
    if (this.wobbleCounter >= 30) {
      this.wobble()
      this.wobbleCounter = 0
    }

    //DESTINATION REACHED
    if (this.movePercent >= 1) {
      this.movePercent = 0

      this.wobble(true)
      this.wobbleCounter = 0

      const currentStepObject: { coord: THREE.Vector3; object: any; action: string } =
        this.destination[this.currentStep]
      if (currentStepObject.action) {
        //We just continue normally if the door is already open
        if (
          currentStepObject.object instanceof Doors &&
          currentStepObject.action === currentStepObject.object.state
        ) {
          return this.doNextStep()
        }

        this.walking = false
        this.interacting = true
        return
      }

      this.doNextStep()
    }
  }

  open(door: Doors) {
    door.open()
  }

  close(door: Doors) {
    door.close()
  }

  drop() {
    //drop random item
    const index = Math.floor(Math.random() * this.heldFlowers.length)
    const object = this.heldFlowers[index]

    if (object instanceof Flower || object instanceof Sunflower) {
      object.drop()
      this.heldFlowers.splice(index, 1)
    }

    if (this.heldFlowers.length === 0) {
      this.holding = false
    }
  }

  plant() {
    const index = Math.floor(Math.random() * this.heldFlowers.length)
    const object = this.heldFlowers[index]

    if (object instanceof Flower || object instanceof Sunflower) {
      object.plant()
      this.heldFlowers.splice(index, 1)
    }

    if (this.heldFlowers.length === 0) {
      this.holding = false
    }
  }

  grab(el: Flower | Sunflower) {
    el.grab(this)
    this.holding = true
    this.heldFlowers.push(el)
  }

  interactAnimation() {
    if (this.crouchingStep === 0) {
      this.scale.y -= this.crouchSpeed

      if (this.scale.y <= this.refScale.y / 1.5) {
        this.crouchingStep = 1

        const currentStepObject: { coord: THREE.Vector3; object: any; action: string } =
          this.destination[this.currentStep]
        if (currentStepObject.action) {
          //TOCHANGE QUICKFIX
          if (currentStepObject.action === 'interact') {
            currentStepObject.object[currentStepObject.action](this)
          } else {
            this[currentStepObject.action as keyof MovingActor](currentStepObject.object)
          }
        }
      }
    }

    if (this.crouchingStep === 1) {
      this.scale.y += this.crouchSpeed

      if (this.scale.y >= this.refScale.y) {
        this.crouchingStep = 0

        this.scale.y = this.refScale.y
        this.snapOffset = this.refSnapOffset

        this.interacting = false
        this.doNextStep()
      }
    }

    this.snapOffset = (this.scale.y * this.refSnapOffset) / this.refScale.y
    this.snapToGround()
  }

  talk(type: string) {
    if (this.talking && this.currentDialogueStep === this.dialogueLength - 1) {
      return this.stopTalk()
    }
    //Reset dialogue setp if its a different type of dialogue
    if (app.DIALOGUE.value[1].indexOf(type)) this.currentDialogueStep = -1
    this.talking = true
    this.currentDialogueStep++
    app.DIALOGUE.value = [this.name, `${type}[${this.currentDialogueStep}]`]
  }

  talkAnimation() {
    if (this.talkingStep === 0) {
      this.scale.y -= this.talkSpeed

      if (this.scale.y < (this.refScale.y * 50) / 100) {
        this.talkingStep++
      }
    }

    if (this.talkingStep === 1) {
      this.scale.y += this.talkSpeed

      if (this.scale.y > (this.refScale.y * 120) / 100) {
        this.talkingStep++
      }
    }

    if (this.talkingStep === 2) {
      this.scale.y = this.refScale.y
      this.talkingStep = 0
    }

    if (!app.SCENE.camera) return

    const cameraPosition = app.SCENE.camera.position
    const thisPosition = this.position

    if (cameraPosition.distanceTo(thisPosition) > this.dialogueCutoffRadius) {
      this.stopTalk()
    }
  }

  stopTalk() {
    this.talking = false
    this.currentDialogueStep = -1
    app.DIALOGUE.value = ['', '']
    this.sounds.talk.forEach((sound) => {
      sound.stop()
    })
    this.scale.copy(this.refScale)
  }

  stopSounds() {
    for (const key in this.sounds) {
      this.sounds[key].forEach((sound) => {
        sound.stop()
      })
    }
  }

  wobble(reset: Boolean = false) {
    this.step++
    if (this.previousWobble) {
      this.model.rotateOnAxis(this.wobbleAxis, -this.previousWobble)
    }

    if (reset) {
      this.previousWobble = 0
      return
    }

    if (this.step % 2 === 0) {
      this.model.rotateOnAxis(this.wobbleAxis, this.wobbleStrength)
      this.previousWobble = this.wobbleStrength
      if (this.sounds.steps.length)
        this.sounds.steps.length === 2
          ? this.sounds.steps[0].play()
          : this.sounds.steps[Math.floor(Math.random() * (this.sounds.steps.length / 2))].play()
    } else {
      this.model.rotateOnAxis(this.wobbleAxis, -this.wobbleStrength)
      this.previousWobble = -this.wobbleStrength
      if (this.sounds.steps.length)
        this.sounds.steps.length === 2
          ? this.sounds.steps[1].play()
          : this.sounds.steps[
              Math.floor(Math.random() * (this.sounds.steps.length / 2)) +
                this.sounds.steps.length / 2
            ].play()
    }
  }

  doNextStep() {
    if (this.currentStep + 1 < this.destinationSteps) {
      this.walking = true
      this.currentStep++
      this.goTo(this.currentStep)
    } else {
      //We are absolutely done
      this.walking = false
      if (this.callback) {
        setTimeout(this.callback, 1000)
      }
    }
  }

  closeDoors() {
    //Little hack for closing a specific door
    const links = this.grid.linksTo

    //We leave if we don't have links (should be impossible?)
    if (!links.length) return false

    const doorsToClose: { door: Doors; side: string }[] = []

    links.forEach((link: { grid: string; through: string; side: string | null }) => {
      const linkObject = app.SCENE.scene.getObjectByName(link.through)
      if (linkObject instanceof Doors && linkObject.state === 'open')
        doorsToClose.push({
          door: linkObject,
          side: link.side ? link.side : '' /**oops */
        })
    })

    //We leave if we don't have doors to close
    if (!doorsToClose.length) return false

    const destinationsObjects: {
      object: Doors | null
      action: string
      coord: { x: number; y: number; z: number }
    }[] = []

    //We have doors to close
    doorsToClose.forEach((doorToClose) => {
      destinationsObjects.push({
        object: doorToClose.door,
        action: 'close',
        coord: getRandomGridPoint(doorToClose.door.getObjectByName(doorToClose.side))
      })
    })

    //Add a last random position in the room to top it off
    destinationsObjects.push({
      object: null,
      action: '',
      coord: getRandomGridPoint(this.grid)
    })

    //We go!
    this.setDestination(destinationsObjects)

    return true
  }

  getRandomDestination(action: string | null = null) {
    this.getDestination(getRandomPlan()?.space.id, null, action)
  }

  getRandomOutsideDestination(action: string | null = null) {
    this.getDestination(getRandomOutsidePlan().space.id, null, action)
  }

  getRandomInsideDestination(action: string | null = null) {
    this.getDestination(getRandomInsidePlan().space.id, null, action)
  }

  goToActor(
    el: Flower | Sunflower | Dog | SittingGirl | Clown | RotatingHeads,
    action: string | null = null
  ) {
    this.getDestination(el.grid?.space.id, el, action)
  }

  getDestination(to: number, object: any = null, action: string | null = null) {
    this.setDestination(buildRoute(this.grid.space.id, to, object, action))
  }

  setDestination(dest: any, callback: Function = () => {}) {
    this.destination = dest
    this.destinationSteps = dest.length
    this.currentStep = 0
    this.goTo(this.currentStep)

    if (callback) {
      this.callback = callback
    }
  }

  goTo(step: any) {
    this.movePath = new THREE.CatmullRomCurve3([
      this.position.clone(),
      this.destination[step].coord.clone()
    ])

    this.moveIncrement =
      (this.speed * app.SCENE.delta) / this.movePath.getLength() > this.minIncrement
        ? this.minIncrement
        : (this.speed * app.SCENE.delta) / this.movePath.getLength()

    //GET THE THING WALKING
    if (!this.walking) this.walking = true
  }

  waitDelta: number = 0
  waitTrigger: number = 0
  waitCallback!: Function
  waiting: boolean = false

  startWait(time: number, callback: Function) {
    this.waitTrigger = time
    this.waiting = true
    this.waitDelta = 0
    this.waitCallback = callback
  }

  wait() {
    this.waitDelta += app.SCENE.delta
    if (this.waitDelta >= this.waitTrigger) {
      this.waiting = false
      this.waitCallback()
    }
  }
}
