import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { CustomCamera } from './controls/camera'
//import { CameraActor } from '../actors/camera'

export const init = () => {
  //Scene
  const scene = new THREE.Scene()

  //Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    logarithmicDepthBuffer: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  //renderer.shadowMap.enabled = false
  //renderer.shadowMap.type = THREE.VSMShadowMap
  renderer.domElement.id = 'renderer'
  //document.body.appendChild(renderer.domElement)

  //Clock
  const clock = new THREE.Clock()

  //Camera
  //const camera = new CameraActor()
  const camera = new CustomCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    3000,
    new THREE.Vector3(20, 200, 20)
  )
  scene.add(camera)

  //Audio Listerner
  const listener = new THREE.AudioListener()
  camera.add(listener)

  //Ambient Light
  scene.add(new THREE.AmbientLight(0x444444))

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
  scene.add(spotLight)

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
  scene.add(dirLight)

  //Fog
  scene.fog = new THREE.FogExp2(0xa10e0e, 0.0005)

  //Controls
  const controls = new PointerLockControls(camera, document.body)
  scene.add(controls.getObject())

  //Add to global variables
  return { scene, renderer, clock, camera, listener, controls }
}
