import walls from '@/maison/assets/textures/murEntreGauche.jpg'
import wallsInside from '@/maison/assets/textures/murEntreGaucheEntre.jpg'
import firstFloorWallsInside from '@/maison/assets/textures/premiermurdedans.jpg'
import floor from '@/maison/assets/textures/plancherEntreGauche.jpg'
import Windowsill from '@/maison/assets/textures/bordurefenetre.jpg'
import WallsBetweenTop from '@/maison/assets/textures/murdedanstop.jpg'
import DoorsBetween from '@/maison/assets/textures/porteEntre.jpg'
import DoorsInside from '@/maison/assets/textures/porteInterieur.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  walls: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: wallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: wallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: floor
    },
    {
      type: 'color',
      reverse: false,
      fullWidth: true,
      value: 0xf27992
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
      value: firstFloorWallsInside
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
