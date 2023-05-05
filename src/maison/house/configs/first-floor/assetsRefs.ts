import OutsideWalls from '@/maison/assets/textures/mur1.jpg'
import InsideWalls from '@/maison/assets/textures/premiermurdedans.jpg'
import WallsBetween from '@/maison/assets/textures/murdedans.jpg'
import WallsBetweenTop from '@/maison/assets/textures/murdedanstop.jpg'
import Floor from '@/maison/assets/textures/sol1.jpg'
import CeilingSides from '@/maison/assets/textures/borduretoit.jpg'
import CeilingFloor from '@/maison/assets/textures/toit1.jpg'
import Ceiling from '@/maison/assets/textures/plafond1.jpg'
import WallsInside from '@/maison/assets/textures/premierMurEntre.jpg'
import WallsBackRight from '@/maison/assets/textures/piecefonddroite.jpg'
import Windowsill from '@/maison/assets/textures/bordurefenetre.jpg'
import WallsBetweenFirstDivider from '@/maison/assets/textures/murEntrePremierDroite.jpg'
import DoorsEntranceOutside from '@/maison/assets/textures/porteEntrePremier.jpg'
import DoorsBetween from '@/maison/assets/textures/porteEntre.jpg'
import DoorsInside from '@/maison/assets/textures/porteInterieur.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  outerWalls: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: WallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: WallsInside
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: WallsBetweenTop
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: WallsBetweenTop
    },
    {
      type: 'image',
      reverse: false,
      value: InsideWalls
    },
    {
      type: 'image',
      reverse: false,
      value: OutsideWalls
    }
  ],
  floor: [
    {
      type: 'image',
      reverse: false,
      value: WallsBetween
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBetween
    },
    {
      type: 'image',
      reverse: false,
      value: Floor
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBetween
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBetween
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBetween
    }
  ],
  ceiling: [
    {
      type: 'image',
      reverse: false,
      value: CeilingSides
    },
    {
      type: 'image',
      reverse: false,
      value: CeilingSides
    },
    {
      type: 'image',
      reverse: false,
      value: CeilingFloor
    },
    {
      type: 'image',
      reverse: false,
      value: Ceiling
    },
    {
      type: 'image',
      reverse: false,
      value: CeilingSides
    },
    {
      type: 'image',
      reverse: false,
      value: CeilingSides
    }
  ],
  windowsill: [
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
  wallRight: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: WallsBetweenFirstDivider
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: WallsBetweenFirstDivider
    },
    {
      type: 'image',
      reverse: false,
      value: CeilingFloor
    },
    {
      type: 'image',
      reverse: false,
      value: Ceiling
    },
    {
      type: 'image',
      reverse: false,
      value: WallsBackRight
    },
    {
      type: 'image',
      reverse: false,
      value: InsideWalls
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
        value: DoorsEntranceOutside
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
        value: DoorsEntranceOutside
      }
    ]
  },
  doorsDivision: {
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
