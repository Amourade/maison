import walls from '@/maison/assets/textures/piecefonddroite.jpg'
import floor from '@/maison/assets/textures/plancherfonddroite.jpg'
import Windowsill from '@/maison/assets/textures/bordurefenetre.jpg'
import WallsBetweenTop from '@/maison/assets/textures/murdedanstop.jpg'
import DoorsBetween from '@/maison/assets/textures/porteEntre.jpg'
import DoorsInside from '@/maison/assets/textures/porteInterieur.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  walls: [
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: walls
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: walls
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: floor
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: walls
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: walls
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: walls
    }
  ],
  frame: [
    {
      type: 'image',
      reverse: false,
      value: Windowsill
    },
    {
      type: 'image',
      reverse: false,
      value: Windowsill
    },
    {
      type: 'image',
      reverse: false,
      value: Windowsill
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBetweenTop
    },
    {
      type: 'image',
      reverse: false,
      value: Windowsill
    },
    {
      type: 'image',
      reverse: false,
      value: Windowsill
    }
  ],
  doors: {
    left: [
      {
        type: 'image',
        reverse: false,
        value: DoorsBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorsBetween
      },
      {
        type: 'image',
        reverse: false,
        value: WallsBetweenTop
      },
      {
        type: 'image',
        reverse: false,
        value: WallsBetweenTop
      },
      {
        type: 'image',
        reverse: false,
        value: DoorsInside
      },
      {
        type: 'image',
        reverse: true,
        value: DoorsInside
      }
    ],
    right: [
      {
        type: 'image',
        reverse: false,
        value: DoorsBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorsBetween
      },
      {
        type: 'image',
        reverse: false,
        value: WallsBetweenTop
      },
      {
        type: 'image',
        reverse: false,
        value: WallsBetweenTop
      },
      {
        type: 'image',
        reverse: true,
        value: DoorsInside
      },
      {
        type: 'image',
        reverse: false,
        value: DoorsInside
      }
    ]
  }
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
