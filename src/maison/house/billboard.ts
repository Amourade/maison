import * as THREE from 'three'
import { app } from '../app'
import { createDirectus, rest, readFiles, readAssetRaw } from '@directus/sdk'
import { parseImages, createMaterials } from '@/maison/scripts/parseAssets'
import woodenPost from '@/maison/assets/textures/poteauBois.jpg'
import { degToRad } from 'three/src/math/MathUtils'

const url = 'https://directus.antoinetheriault.com'
const client = createDirectus(url).with(rest())

const files = await client.request(
  readFiles({
    filter: {
      folder: {
        _eq: '19274e41-2b08-4cb6-bc5f-c6c97363fd13'
      }
    },
    limit: 100
  })
)

shuffleArray(files)

const toLoad: { [key: string]: string } = {
  wood: woodenPost
}
let size = 0
const maxImages = 30

files.forEach(async (file, index) => {
  if (index >= maxImages) return
  toLoad[index.toString()] =
    'https://directus.antoinetheriault.com/assets/' +
    file.id +
    '?fit=inside&height=200&width=200&quality=75'

  size++
})

const loadedTextures = parseImages(toLoad)

class billboard extends THREE.Group {
  constructor() {
    super()
  }
  interact = () => {
    app.CONTROLS.pointerSpeed = 0
    app.SHOWALLPICTURES.value = true
  }
}

export const init = () => {
  const billboardObject = new billboard()

  const panelWidth = 60
  const panelHeight = 30
  //PANEL
  let mesh = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, panelHeight, 1), loadedTextures.wood)
  mesh.position.z -= 0.6

  app.INTERACTIONS.walls.push(mesh)
  billboardObject.add(mesh)

  //-30 - 30
  //-15 - 15
  const positions: [number, number][] = []
  const rowAmounts = 5
  const perRow = maxImages / rowAmounts
  const diffColumnPercent = (1 - (perRow - 1) / perRow) / 2
  const diffRowPercent = 1 / 5 / 2
  let currentRow: number = 1
  for (let i = 0; i < maxImages; i++) {
    const modulo = i % perRow

    const columnPercent = modulo / perRow + diffColumnPercent
    const rowPercent = currentRow / rowAmounts - diffRowPercent

    positions.push([
      columnPercent * panelWidth - panelWidth / 2,
      rowPercent * panelHeight - panelHeight / 2
    ])

    if (modulo + 1 == perRow) currentRow++
  }

  //PICTURES
  console.log(size)
  for (let i = 0; i < size; i++) {
    const positionIndex = Math.floor(Math.random() * positions.length)

    const position = positions[positionIndex]

    positions.splice(positionIndex, 1)

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), loadedTextures[i.toString()])
    //mesh.position.y += -10 + 5 * i
    mesh.position.x = position[0]
    mesh.position.y = position[1]
    mesh.rotateZ(degToRad(Math.random() * 15 - 7.5))
    billboardObject.add(mesh)
  }

  //LEGS
  mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 1), loadedTextures.wood)
  mesh.position.z -= 1.3
  mesh.position.x -= 20
  mesh.position.y -= 16
  billboardObject.add(mesh)

  //LEGS
  mesh = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 1), loadedTextures.wood)
  mesh.position.z -= 1.3
  mesh.position.x += 20
  mesh.position.y -= 16
  billboardObject.add(mesh)

  app.INTERACTIONS.interactives.push(billboardObject)
  return billboardObject
}

function shuffleArray(arr: Array<any>) {
  arr.sort(() => Math.random() - 0.5)
}
