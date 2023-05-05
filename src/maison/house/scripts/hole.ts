import { Link } from './link'

export class Hole extends Link {
  constructor(hole: HoleObject, dimensions: Dimensions) {
    super()

    this.name = hole.name

    this.position.y += hole.height / 2 - 0.5

    this.makeDoorLinks(hole.width / 1.3, [dimensions.depth + 5, hole.height / 2 - 2])
  }
}
