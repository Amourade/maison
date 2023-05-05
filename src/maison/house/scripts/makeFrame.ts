import * as THREE from 'three'

export const makeDoorFrame = (
  currentHole: HoleObject | DoorObject,
  wallOffset: number,
  dimensions: Dimensions,
  borderMaterial: any,
  bottomMeshHeight: number
) => {
  /**
   * Door Frame
   */
  const frame = new THREE.Group()
  let mesh
  //TOP
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.width + wallOffset + 2.1, 2, dimensions.depth + 1.5),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height
  mesh.position.x += dimensions.width / 2 - dimensions.width * currentHole.position.x
  mesh.name = 'border'
  frame.add(mesh)

  //RIGHT
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.height, 2, dimensions.depth + 1.49),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height / 2
  mesh.position.x +=
    dimensions.width / 2 - dimensions.width * currentHole.position.x - currentHole.width / 2
  mesh.rotateZ(Math.PI / 2)
  mesh.name = 'border'
  frame.add(mesh)

  //LEFT
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.height, 2, dimensions.depth + 1.49),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height / 2
  mesh.position.x +=
    dimensions.width / 2 - dimensions.width * currentHole.position.x + currentHole.width / 2
  mesh.rotateZ(-Math.PI / 2)
  mesh.name = 'border'
  frame.add(mesh)

  return frame
}

export const makeWindowFrame = (
  currentHole: WindowObject,
  wallOffset: number,
  dimensions: Dimensions,
  borderMaterial: any,
  bottomMeshHeight: number
) => {
  const frame = new THREE.Group()
  let mesh
  //TOP
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.width + wallOffset + 2.02, 2, dimensions.depth + 1.5),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height
  mesh.position.x += dimensions.width / 2 - dimensions.width * currentHole.position.x
  mesh.name = 'border'
  frame.add(mesh)

  //RIGHT
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.height, 2, dimensions.depth + 1.47),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height / 2
  mesh.position.x +=
    dimensions.width / 2 - dimensions.width * currentHole.position.x - currentHole.width / 2
  mesh.rotateZ(Math.PI / 2)
  mesh.name = 'border'
  frame.add(mesh)

  //BOTTOM
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.width + wallOffset + 3, 3, dimensions.depth + 1.5),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight
  mesh.position.x += dimensions.width / 2 - dimensions.width * currentHole.position.x
  mesh.name = 'border'
  frame.add(mesh)

  //LEFT
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(currentHole.height, 2, dimensions.depth + 1.47),
    borderMaterial
  )
  mesh.position.y += bottomMeshHeight + currentHole.height / 2
  mesh.position.x +=
    dimensions.width / 2 - dimensions.width * currentHole.position.x + currentHole.width / 2
  mesh.rotateZ(-Math.PI / 2)
  mesh.name = 'border'
  frame.add(mesh)

  return frame
}
