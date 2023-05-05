import Ver from '@/maison/assets/textures/peintures/ver.jpg'
import Sommeil from '@/maison/assets/textures/peintures/sommeil.jpg'
import Epee from '@/maison/assets/textures/peintures/epee.jpg'
import Anneau from '@/maison/assets/textures/peintures/anneau.jpg'
import Bleu from '@/maison/assets/textures/peintures/bleu.jpg'
import Cheveux from '@/maison/assets/textures/peintures/cheveux.jpg'
import Conversation from '@/maison/assets/textures/peintures/conversation.jpg'
import Mouche from '@/maison/assets/textures/peintures/mouche.jpg'
import MurEpee from '@/maison/assets/textures/peintures/mur-epee.jpg'
import Portrait from '@/maison/assets/textures/peintures/portrait.jpg'
import Radeau from '@/maison/assets/textures/peintures/radeau.jpg'
import Part from '@/maison/assets/textures/peintures/part.jpg'
import RepasMinuit from '@/maison/assets/textures/peintures/repas-minuit.jpg'
import Room from '@/maison/assets/textures/peintures/room.jpg'
import Saule from '@/maison/assets/textures/peintures/saule.jpg'
import Toile from '@/maison/assets/textures/peintures/toile.jpg'
import { createMaterials } from '@/maison/scripts/parseAssets'

const rawMaterials = {
  ver: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Ver
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  sommeil: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Sommeil
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  epee: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Epee
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  anneau: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Anneau
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  bleu: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Bleu
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  cheveux: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Cheveux
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  conversation: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Conversation
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  mouche: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Mouche
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  murEpee: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: MurEpee
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  portrait: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Portrait
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  radeau: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Radeau
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  part: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Part
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  repasMinuit: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: RepasMinuit
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  room: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Room
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ],
  saule: [
    {
      type: 'image',
      reverse: true,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      fullWidth: true,
      value: Toile
    },
    {
      type: 'image',
      reverse: false,
      value: Saule
    },
    {
      type: 'image',
      reverse: false,
      value: Toile
    }
  ]
}

export const materials: ParsedMatsList = createMaterials(rawMaterials)
