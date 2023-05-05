import * as THREE from 'three'
import treeTexture from '@/maison/assets/textures/arbre.jpg'
import leavesTexture from '@/maison/assets/textures/feuille.jpg'
import hillsTexture from '@/maison/assets/textures/sol.jpg'
import skyboxTexture from '@/maison/assets/textures/pano.jpg'
import woodenPost from '@/maison/assets/textures/poteauBois.jpg'
import woodenAdress from '@/maison/assets/textures/pancarteAdresse.jpg'
import { parseImages, createMaterials } from '@/maison/scripts/parseAssets'

const texture = parseImages({
  tree: treeTexture,
  leaves: leavesTexture,
  hills: hillsTexture,
  post: woodenPost,
  skybox: skyboxTexture
})
const materials = createMaterials({
  adress: [
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenPost
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenPost
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenPost
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenPost
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenPost
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: woodenAdress
    }
  ]
})

export const sunflower = () => {
  //Tournesol
  const sunflower = new THREE.Group()

  let mat
  let mesh
  //Tige
  mat = texture.tree.clone().clone()
  mat.color = new THREE.Color(0x10500f)

  mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 15, 10, 10), mat)
  sunflower.add(mesh)

  //Feuilles
  mat = texture.tree.clone().clone()
  mat.color = new THREE.Color(0x10500f)

  mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
  mesh.scale.z = 5
  mesh.scale.x = 2
  mesh.rotateZ(Math.PI / 2)
  mesh.rotateX(Math.PI / 4)
  mesh.rotateY(Math.PI / 5)
  mesh.translateZ(1.6)
  sunflower.add(mesh)

  mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
  mesh.scale.z = 5
  mesh.scale.x = 2
  mesh.rotateZ(Math.PI / 2)
  mesh.rotateX(-Math.PI / 2)
  mesh.rotateY(Math.PI / 8)
  mesh.translateZ(1.2)
  mesh.translateX(-1)
  sunflower.add(mesh)

  //Core
  const flowerTop = new THREE.Group()
  mat = texture.tree.clone().clone()
  mat.color = new THREE.Color(0x93682b)

  mesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.5, 15, 1), mat)
  flowerTop.add(mesh)

  //Petal
  mat = texture.tree.clone().clone()
  mat = texture.tree.clone().clone()
  mat.color = new THREE.Color(0xdbc635)

  mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
  mesh.scale.z = 5

  const petalAmount = 30
  const angleIncrement = (Math.PI * 2) / petalAmount
  for (let i = 0; i < petalAmount; i++) {
    const petal = mesh.clone()
    petal.rotation.y = angleIncrement * i
    petal.translateZ(3)
    petal.translateY(0.6)
    petal.rotateX(-Math.PI / 5)
    petal.rotateZ(Math.PI / 15)
    flowerTop.add(petal)
  }

  flowerTop.position.y = 7.5
  flowerTop.rotation.x = Math.PI / 4
  sunflower.add(flowerTop)

  sunflower.rotateY(-Math.PI / 1.4)

  return sunflower
}

