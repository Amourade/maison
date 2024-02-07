<script setup lang="ts">
import { app } from '@/maison/app'
import { onMounted, watch, ref, computed } from 'vue'
import { delay } from '@/utils/delay'
import { deletePicture, hidePicture } from '@/maison/pictureTaker'
import { createDirectus, rest, uploadFiles } from '@directus/sdk'
const emits = defineEmits(['closePhoto'])

const { image, taken, uploaded } = app.PICTURE
const { CONTROLS } = app

const animationDuration = 2000
const showImage = ref(taken.value)
const showKeepButtons = ref(false)
const showPersistenceButtons = ref(taken.value)
const showFlash = ref(!taken.value)
const fadeIn = ref(taken.value)

const isPictureHidden = ref(false)
const error = ref<string>('')
const uploading = ref<boolean>(false)

const imgUrl = computed(() => {
  return URL.createObjectURL(image.value)
})

async function keepPicture() {
  showKeepButtons.value = false

  await delay(1000)

  taken.value = true

  showPersistenceButtons.value = true
}

async function hideAndDeletePicture() {
  if (isPictureHidden.value || uploading.value) return
  isPictureHidden.value = true
  app.CONTROLS.lock()
  app.CONTROLS.pointerSpeed = 1

  await delay(1500)

  deletePicture()
}

async function closePicture() {
  if (isPictureHidden.value || uploading.value) return
  isPictureHidden.value = true

  if (!app.SCENE.paused.value) {
    app.CONTROLS.lock()
    app.CONTROLS.pointerSpeed = 1
  }

  await delay(1500)

  emits('closePhoto')

  hidePicture()
}

async function uploadPicture() {
  if (uploading.value || uploaded.value) return

  const url = 'https://directus.antoinetheriault.com'
  const client = createDirectus(url).with(rest())

  const date = new Date()

  const formData = new FormData()
  formData.append('title', date.toLocaleString('fr'))
  formData.append('folder', '19274e41-2b08-4cb6-bc5f-c6c97363fd13')
  formData.append('file', image.value, 'photo' + Date.now().toString() + '.webp')

  uploading.value = true
  const result = await client.request(uploadFiles(formData)).catch((err) => (error.value = err))
  await delay(1000)
  uploading.value = false

  if (error.value) return

  uploaded.value = true
}

onMounted(async () => {
  if (taken.value) return
  await delay(animationDuration)

  showImage.value = true

  await delay(animationDuration)

  showKeepButtons.value = true
  showFlash.value = false

  CONTROLS.unlock()
})
</script>
<template>
  <div
    id="picture-wrapper"
    :class="{
      hide: isPictureHidden,
      chosen: showPersistenceButtons,
      print: !taken,
      fadeIn: fadeIn
    }"
  >
    <div
      class="white-flash"
      v-if="showFlash"
      :style="{ animationDuration: animationDuration + 'ms' }"
    ></div>
    <Transition name="fade">
      <div class="uploading" v-if="uploading">
        <span>{{ $t('uploading') }}</span>
      </div>
    </Transition>
    <div
      class="picture"
      v-if="image && showImage"
      :style="{ animationDuration: animationDuration + 'ms' }"
    >
      <Transition name="fade">
        <a href="#" @click.prevent="closePicture" class="close" v-show="showPersistenceButtons"
          >X</a
        >
      </Transition>
      <img :src="imgUrl" />
      <Transition name="fade">
        <div class="buttons" v-if="showKeepButtons">
          <a href="#" @click.prevent="keepPicture">{{ $t('keepPicture') }}</a>
          <a href="#" @click.prevent="hideAndDeletePicture">{{ $t('deletePicture') }}</a>
          <p>{{ $t('pictureWarning') }}</p>
        </div>
      </Transition>
      <Transition name="fade">
        <div class="buttons" v-if="showPersistenceButtons">
          <a :href="imgUrl" download="photo">{{ $t('downloadPicture') }}</a>
          <a href="#" :class="{ hide: uploaded }" @click.prevent="uploadPicture"
            >{{ $t('uploadPicture') }}
            <Transition name="fade" appear>
              <span class="thanks" v-if="uploaded">{{
                $i18n.locale === 'en' ? 'Thanks!' : 'Merci!'
              }}</span>
            </Transition></a
          >
          <p>{{ $t('pictureInPause') }}</p>
          <p v-if="error">{{ $t('pictureUploadError') }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#picture-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 5;

  transform: rotate(0deg);

  transition: transform, left, top, opacity;
  transition-duration: 1.5s;

  &.fadeIn {
    animation: picture-fade-in 1.5s 0s 1 forwards;
  }

  &.print {
    .picture {
      animation: picture-intro 2s linear 0s 1 forwards;
    }
  }
  &.hide {
    animation: picture-fade-out 1.5s 0s 1 forwards;
  }

  &.chosen .picture img {
    transform: rotate(0deg);
  }
}

