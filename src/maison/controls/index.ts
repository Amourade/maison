import { app } from '../app'
import { onMouseClick, onMouseMove } from './logic'

export const init = () => {
  const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp': // up
      case 'KeyW': // w
        app.MOVEMENT.forward = true
        break

      case 'ArrowLeft': // left
      case 'KeyA': // a
        app.MOVEMENT.left = true
        break

      case 'ArrowDown': // down
      case 'KeyS': // s
        app.MOVEMENT.backward = true
        break

      case 'ArrowRight': // right
      case 'KeyD': // d
        app.MOVEMENT.right = true
        break

      case 'Space': // space
        if (app.MOVEMENT.canJump === true) app.MOVEMENT.velocity.y += 150
        app.MOVEMENT.canJump = false
        break

      case 'KeyE': //E
        /* if (!app.SCENE.paused && window.interactions.INTERSECTED) {
          if (!window.scene.lockedOn) {
            window.interactions.INTERSECTED.interact(event)
          } else {
            window.interactions.lockedOn = undefined
          }
        } */
        break
    }
  }

  const onKeyUp = function (event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp': // up
      case 'KeyW': // w
        app.MOVEMENT.forward = false
        break

      case 'ArrowLeft': // left
      case 'KeyA': // a
        app.MOVEMENT.left = false
        break

      case 'ArrowDown': // down
      case 'KeyS': // s
        app.MOVEMENT.backward = false
        break

      case 'ArrowRight': // right
      case 'KeyD': // d
        app.MOVEMENT.right = false
        break
    }
  }

  //Setup rays for walls and floors

  document.addEventListener('keydown', onKeyDown, false)
  document.addEventListener('keyup', onKeyUp, false)
  window.addEventListener('mousemove', onMouseMove, false)
  window.addEventListener('click', onMouseClick, false)
  window.addEventListener('resize', onResize)
}

const onResize = () => {
  app.SCENE.HEIGHT = window.innerHeight
  app.SCENE.WIDTH = window.innerWidth

  app.SCENE.camera.aspect = window.innerWidth / window.innerHeight
  app.SCENE.camera.updateProjectionMatrix()
  app.SCENE.renderer.setSize(window.innerWidth, window.innerHeight)
}
