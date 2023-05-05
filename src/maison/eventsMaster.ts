import { app } from './app'

export class EventsMaster {
  triggerChance
  triggerThreshold

  constructor() {
    this.triggerChance = 0
    this.triggerThreshold = Math.random() * 5 + 10
  }

  public init() {
    this.think()
    /* this.setCameraTarget()
    this.setCameraOn() */
  }

  think() {
    this.triggerChance += app.SCENE.delta

    if (this.triggerChance >= this.triggerThreshold) {
      //this.order()

      this.triggerChance = 0
      this.triggerThreshold = Math.random() * 20 + Math.random() * 10 + 5
    }
  }

  /* setCameraOn() {
    app.SCENE.camera.setOn(ACTORS.dog)
  }

  setCameraTarget() {
    ACTORS.target.set(ACTORS.dog)
  }

  order() {
    setTimeout(ACTORS.sittingGirl.doSomething(), Math.random() * 5000)
    setTimeout(ACTORS.clown.doSomething(), Math.random() * 5000)
    setTimeout(ACTORS.dog.doSomething(), Math.random() * 5000)
  } */
}