@keyframes picture-fade-out {
  0% {
    left: 0px;
    top: 0px;
    opacity: 1;
    transform: rotate(0deg);
  }
  100% {
    left: -100%;
    top: 50%;
    opacity: 0;
    transform: rotate(-45deg);
  }
}

@keyframes picture-fade-in {
  0% {
    left: 100%;
    top: 50%;
    opacity: 0;
    transform: rotate(-45deg);
  }
  100% {
    left: 0px;
    top: 0px;
    opacity: 1;
    transform: rotate(0deg);
  }
}
.uploading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding: 15px 25px;
    font-size: 1.2em;
    background: url('@assets/loading-texture.png'),
      linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);
    background-size: cover !important;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.6);

    animation: rotate 5s infinite;
  }
}

@keyframes rotate {
  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(720deg);
  }
}
.close {
  position: absolute;
  top: -10px;
  right: -10px;

  display: inline-block;
  padding: 15px 30px;
  color: black;
  text-decoration: none;
  background: url('@assets/loading-texture.png'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  background-size: cover !important;

  font-size: 1.3em;

  transform: scale(1) rotate(0deg);
  transition: transform 0.3s;

  z-index: 3;

  &:hover {
    transform: scale(1.2) rotate(-5deg);
  }
}
.picture {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .buttons {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
    text-align: center;

    transform: translateY(50%);

    font-size: 1.2em;

    a {
      display: inline-block;
      padding: 15px;
      color: black;
      text-decoration: none;
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
      background-size: cover !important;

      margin-right: 20px;

      transform: scale(1) rotate(0deg);
      transition: transform 0.3s, opacity 0.3s;

      &:nth-child(2n) {
        margin-right: 0px;
        &:hover {
          transform: scale(1.2) rotate(5deg);
        }
      }

      &:hover {
        transform: scale(1.2) rotate(-5deg);
      }

      &.hide {
        //opacity: 0.7;
        text-decoration: line-through;
        cursor: default;
        &:hover {
          transform: scale(1) rotate(0deg);
        }
      }

      .thanks {
        position: absolute;
        top: 0px;
        right: 0px;
        transform: translate(50%, -50%) rotate(45deg);

        background: url('@assets/loading-texture.png'),
          linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);
        background-size: cover !important;

        padding: 5px 10px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
      }
    }

    p {
      margin-top: 20px;
      padding: 10px;
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

      border-radius: 5px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
      background-size: cover !important;

      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;

    transform: rotate(5deg);
    box-shadow: 20px 20px 20px 0px rgba(0, 0, 0, 0.5);

    padding: 5px 5px 10px 5px;
    background: white;

    transition: transform 0.5s;
  }
}

@keyframes picture-intro {
  0% {
    top: calc(-100% - 50px);
  }
  100% {
    top: 10%;
  }
}
.white-flash {
  animation: white-flash 2s linear 0s 1 forwards;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 2;
}

@keyframes white-flash {
  0%,
  100% {
    background: transparent;
  }

  5% {
    background: white;
  }

  15% {
    background: white;
  }
}
</style>
