8
import WallsOutside from '@/maison/assets/textures/murDeuxieme.jpg'
import WallsBetween from '@/maison/assets/textures/murEntreDeuxieme.jpg'
import Borders from '@/maison/assets/textures/bordureFenetreDeuxieme.jpg'
import CeilingSides from '@/maison/assets/textures/bordureToitDeuxieme.jpg'
import DoorOutside from '@/maison/assets/textures/porteExterieurDeuxieme.jpg'
import DoorBetween from '@/maison/assets/textures/porteEntreDeuxieme.jpg'
import DoorBetweenY from '@/maison/assets/textures/porteEntreYDeuxieme.jpg'
import WallsInside from '@/maison/assets/textures/murInterieurDeuxieme.jpg'
import Ceiling from '@/maison/assets/textures/plafondDeuxieme.jpg'
import Floor from '@/maison/assets/textures/plancherDeuxieme.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  outerWalls: [
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: WallsBetween
    },
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: WallsBetween
    },
    {
      type: 'color',
      reverse: false,
      fullWidth: true,
      value: 0x667ef9
    },
    {
      type: 'color',
      reverse: false,
      fullWidth: true,
      value: 0x667ef9
    },
    {
      type: 'image',
      reverse: false,
      value: WallsInside
    },
    {
      type: 'image',
      reverse: false,
      value: WallsOutside
    }
  ],
  floor: [
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
      value: Floor
    },
    {
      type: 'image',
      reverse: false,
      value: Floor
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
      value: Ceiling
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
  frame: [
    {
      type: 'image',
      reverse: false,
      value: Borders
    },
    {
      type: 'image',
      reverse: false,
      value: Borders
    },
    {
      type: 'image',
      reverse: false,
      value: Borders
    },
    {
      type: 'image',
      reverse: false,
      value: Borders
    },
    {
      type: 'image',
      reverse: false,
      value: Borders
    },
    {
      type: 'image',
      reverse: false,
      value: Borders
    }
  ],
  doors: {
    left: [
      {
        type: 'image',
        reverse: false,
        value: DoorBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetweenY
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetweenY
      },
      {
        type: 'image',
        reverse: false,
        value: DoorOutside
      },
      {
        type: 'image',
        reverse: true,
        value: DoorOutside
      }
    ],
    right: [
      {
        type: 'image',
        reverse: false,
        value: DoorBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetween
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetweenY
      },
      {
        type: 'image',
        reverse: false,
        value: DoorBetweenY
      },
      {
        type: 'image',
        reverse: true,
        value: DoorOutside
      },
      {
        type: 'image',
        reverse: false,
        value: DoorOutside
      }
    ]
  }
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
