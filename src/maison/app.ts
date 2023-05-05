import * as THREE from 'three'
import { ref } from 'vue'
import { EventsMaster } from './eventsMaster'
import { init as initThree } from './three'
import type { MaisonApp } from './types'

const threeVars = initThree()

const interactionRay = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 12)
interactionRay.far = 40

const groundRay = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 12)

export const app: MaisonApp = {
  SCENE: {
    HEIGHT: window.innerHeight,
    WIDTH: window.innerWidth,
    clock: threeVars.clock,
    delta: 0,
    paused: ref<boolean>(true),
    scene: threeVars.scene,
    renderer: threeVars.renderer,
    camera: threeVars.camera,
    listener: threeVars.listener,
    mouse: new THREE.Vector2(0, 0)
  },
  DEBUG: {
    general: false,
    grids: false,
    helpers: [],
    map: false
  },
  LOADER: new THREE.LoadingManager(),
  LOADING_PERCENT: ref<number>(0),
  LOADED: ref<boolean>(false),
  EVENTS_MASTER: new EventsMaster(),
  CONTROLS: threeVars.controls,
  MOVEMENT: {
    speed: 1000,
    direction: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    forward: false,
    backward: false,
    left: false,
    right: false,
    canJump: true
  },
  INTERACTIONS: {
    grounds: [],
    walls: [],
    interactives: [],
    INTERSECTED: ref<undefined | THREE.Object3D>(undefined),
    ray: interactionRay,
    groundRay: groundRay,
    wallRays: [
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 0), 0, 5),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 0), 0, 5),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, 1), 0, 5),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1), 0, 5),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, -1), 0, 4),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(-1, 0, 1), 0, 4),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, 1), 0, 4),
      new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(1, 0, -1), 0, 4)
    ],
    actors: {},
    flowers: [],
    paintings: []
  },
  ANIMATED: [],
  PLANS: {
    all: [],
    outside: [],
    inside: [],
    space_map: new Map()
  },
  DIALOGUE: ref<string>('')
}
