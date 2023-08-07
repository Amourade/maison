import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import './assets/main.css'

const messages = {
  en: {
    welcome: "welcome to the paintings seller's house",
    controls: 'controls',
    movement: 'W A S D + mouse: movement',
    click: 'left click: interaction',
    putFlower: 'E: drop a flower',
    putPainting: 'Q: put a painting',
    espace: 'space: jump',
    start: 'press any key or click here to start',
    sittingGirl: {
      regular: [
        'Hi, how are you doing?',
        "I'm taking the day in, isn't it beautiful today?",
        'A painting!',
        "I've seen enough of those you can keep this one"
      ],
      painting: [
        'Hi, how are you doing?',
        "I'm taking the day in, isn't it beautiful today?",
        "The painting seller's on vacation, he took all the furnitures!",
        'I hope he comes back soon.'
      ],
      flowers: ['Gimme those flowers']
    },
    clown: {
      regular: [
        'Hello there, the painting seller is away',
        'Let me know if you need help',
        "I've been assisting him for a couple years"
      ],
      painting: ['Hey! Let me see this painting', "It's bad", "It's ok", "It's interesting"],
      heldPainting: ['...', '...', '...']
    }
  },
  fr: {
    welcome: 'bienvenue à la maison du vendeur de peintures',
    controls: 'contrôles',
    movement: 'W A S D + souris: mouvement',
    click: 'clique gauche: interaction',
    putFlower: 'E: déposer une fleur',
    putPainting: 'Q: poser une peinture',
    espace: 'espace: sauter',
    start: 'appuyer sur une touche ou cliquer sur la pancarte pour commencer',
    sittingGirl: {
      regular: [
        "Bonjour, j'espère que ça va bien.",
        "Je profite de la journée aujourd'hui et toi?",
        'Le vendeur de peinture est en vacance, il a pris tout les meubles!',
        "J'espère qu'il va rentrer bientôt."
      ],
      painting: [
        "Bonjour, j'espère que ça va bien.",
        "Je profite de la journée aujourd'hui et toi?",
        'Une peinture!',
        "J'en ai assez vu tu peux la garder"
      ],
      flowers: ['Donne moi ces fleurs']
    },
    clown: {
      regular: [
        'Bonjour, le vendeur de peinture est parti',
        "Laisse moi savoir si je peux t'aider",
        "Je l'assiste depuis quelques années"
      ],
      painting: [
        'Hey! Laisse moi voir cette peinture',
        "C'est mauvais",
        "C'est ok",
        "C'est intéressant"
      ],
      heldPainting: ['...', '...', '...']
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages
})

createApp(App).use(i18n).mount('#app')
