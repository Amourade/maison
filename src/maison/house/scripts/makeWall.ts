import * as THREE from 'three'
import { Doors } from './doors'
import { Hole } from './hole'
import { makeDoorFrame, makeWindowFrame } from './makeFrame'

export const makeWall = (wall: WallObject): THREE.Group => {
  /**
   * Wall building multi-purpose function-
   * Builds a wall depending on windows and doors from left to right
   * -->1--->2---
   *
   * -Would love to find a solution to texture cloning for offset purpose
   */

  /**
   * Basic wall Variables
   */
  const { dimensions, position, rotation, borderMaterial, material, hole } = wall

  const wallOffset = 0
  const wallObject = new THREE.Group()

  if (hole.length === 0) {
    /**
     * We have a wall without holes, easy!
     */
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(dimensions.width + wallOffset, dimensions.height, dimensions.depth),
      material
    )
    mesh.position.y += dimensions.height / 2
    mesh.name = 'wall'

    wallObject.add(mesh)
  } else {
    /**
     * We have holes, let's go through them from left to right
     */

    hole.sort((a, b) => a.position.x - b.position.x)

    /**
     * Variables to keep track off the offsets
     */
    let previousSegmentsWidth = 0
    let textureOffset = 0

    for (let i = 0; i < hole.length; i++) {
      /**
       * Setup current hole and wall segment width
       */
      const currentHole = hole[i]
      const segmentWidth =
        dimensions.width * currentHole.position.x - currentHole.width / 2 - previousSegmentsWidth

      /**
       * Wall segment left of the wall
       */
      if (segmentWidth > 0) {
        wallObject.add(
          makeWallSegment(
            {
              width: segmentWidth + wallOffset,
              height: dimensions.height,
              depth: dimensions.depth,
              totalWidth: dimensions.width,
              offset: textureOffset
            },
            {
              y: dimensions.height / 2,
              x:
                dimensions.width / 2 -
                (dimensions.width * currentHole.position.x - currentHole.width / 2) / 2 -
                previousSegmentsWidth / 2
            },
            {
              original: material,
              offset: { x: textureOffset / dimensions.width, y: 0 },
              repeat: { x: segmentWidth / dimensions.width, y: 1 }
            }
          )
        )
      }
      /**
       * Adjust texture and width offsets
       */
      textureOffset += segmentWidth
      previousSegmentsWidth += segmentWidth + currentHole.width

      /**
       * Wall segment above a hole
       */
      let meshHeight = dimensions.height - currentHole.height
      meshHeight -= meshHeight * currentHole.position.y

      if (meshHeight !== 0) {
        wallObject.add(
          makeWallSegment(
            {
              width: currentHole.width + wallOffset,
              height: meshHeight,
              depth: dimensions.depth,
              totalWidth: dimensions.width,
              offset: textureOffset
            },
            {
              y: dimensions.height - meshHeight / 2,
              x: dimensions.width / 2 - dimensions.width * currentHole.position.x
            },
            {
              original: material,
              offset: {
                x: textureOffset / dimensions.width,
                y: 1 - meshHeight / dimensions.height
              },
              repeat: { x: currentHole.width / dimensions.width, y: meshHeight / dimensions.height }
            }
          )
        )
      }

      /**
       * Wall segment under a hole
       */
      const bottomMeshHeight = dimensions.height - meshHeight - currentHole.height

      if (bottomMeshHeight !== 0) {
        wallObject.add(
          makeWallSegment(
            {
              width: currentHole.width + wallOffset,
              height: bottomMeshHeight,
              depth: dimensions.depth,
              totalWidth: dimensions.width,
              offset: textureOffset
            },
            {
              y: bottomMeshHeight / 2,
              x: dimensions.width / 2 - dimensions.width * currentHole.position.x
            },
            {
              original: material,
              offset: { x: textureOffset / dimensions.width, y: 0 },
              repeat: {
                x: currentHole.width / dimensions.width,
                y: bottomMeshHeight / dimensions.height
              }
            }
          )
        )
      }

      /**
       * Switch for the different types of hole
       * -might need to make it dynamic like wall segments?
       */
      switch (currentHole.type) {
        case 'hole':
          wallObject.add(new Hole(currentHole, dimensions))
          if (currentHole.hasBorders) {
            wallObject.add(
              makeDoorFrame(currentHole, wallOffset, dimensions, borderMaterial, bottomMeshHeight)
            )
          }

          break

        case 'door':
          //wallObject.add(makeDoor(currentHole, wallOffset, dimensions))
          wallObject.add(new Doors(currentHole, wallOffset, dimensions))
          wallObject.add(
            makeDoorFrame(currentHole, wallOffset, dimensions, borderMaterial, bottomMeshHeight)
          )

          break

        case 'window':
          /**
           * Maybe eventually make frame for window?
           * we there, make frame for window
           */
          if (currentHole.hasBorders === true) {
            wallObject.add(
              makeWindowFrame(currentHole, wallOffset, dimensions, borderMaterial, bottomMeshHeight)
            )
          }

          break
      }

      /**
       * Last piece of wall if we are at the rightmost part
       */

      if (i === hole.length - 1 && dimensions.width - previousSegmentsWidth > 0) {
        wallObject.add(
          makeWallSegment(
            {
              width: dimensions.width - previousSegmentsWidth + wallOffset,
              height: dimensions.height,
              depth: dimensions.depth,
              totalWidth: dimensions.width,
              offset: previousSegmentsWidth
            },
            {
              y: dimensions.height / 2,
              x: -(
                dimensions.width / 2 -
                (dimensions.width -
                  dimensions.width * currentHole.position.x -
                  currentHole.width / 2) /
                  2
              )
            },
            {
              original: material,
              offset: { x: previousSegmentsWidth / dimensions.width, y: 0 },
              repeat: { x: (dimensions.width - previousSegmentsWidth) / dimensions.width, y: 1 }
            }
          )
        )
      }

      /**
       * Final Texture offset
       */
      textureOffset += currentHole.width
    }
  }

  /**
   * Set position and rotation of whole wall
   */
  wallObject.position.add(position)
  wallObject.rotation.y = rotation

  return wallObject
}