export const flowers = [
  () => {
    const fleur = new THREE.Group()

    let mat
    let mesh
    //Tige
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0x10500f)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 15, 10, 10), mat)
    fleur.add(mesh)

    //Feuilles
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0x10500f)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 6
    mesh.scale.x = 4
    mesh.rotateZ(Math.PI / 2)
    mesh.rotateX(Math.PI / 4)
    mesh.rotateY(Math.PI / 5)
    mesh.translateZ(1.6)
    fleur.add(mesh)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 5
    mesh.scale.x = 2
    mesh.rotateZ(Math.PI / 2)
    mesh.rotateX(-Math.PI / 2)
    mesh.rotateY(Math.PI / 8)
    mesh.translateZ(1.2)
    mesh.translateX(-1)
    fleur.add(mesh)

    //Core
    const flowerTop = new THREE.Group()

    mat = texture.tree.clone()
    mat.color = new THREE.Color(0xd16275)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.5, 15, 1), mat)
    flowerTop.add(mesh)

    //Pétale
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0xf7c5e8)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 8
    mesh.scale.x = 4

    const petalAmount = 8
    const angleIncrement = (Math.PI * 2) / petalAmount
    for (let i = 0; i < petalAmount; i++) {
      const petal = mesh.clone()
      petal.rotation.y = angleIncrement * i
      if (i % 2 == 0) {
        petal.translateY(0.2)
      }
      petal.translateZ(3)
      flowerTop.add(petal)
    }

    flowerTop.position.y = 7.5
    flowerTop.rotation.x = Math.PI / 8
    fleur.add(flowerTop)

    return fleur
  },
  () => {
    const fleur = new THREE.Group()

    let mat
    let mesh
    //Tige
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0x10500f)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 15, 10, 10), mat)
    fleur.add(mesh)

    //Feuilles
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0x10500f)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 6
    mesh.scale.x = 4
    mesh.rotateZ(Math.PI / 2)
    mesh.rotateX(Math.PI / 4)
    mesh.rotateY(Math.PI / 5)
    mesh.translateZ(1.6)
    fleur.add(mesh)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 5
    mesh.scale.x = 2
    mesh.rotateZ(Math.PI / 2)
    mesh.rotateX(-Math.PI / 2)
    mesh.rotateY(Math.PI / 8)
    mesh.translateZ(1.2)
    mesh.translateX(-1)
    fleur.add(mesh)

    //Core
    const flowerTop = new THREE.Group()

    mat = texture.tree.clone()
    mat.color = new THREE.Color(0xbf9968)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 0.5, 15, 1), mat)
    flowerTop.add(mesh)

    //Pétale
    mat = texture.tree.clone()
    mat.color = new THREE.Color(0x879ee9)

    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 10, 1), mat)
    mesh.scale.z = 8
    mesh.scale.x = 4

    const petalAmount = 14
    const angleIncrement = (Math.PI * 2) / petalAmount
    for (let i = 0; i < petalAmount; i++) {
      const petal = mesh.clone()
      petal.rotation.y = angleIncrement * i

      if (i % 2 == 0) {
        petal.translateY(0.2)
      }
      petal.translateZ(3)
      petal.rotateX(Math.PI / 1.5)
      petal.position.y += 1.7
      flowerTop.add(petal)
    }

    flowerTop.position.y = 7.5
    flowerTop.rotation.x = Math.PI / 10
    fleur.add(flowerTop)

    return fleur
  }
]

export const tree = () => {
  const arbre = new THREE.Group()
  const trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 2, 125, 10, 10), texture.tree)
  arbre.add(trunkMesh)

  const leavesMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 8, 30, 10, 10), texture.leaves)
  leavesMesh.position.y = 45
  arbre.add(leavesMesh)

  return arbre
}

export const hill = () => {
  const hill = new THREE.Mesh(
    new THREE.SphereGeometry(15, 5, 5, 0, Math.PI * 2, 0, Math.PI / 2),
    texture.hills
  )

  return hill
}

export const bigTree = () => {
  const bigTree = new THREE.Group()
  const trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 2, 125, 10, 10), texture.tree)
  bigTree.add(trunkMesh)

  const leavesMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 8, 60, 10, 10), texture.leaves)
  leavesMesh.position.y = 40
  bigTree.add(leavesMesh)
  bigTree.scale.set(7, 3, 7)

  return bigTree
}

export const roundBush = () => {
  const roundBush = new THREE.Group()

  const trunkMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.5, 15, 10, 10), texture.tree)
  roundBush.add(trunkMesh)

  const leavesMeah = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 10), texture.leaves)
  leavesMeah.position.y = 5
  roundBush.add(leavesMeah)

  return roundBush
}

export const adress = (position: THREE.Vector3) => {
  const post = new THREE.Group()
  post.add(new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 15, 25), texture.post))

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(9, 5, 1),
    Array.isArray(materials.adress) ? materials.adress : undefined
  )

  panel.rotateZ(Math.PI / 15)
  panel.position.y += 6
  panel.position.z -= 1

  post.add(panel)

  post.position.copy(position)

  return post
}

export const skybox = () => {
  //Skybox
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1500, 200, 200), texture.skybox)
  mesh.position.y = 400

  return mesh
}
