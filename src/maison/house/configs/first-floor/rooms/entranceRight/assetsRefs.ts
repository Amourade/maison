import walls from '@/maison/assets/textures/murEntreDroite.jpg'
import floor from '@/maison/assets/textures/plancherEntreDroite.jpg'
import wallsInside from '@/maison/assets/textures/murEntreDroiteEntre.jpg'
import wallsBackRightRoom from '@/maison/assets/textures/piecefonddroite.jpg'
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
      fullWidth: false,
      value: wallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: wallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: false,
      value: floor
    },
    {
      type: 'color',
      reverse: false,
      fullWidth: false,
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
      value: wallsBackRightRoom
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
