import type { Ref } from 'vue'
import type { CustomCamera } from './controls/camera'
import type { RotatingHeads } from './actors/heads'
import type { MovingActor } from './actors/shared/movingActor'
import type { FlowerActor } from './nature/scripts/flowerActor'
import type { SittingGirl } from './actors/sittingGirl'
import type { Clown } from './actors/clown'
import type { Dog } from './actors/dog'
import type { Painting } from './actors/paintings/painting'

interface MaisonApp {
  SCENE: {
    HEIGHT: number
    WIDTH: number
    clock: THREE.Clock
    delta: number
    paused: ref<boolean>
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: CustomCamera | null
    listener: THREE.AudioListener
    mouse: THREE.Vector2
    bg: THREE.Audio | null
  }
  DEBUG: {
    general: boolean
    grids: boolean
    helpers: Array<any>
    map: boolean
  }
  LOADER: THREE.LoadingManager
  LOADING_PERCENT: Ref<number>
  LOADED: Ref<boolean>
  EVENTS_MASTER: EventsMaster
  CONTROLS: PointerLockControls
  MOVEMENT: {
    speed: number
    direction: THREE.Vector3
    velocity: THREE.Vector3
    forward: boolean
    backward: boolean
    left: boolean
    right: boolean
    canJump: boolean
  }
  INTERACTIONS: {
    grounds: Array<THREE.Mesh>
    walls: Array<THREE.Mesh | THREE.Object3D>
    interactives: Array<Doors | SittingGirl | Clown | Dog | Painting | FlowerActor | RotatingHeads>
    INTERSECTED: Doors | SittingGirl | undefined
    ray: THREE.Raycaster
    groundRay: THREE.Raycaster
    wallRays: Array<THREE.Raycaster>
    actors: { [key: string]: RotatingHeads }
    flowers: Array<FlowerActor>
    paintings: Array<Painting>
  }
  ANIMATED: Array<SittingGirl | Dog | Clown | FlowerActor | RotatingHeads | Painting>
  PLANS: {
    all: Array<PlanMesh>
    outside: Array<PlanMesh>
    inside: Array<PlanMesh>
    space_map: Map<number, Space>
  }
  DIALOGUE: Ref<[string, string]>
}

interface WallObject {
  dimensions: Dimensions
  position: THREE.Vector3
  rotation: number
  material: any
  borderMaterial: any
  hole: Array<DoorObject | WindowObject | HoleObject>
}

interface RoomConfig {
  walls: Array<WallObject>
  ceiling: FloorObject | undefined
  floor: FloorObject | undefined
  position: THREE.Vector3 | undefined
  name: string
}

interface FloorObject {
  dimensions: { width: number; height: number; depth: number }
  material: any
  position: THREE.Vector3
  isGround: boolean
}

interface Dimensions {
  width: number
  height: number
  depth: number
  wallDepth: number
  ceilingDepth: number
}

type LinksArray = Array<{ grid: string; through: string; side: string | null }>

interface Space {
  id: number
  name: string
  connectedSpaces: Array<number>
}

interface DoorObject {
  type: 'door'
  height: number
  width: number
  position: {
    x: number
    y: number
  }
  name: string
  material: any
}

interface WindowObject {
  type: 'window'
  height: number
  width: number
  position: {
    x: number
    y: number
  }
  hasBorders: boolean
}

interface HoleObject {
  type: 'hole'
  height: number
  width: number
  position: {
    x: number
    y: number
  }
  name: string
  hasBorders: Boolean
}

interface MatInfo {
  type: string
  reverse: boolean
  fullWidth: boolean
  value: string
}

interface MatsList {
  [key: string]: Array<any>
}

interface SoundsList {
  [key: string]: string
}

interface ParsedSoundsList {
  [key: string]: AudioBuffer
}

interface ParsedMatsList {
  [key: string]:
    | Array<THREE.MeshBasicMaterial | import('./house/scripts/customMaterial').CustomMaterial>
    | ParsedMatsList
}

declare module '*.glb' {
  const src: string
  export default src
}
