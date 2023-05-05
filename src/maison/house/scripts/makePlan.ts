import { app } from '@/maison/app'
import * as THREE from 'three'
import { PlanMesh } from './planMesh'

export const makePlan = (
  geometry: THREE.Group | THREE.Mesh | THREE.Object3D,
  name: string,
  position: THREE.Vector3,
  rotation: number,
  dimensions: { width: number; height: number; depth: number },
  resolution: number,
  links: LinksArray,
  space: Space,
  hasCameras: boolean,
  outside: boolean,
  inside: boolean
) => {
  const plane = new THREE.PlaneGeometry(dimensions.width, dimensions.depth, resolution, resolution)
  plane.rotateX(Math.PI / 2)

  const mesh = new PlanMesh(
    plane,
    new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }),
    links,
    space
  )
  mesh.position.copy(position)
  mesh.rotateY(rotation)
  mesh.visible = app.DEBUG.grids
  mesh.name = name

  mesh.geometry.computeBoundingBox()
  //geometry.floorGrid.push(mesh)
  geometry.add(mesh)

  //create plane anchor points;
  if (hasCameras) {
    createCameraAnchors(mesh, dimensions)
  }

  app.PLANS.all.push(mesh)
  if (outside) app.PLANS.outside.push(mesh)
  if (inside) app.PLANS.inside.push(mesh)
  //INTERACTIONS.ground.push(mesh)
  app.DEBUG.helpers.push(mesh)

  //Update Matrices
  geometry.updateMatrixWorld()
  mesh.updateMatrixWorld()

  if (app.DEBUG.grids) {
    const wireframe = new THREE.WireframeGeometry(plane)
    const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial())
    line.material.depthTest = false
    line.material.opacity = 0.25
    line.material.transparent = true
    line.position.copy(position)
    line.rotateY(rotation)

    geometry.add(line)
  }
}

function createCameraAnchors(
  mesh: PlanMesh,
  dimensions: { width: number; height: number; depth: number }
) {
  mesh.cameraAnchors = []

  let cameraAnchor
  //
  cameraAnchor = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  cameraAnchor.position.copy(
    new THREE.Vector3(-dimensions.width / 2, dimensions.height - 10, -dimensions.depth / 2)
  )
  mesh.cameraAnchors.push(cameraAnchor)
  mesh.add(cameraAnchor)
  //
  cameraAnchor = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  cameraAnchor.position.copy(
    new THREE.Vector3(dimensions.width / 2, dimensions.height - 10, -dimensions.depth / 2)
  )
  mesh.cameraAnchors.push(cameraAnchor)
  mesh.add(cameraAnchor)
  //
  cameraAnchor = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  cameraAnchor.position.copy(
    new THREE.Vector3(-dimensions.width / 2, dimensions.height - 10, dimensions.depth / 2)
  )
  mesh.cameraAnchors.push(cameraAnchor)
  mesh.add(cameraAnchor)
  //
  cameraAnchor = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  cameraAnchor.position.copy(
    new THREE.Vector3(dimensions.width / 2, dimensions.height - 10, dimensions.depth / 2)
  )
  mesh.cameraAnchors.push(cameraAnchor)
  mesh.add(cameraAnchor)
}
