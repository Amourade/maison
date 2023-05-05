import pillars from '@/maison/assets/textures/pilliers.jpg'
import pillarsTop from '@/maison/assets/textures/pillierstop.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  walls: [
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillars
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillars
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillarsTop
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillarsTop
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillars
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: pillars
    }
  ]
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
