import * as THREE from 'three'
import { ref } from 'vue'
import { EventsMaster } from './eventsMaster'
import type { MaisonApp } from './types'
import bgMusic from './assets/sounds/bg.mp3'

/**
 * BAD should have all these be different variables that are exported sepratlky depending on their concerns
 * >_<
 */

THREE.ColorManagement.enabled = false

export const app: MaisonApp = {
  SCENE: {
    HEIGHT: window.innerHeight,
    WIDTH: window.innerWidth,
    clock: new THREE.Clock(),
    delta: 0,
    paused: ref<boolean>(true),
    scene: new THREE.Scene(),
    renderer: new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      logarithmicDepthBuffer: true
    }),
    camera: null,
    listener: new THREE.AudioListener(),
    mouse: new THREE.Vector2(0, 0),
    bg: null
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
  CONTROLS: null,
  SHOWALLPICTURES: ref<boolean>(false),
  MOVEMENT: {
    speed: 700,
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
    ray: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 12),
    groundRay: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 12),
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
  PICTURE: {
    taken: ref<boolean>(false),
    taking: ref<boolean>(false),
    uploaded: ref<boolean>(false),
    image: ref<Blob | undefined>(undefined)
  },
  DIALOGUE: ref<[string, string]>(['', ''])
}

//Interaction Ray
app.INTERACTIONS.ray.far = 40

//Renderer
app.SCENE.renderer.setPixelRatio(window.devicePixelRatio)
app.SCENE.renderer.setSize(window.innerWidth, window.innerHeight)
app.SCENE.renderer.outputColorSpace = THREE.LinearSRGBColorSpace
app.SCENE.renderer.domElement.id = 'renderer'

//Ambient Light
app.SCENE.scene.add(new THREE.AmbientLight(0x444444))

//Spotlight
const spotLight = new THREE.SpotLight(0x888888)
spotLight.name = 'Spot Light'
spotLight.angle = Math.PI / 5
spotLight.penumbra = 0.3
spotLight.position.set(100, 150, 60)
spotLight.castShadow = true
spotLight.shadow.camera.near = 8
spotLight.shadow.camera.far = 1000
spotLight.shadow.mapSize.width = 256
spotLight.shadow.mapSize.height = 256
spotLight.shadow.bias = -0.002
spotLight.shadow.radius = 4
app.SCENE.scene.add(spotLight)

//Direction Light
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.name = 'Dir. Light'
dirLight.position.set(500, 500, 500)
dirLight.shadow.camera.near = 0.1
dirLight.shadow.camera.far = 500
dirLight.shadow.camera.right = 250
dirLight.shadow.camera.left = -250
dirLight.shadow.camera.top = 250
dirLight.shadow.camera.bottom = -250
dirLight.shadow.mapSize.width = 2048
dirLight.shadow.mapSize.height = 2048
dirLight.shadow.radius = 4
dirLight.shadow.bias = -0.0005
app.SCENE.scene.add(dirLight)

//Fog
app.SCENE.scene.fog = new THREE.FogExp2(0xffffff, 0.0001)

//Load background music
new THREE.AudioLoader(app.LOADER).load(bgMusic, (buffer) => {
  app.SCENE.bg = new THREE.Audio(app.SCENE.listener)
  app.SCENE.bg.buffer = buffer
  app.SCENE.bg.setVolume(0.75)
  app.SCENE.bg.loop = true
})
