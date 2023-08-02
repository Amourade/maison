import * as THREE from 'three'
import { app } from '@/maison/app'
import { CustomMaterial } from '../house/scripts/customMaterial'
import type { MatInfo, MatsList, ParsedMatsList, ParsedSoundsList, SoundsList } from '../types'

export const findMaterials = (src: object) => {
  Object.keys(src).forEach((key: string) => {
    if (typeof src[key as keyof object] === 'object' && src[key as keyof object] !== null) {
      if (key === 'geometry') return
      if (key === 'materials') {
        createMaterials(src[key as keyof object])
        return
      }
      findMaterials(src[key as keyof object])
    }
  })
}

export const createMaterials = (src: any): ParsedMatsList => {
  const parsed = src
  Object.keys(parsed).forEach((key: string) => {
    if (Array.isArray(parsed[key as keyof MatsList])) {
      parsed[key as keyof MatsList].forEach((matInfo: MatInfo, index: number) => {
        if (matInfo.type === 'image') {
          const tex = new THREE.TextureLoader(app.LOADER).load(matInfo.value)
          tex.anisotropy = 16
          tex.wrapS = THREE.RepeatWrapping
          if (matInfo.reverse) {
            tex.repeat.x = -1
            tex.needsUpdate = true
          }
          const material = new CustomMaterial(
            {
              color: 0xffffff,
              reflectivity: 0,
              map: tex
            },
            matInfo.fullWidth
          )
          parsed[key as keyof MatsList][index] = material
        }
        if (matInfo.type === 'color') {
          parsed[key as keyof MatsList][index] = new THREE.MeshBasicMaterial({
            color: matInfo.value,
            reflectivity: 0
          })
        }
      })
      return
    }
    createMaterials(parsed[key as keyof MatsList])
  })
  return parsed
}

export const parseSounds = (sounds: SoundsList) => {
  const parsed: ParsedSoundsList = {}
  Object.keys(sounds).forEach((key: string) => {
    new THREE.AudioLoader(app.LOADER).load(sounds[key], (buffer) => {
      parsed[key] = buffer
    })
    //parsed[key] =
  })
  return parsed
}

export const parseImages = (images: { [key: string]: string }) => {
  const parsed: { [key: string]: THREE.MeshBasicMaterial } = {}
  Object.keys(images).forEach((key: string) => {
    const tex = new THREE.TextureLoader(app.LOADER).load(images[key])
    tex.anisotropy = 16

    parsed[key] = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      reflectivity: 0,
      map: tex,
      side: THREE.DoubleSide
    })
  })

  return parsed
}
