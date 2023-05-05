import walls from '@/maison/assets/textures/muretJardin.jpg'
import wallsTop from '@/maison/assets/textures/muretJardinDessus.jpg'
import wallsSide from '@/maison/assets/textures/muretJardinCote.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  fence: [
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: wallsSide
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: wallsSide
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: wallsTop
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: wallsTop
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: walls
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: walls
    }
  ]
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