interface segmentDimensions {
  width: number
  height: number
  depth: number
  totalWidth: number
  offset: number
}

interface segmentPosition {
  y: number
  x: number
}

interface segmentMaterial {
  original: any
  offset: { x: number; y: number }
  repeat: { x: number; y: number }
}

function makeWallSegment(
  dimensions: segmentDimensions,
  position: segmentPosition,
  material: segmentMaterial
) {
  /**
   * Clone Material to offset it for continuous texture
   */
  const uniqueMaterial = [
    material.original[0].clone(), //x+
    material.original[1].clone(), //x-
    material.original[2].clone(), //y+
    material.original[3].clone(), //y-
    material.original[4].clone(), //z+
    material.original[5].clone() //z-
  ]

  for (let i = 0; i < uniqueMaterial.length; i++) {
    if (uniqueMaterial[i].map) {
      const mapClone = material.original[i].map.clone()
      mapClone.needsUpdate = true
      uniqueMaterial[i].map = mapClone
      if (material.original[i].fullWidth && material.original[i].fullWidth == true) {
        uniqueMaterial[i].map.offset.set(material.original[i].map.offset.x, material.offset.y)
        uniqueMaterial[i].map.repeat.set(material.original[i].map.repeat.x, material.repeat.y)
      } else {
        uniqueMaterial[i].map.repeat.set(material.repeat.x, material.repeat.y)
        uniqueMaterial[i].map.offset.set(material.offset.x, material.offset.y)
      }

      if (i === 4) {
        const offset =
          (dimensions.totalWidth - (dimensions.width + dimensions.offset)) / dimensions.totalWidth
        uniqueMaterial[i].map.offset.set(offset, material.offset.y)
      }
    }
  }

  /**
   * Make and place mesh
   */
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth),
    uniqueMaterial
  )
  mesh.position.y = position.y
  mesh.position.x += position.x
  mesh.name = 'wall'

  return mesh
}
