import * as THREE from 'three'
import groundTexture from '@/maison/assets/textures/ground.jpg'
import { parseImages } from '@/maison/scripts/parseAssets'
import { app } from '../app'
import { Sunflower } from './sunflower'
import { Flower } from './flower'
import { bigTree, hill, roundBush, adress, skybox, tree } from './scripts/models'
import { GLBufferAttribute } from 'three'

const rawMaterials = {
  ground: groundTexture
}

const parsedMaterials = parseImages(rawMaterials)

export const init = () => {
  //Ground plane
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(2048, 2048), parsedMaterials.ground)
  ground.rotation.x = Math.PI / 2
  ground.name = 'ground'
  app.INTERACTIONS.grounds.push(ground)
  app.SCENE.scene.add(ground)

  //SunFlowers

  for (let i = 0; i < 554 / 30; i++) {
    const flower = new Sunflower(new THREE.Vector3(300, 7.5, 425 - i * 30))
    app.SCENE.scene.add(flower)
    app.INTERACTIONS.flowers.push(flower)
    app.INTERACTIONS.interactives.push(flower)
  }

  for (let i = 0; i < 554 / 30; i++) {
    const flower = new Sunflower(new THREE.Vector3(287, 7.5, 410 - i * 30))
    app.SCENE.scene.add(flower)
    app.INTERACTIONS.flowers.push(flower)
    app.INTERACTIONS.interactives.push(flower)
  }

  for (let i = 0; i < 554 / 30; i++) {
    const flower = new Sunflower(new THREE.Vector3(274, 7.5, 425 - i * 30))
    app.SCENE.scene.add(flower)
    app.INTERACTIONS.flowers.push(flower)
    app.INTERACTIONS.interactives.push(flower)
  }

  //Flowers
  for (let i = 0; i < 100; i++) {
    const posX = Math.random() * 50
    const posZ = Math.random() * 297
    const flower = new Flower(new THREE.Vector3(160 + posX, 0, -145 + posZ))
    app.SCENE.scene.add(flower)
    app.INTERACTIONS.flowers.push(flower)
    app.INTERACTIONS.interactives.push(flower)
  }

  //Trees
  const refMesh = new THREE.Mesh(new THREE.PlaneGeometry(2048, 1792, 150, 150))
  refMesh.position.z += 128
  refMesh.geometry.rotateX(Math.PI / 2)

  const vertices = refMesh.geometry.getAttribute('position')

  const limits = {
    /** [x,z] */
    lower: [-235, -1024],
    higher: [319, 325]
  }

  if (vertices instanceof GLBufferAttribute) throw console.error('wrong type of buffer attributes')

  for (let i = 0; i < 500; i++) {
    let vertice
    let coord
    //Get random vertice not in the unholy square
    do {
      vertice = Math.floor(Math.random() * vertices.count)
      coord = new THREE.Vector3()
      coord.fromBufferAttribute(vertices, vertice)
    } while (
      coord.x > limits.lower[0] &&
      coord.x < limits.higher[0] &&
      coord.z > limits.lower[1] &&
      coord.z < limits.higher[1]
    )

    let element

    if (Math.random() < 0.7) {
      element = tree()
    } else {
      element = hill()
    }
    const y = Math.random() * 5 + 16 - 12

    element.position.set(coord.x, -y, coord.z + 128)
    element.scale.set(Math.random() + 1, Math.random() + 0.5, Math.random() + 1)
    element.rotateY(Math.random() * Math.PI)

    app.SCENE.scene.add(element)
  }

  //Big trees
  const one = bigTree()
  one.position.set(162, 20, -675)
  app.SCENE.scene.add(one)

  const two = bigTree()
  two.position.set(-168, 20, -675)
  app.SCENE.scene.add(two)

  const three = bigTree()
  three.position.set(-160, 20, 405)
  app.SCENE.scene.add(three)

  const four = hill()
  four.position.set(-142, -13.5, 387)
  app.SCENE.scene.add(four)

  //Bushes
  const bushPositions = [
    { x: 100, y: 0, z: -745 },
    { x: 100, y: 0, z: -625 },
    { x: 100, y: 0, z: -505 },
    { x: 161, y: 0, z: -405 },
    { x: 269, y: 0, z: -300 },
    { x: -95, y: 0, z: -690 },
    { x: -150, y: 0, z: -575 },
    { x: -193, y: 0, z: -453 },
    { x: -223, y: 0, z: -341 },
    { x: -241, y: 0, z: -189 },
    { x: -261, y: 0, z: -23 },
    { x: -125, y: 0, z: -241 },
    { x: 125, y: 0, z: -241 }
  ]

  for (let i = 0; i < bushPositions.length; i++) {
    const elem = roundBush()
    elem.position.set(bushPositions[i].x, bushPositions[i].y, bushPositions[i].z)
    app.SCENE.scene.add(elem)
  }

  //Adress
  app.SCENE.scene.add(adress(new THREE.Vector3(-75, 7.5, -751)))

  //Skybox
  app.SCENE.scene.add(skybox())
}
