import { app } from '@/maison/app'
import * as THREE from 'three'
import { Link } from './link'

import openSound from '@/maison/assets/sounds/house/open.mp3'
import closeSound from '@/maison/assets/sounds/house/close.mp3'
import { parseSounds } from '@/maison/scripts/parseAssets'

const sounds = {
  open: openSound,
  close: closeSound
}

const parsedSounds = parseSounds(sounds)

export class Doors extends Link {
  leftDoor!: LeftDoor
  rightDoor!: RightDoor
  sounds!: { open: THREE.PositionalAudio; close: THREE.PositionalAudio }
  state: string = 'closed'

  constructor(door: DoorObject, wallOffset: number, dimensions: Dimensions) {
    super()

    this.leftDoor = new LeftDoor(door, wallOffset, dimensions)
    this.add(this.leftDoor)

    this.rightDoor = new RightDoor(door, wallOffset, dimensions)
    this.add(this.rightDoor)

    this.sounds = {
      open: new THREE.PositionalAudio(app.SCENE.listener!),
      close: new THREE.PositionalAudio(app.SCENE.listener!)
    }

    this.sounds.open.setBuffer(parsedSounds.open!)
    this.sounds.open.setRefDistance(40)
    this.sounds.open.loop = false
    this.add(this.sounds.open)

    this.sounds.close.setBuffer(parsedSounds.close!)
    this.sounds.close.setRefDistance(40)
    this.sounds.close.loop = false
    this.add(this.sounds.close)

    this.position.y = door.height / 2 - 0.5
    this.position.x += dimensions.width / 2 - dimensions.width * door.position.x

    this.name = door.name

    this.makeDoorLinks(door.width / 2, [dimensions.depth + 5, door.height / 2 - 2])
    app.INTERACTIONS.interactives.push(this)
  }

  interact = () => {
    this.state === 'closed' ? this.open() : this.close()
  }

  close = () => {
    this.leftDoor.close()
    this.rightDoor.close()
    this.sounds.close.play()
    this.state = 'closed'
  }

  open = () => {
    this.leftDoor.open()
    this.rightDoor.open()
    this.sounds.open.play()
    this.state = 'open'
  }
}

export class LeftDoor extends THREE.Mesh {
  door!: THREE.Mesh
  constructor(doorRef: DoorObject, wallOffset: number, dimensions: Dimensions) {
    super(
      new THREE.BoxGeometry(doorRef.width + wallOffset, doorRef.height - 1, dimensions.depth * 0.6),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    this.position.x -= doorRef.width / 2

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        doorRef.width / 2 + wallOffset,
        doorRef.height - 1,
        dimensions.depth * 0.6
      ),
      doorRef.material.left
    )
    doorMesh.position.x += doorRef.width / 4
    doorMesh.name = 'door'

    this.add(doorMesh)
  }

  open = () => {
    this.rotation.y = -Math.PI / 2
  }

  close = () => {
    this.rotation.y = 0
  }
}

export class RightDoor extends THREE.Mesh {
  door!: THREE.Mesh
  constructor(doorRef: DoorObject, wallOffset: number, dimensions: Dimensions) {
    super(
      new THREE.BoxGeometry(doorRef.width + wallOffset, doorRef.height - 1, dimensions.depth * 0.6),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    this.position.x += doorRef.width / 2

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        doorRef.width / 2 + wallOffset,
        doorRef.height - 1,
        dimensions.depth * 0.6
      ),
      doorRef.material.right
    )
    doorMesh.position.x -= doorRef.width / 4
    doorMesh.name = 'door'
    this.add(doorMesh)
  }

  open = () => {
    this.rotation.y = Math.PI / 2
  }

  close = () => {
    this.rotation.y = 0
  }
}
