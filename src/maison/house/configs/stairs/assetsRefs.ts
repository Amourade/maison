import top from '@/maison/assets/textures/marcheDessus.jpg'
import sides from '@/maison/assets/textures/marcheCote.jpg'
import support from '@/maison/assets/textures/marcheSupport.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  steps: [
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: sides
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: sides
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: top
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: sides
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: sides
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: sides
    }
  ],
  support: [
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: support
    }
  ]
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
