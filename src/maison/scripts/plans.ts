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
  const flowers = app.INTERACTIONS.flowers.filter((value) => {
    return value.grid && value.planted
  })

  return flowers.length ? flowers[Math.floor(Math.random() * flowers.length)] : false
}

export const getRandomUnplantedFlower = () => {
  const unplantedFlowers = app.INTERACTIONS.flowers.filter((value) => {
    return value.grid && !value.planted && !value.heldBy
  })

  return unplantedFlowers.length
    ? unplantedFlowers[Math.floor(Math.random() * unplantedFlowers.length)]
    : false
}
