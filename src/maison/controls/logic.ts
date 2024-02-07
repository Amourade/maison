import * as THREE from 'three'
import type { SittingGirl } from '../actors/sittingGirl'
import { app } from '../app'
import type { Doors } from '../house/scripts/doors'

export const animate = () => {
  /**
   * Make sure the games pauses if controls are not Locked
   */

  checkInteractions()
  makeMovement()
}

export const onMouseClick = (e: MouseEvent) => {
  //e.preventDefault()

  if (app.CONTROLS.isLocked && app.INTERACTIONS.INTERSECTED.value) {
    app.SCENE.camera?.interact()
  }

  return false
}

export const onMouseMove = (event: MouseEvent) => {
  if (app.CONTROLS.isLocked === true) {
    app.SCENE.mouse.set(0, 0)
  } else {
    app.SCENE.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    app.SCENE.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
}

function checkInteractions() {
  /**
   * Cast Ray for Interaction
   */
  const interactionRay = app.INTERACTIONS.ray
  const mouse = app.SCENE.mouse
  const camera = app.SCENE.camera
  const interactiveObjects = app.INTERACTIONS.interactives.filter(
    (interactive) => !interactive.held
  )
  let intersected

  if (!camera) return

  interactionRay.setFromCamera(mouse, camera)
  const intersects = []

  const interactiveBoxes = interactiveObjects.map((object) => {
    return new THREE.Box3().setFromObject(object)
  })
  //const intersections = interactionRay.intersectObjects(interactiveObjects, true)

  for (let i = 0; i < interactiveObjects.length; i++) {
    if (interactionRay.ray.intersectsBox(interactiveBoxes[i])) {
      const seenObject: {
        object: Doors | SittingGirl | undefined
        distanceVector: THREE.Vector3 | undefined
        distance: number
      } = { object: undefined, distanceVector: undefined, distance: 0 }

      seenObject.object = interactiveObjects[i]
      seenObject.distanceVector = new THREE.Vector3()
      interactionRay.ray.intersectBox(interactiveBoxes[i], seenObject.distanceVector)
      seenObject.distance = seenObject.distanceVector.distanceTo(camera.position)
      intersects.push(seenObject)
    }
  }

  /**
   * Sort Interactions so the closest one can be picked
   */
  intersects.sort((a, b) => (a.distance > b.distance ? 1 : -1))

  if (intersects.length && intersects[0].distance <= interactionRay.far) {
    /**
     * We have an Intersection, we can set it if it's different from the current one
     */
    if (intersected != intersects[0].object) {
      intersected = intersects[0].object
      //}
      //if (intersections.length > 0) {
      //intersected = intersections[0].object
    } else {
      /**
       * No Intersections here, look away
       */
      intersected = undefined
    }
  }
  app.INTERACTIONS.INTERSECTED.value = intersected
}

const stepThreshold = 0.5
let currentStepCounts = 0

function makeMovement() {
  const velocity = app.MOVEMENT.velocity
  const delta = app.SCENE.delta
  const moveForward = app.MOVEMENT.forward
  const moveBackward = app.MOVEMENT.backward
  const moveLeft = app.MOVEMENT.left
  const moveRight = app.MOVEMENT.right
  const groundRaycaster = app.INTERACTIONS.groundRay
  const camera = app.SCENE.camera
  const groundsArray = app.INTERACTIONS.grounds
  const wallsArray = app.INTERACTIONS.walls
  const wallRaycasters = app.INTERACTIONS.wallRays
  const controls = app.CONTROLS
  const direction = app.MOVEMENT.direction
  const walkingSpeed = app.MOVEMENT.speed

  if (!camera) return

  /**
   * Automatic speed reduction
   */
  //velocity.x -= velocity.x * 10.0 * delta
  velocity.x = Math.abs(velocity.x) < 1 ? 0 : velocity.x - velocity.x * 10.0 * delta
  //velocity.z -= velocity.z * 10.0 * delta
  velocity.z = Math.abs(velocity.z) < 1 ? 0 : velocity.z - velocity.z * 10.0 * delta
  velocity.y -= 9.8 * 50 * delta // 100.0 = mass

  /**
   * Establish and normalizes movement vector
   */
  direction.z = Number(moveForward) - Number(moveBackward)
  direction.x = Number(moveRight) - Number(moveLeft)
  direction.normalize()

  /**
   * Ground detection
   */
  groundRaycaster.ray.origin.copy(camera.position)
  const intersections = groundRaycaster.intersectObjects(groundsArray)

  if (intersections.length > 0 && velocity.y * delta < 1) {
    velocity.y = 0
    camera.position.y = intersections[0].point.y + 10.5
    if (!app.MOVEMENT.canJump) {
      currentStepCounts = 0
      camera.playStep()
    }
    app.MOVEMENT.canJump = true
  }

  /**
   * Wall Detection
   */
  const intersectedWalls = []
  for (let i = 0; i < wallRaycasters.length; i++) {
    wallRaycasters[i].ray.origin.copy(camera.position)
    wallRaycasters[i].ray.origin.y -= 5
    intersectedWalls.push({
      wallIntersects: wallRaycasters[i].intersectObjects(wallsArray),
      ray: wallRaycasters[i]
    })
  }

  for (let i = 0; i < intersectedWalls.length; i++) {
    const wall = intersectedWalls[i]
    if (wall.wallIntersects.length && wall.wallIntersects[0].distance <= 1) {
      if (wall.ray.ray.direction.x !== 0) {
        camera.position.x -= (1 - wall.wallIntersects[0].distance) * wall.ray.ray.direction.x
      }
      if (wall.ray.ray.direction.z !== 0) {
        camera.position.z -= (1 - wall.wallIntersects[0].distance) * wall.ray.ray.direction.z
      }
      velocity.x = 0
      velocity.z = 0
    }
  }

  /**
   * Applies speed to appropriate directions
   */
  if (moveForward || moveBackward) velocity.z -= direction.z * walkingSpeed * delta
  if (moveLeft || moveRight) velocity.x -= direction.x * walkingSpeed * delta

  controls.moveRight(-velocity.x * delta)
  controls.moveForward(-velocity.z * delta)
  controls.getObject().position.y += velocity.y * delta

  /**
   * Camera step sound effect logic
   */
  if ((velocity.x !== 0 && velocity.y === 0) || (velocity.z !== 0 && velocity.y === 0)) {
    if (stepThreshold <= currentStepCounts) {
      camera?.playStep()
      currentStepCounts = 0
    }
    currentStepCounts += delta
  }

  //Reset height if falling
  if (controls.getObject().position.y < -500) {
    controls.getObject().position.y = 500
  }
}
