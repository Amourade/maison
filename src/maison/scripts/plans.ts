import { onDeactivated } from 'vue'
import { app } from '../app'
import type { Flower } from '../nature/flower'
import type { Sunflower } from '../nature/sunflower'

export const getRandomPlan = () => {
  return app.PLANS.all[Math.floor(Math.random() * app.PLANS.all.length)]
}

export const getRandomOutsidePlan = () => {
  return app.PLANS.outside[Math.floor(Math.random() * app.PLANS.outside.length)]
}

export const getRandomInsidePlan = () => {
  return app.PLANS.inside[Math.floor(Math.random() * app.PLANS.inside.length)]
}

export const getRandomFlower = () => {
  let flower: Flower | Sunflower
  let counter: number = 0
  do {
    flower = app.INTERACTIONS.flowers[Math.floor(Math.random() * app.INTERACTIONS.flowers.length)]
    counter++
  } while (flower.grid == undefined || counter < app.INTERACTIONS.flowers.length)

  return flower
}
