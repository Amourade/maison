<script setup lang="ts">
import { createDirectus, rest, readFiles, readAssetRaw } from '@directus/sdk'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { app } from '@/maison/app'
import { delay } from '@/utils/delay'
import { useScroll } from '@vueuse/core'

const url = 'https://directus.antoinetheriault.com'
const client = createDirectus(url).with(rest())

//Photos variables
let page = 0
let perPage = 100
let endReached = false
const fetching = ref<boolean>(false)
//const files = await fetchImages()
const files = ref<Record<string, any>[]>([])

const close = ref<boolean>(false)
const photosRef = ref<HTMLDivElement>()

const { arrivedState, y } = useScroll(photosRef, {
  offset: { bottom: 500 }
})

watch(
  () => arrivedState.bottom,
  async (value) => {
    if (!fetching.value && value && !endReached) {
      const images = await fetchImages()
      files.value = files.value.concat(images)
    }
  }
)

async function closePicture() {
  close.value = true

  await delay(1500)

  app.CONTROLS.lock()
  app.CONTROLS.pointerSpeed = 1

  app.SHOWALLPICTURES.value = false
}

const showImages = ref<boolean>(false)

async function fetchImages() {
  fetching.value = true
  const images = await client.request(
    readFiles({
      filter: {
        folder: {
          _eq: '19274e41-2b08-4cb6-bc5f-c6c97363fd13'
        }
      },
      sort: ['-uploaded_on'],
      limit: perPage,
      offset: perPage !== -1 ? page * perPage : 0
    })
  )
  page++
  fetching.value = false
  if (images.length < perPage || perPage === -1) endReached = true

  return images
}

onMounted(async () => {
  app.CONTROLS.unlock()

  await delay(1500)

  showImages.value = true
})

onUnmounted(() => {
  app.CONTROLS.lock()
  app.CONTROLS.pointerSpeed = 1
})
</script>
<template>
  <div class="photos-wrapper" :class="{ hide: close }">
    <a href="#" @click.prevent="closePicture" class="close">X</a>
    <p class="welcome">{{ $t('networkTitle') }}</p>
    <div class="photos" ref="photosRef">
      <template v-for="image in files" :key="image.id">
        <a target="_blank" :href="'https://directus.antoinetheriault.com/assets/' + image.id">
          <img
            loading="lazy"
            :style="{
              opacity: showImages ? 1 : 0,
              transform: `rotate(${Math.random() * 4 - 2}deg)`
            }"
            :src="'https://directus.antoinetheriault.com/assets/' + image.id"
          />
        </a>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.close {
  position: absolute;
  top: 5%;
  right: 5%;

  display: inline-block;
  padding: 10px 20px;
  color: black;
  text-decoration: none;
  background: url('@assets/loading-texture.png'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  background-size: cover !important;

  font-size: 1.3em;

  transform: translate(50%, -50%) scale(1) rotate(0deg);
  transition: transform 0.3s;

  z-index: 3;

  &:hover {
    transform: translate(50%, -50%) scale(1.2) rotate(-5deg);
  }
}

.welcome {
  position: absolute;
  top: 5%;
  left: 2.5%;

  display: inline-block;
  padding: 10px 20px;
  color: black;
  text-decoration: none;
  background: url('@assets/loading-texture.png'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  background-size: cover !important;

  font-size: 1.3em;

  transform: translateY(-50%);
  transition: transform 0.3s;

  z-index: 3;
}
.photos-wrapper {
  z-index: 3;
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  animation: picture-fade-in 1.5s 0s 1 forwards;

  background: transparent;

  &.hide {
    animation: picture-fade-out 1.5s 0s 1 forwards;
  }
}

.photos {
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  gap: 60px;

  padding: 60px 40px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  background: url('@assets/poteauBois.jpg'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);

  border-radius: 5px;
  box-shadow: 40px 40px 80px 20px rgba(0, 0, 0, 0.6);
  background-size: cover !important;
}

img {
  max-width: 100%;
  max-height: 85vh;
  width: auto;
  height: auto;

  padding: 5px 5px 10px 5px;
  background: white;
  border-radius: 2px;

  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);

  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    transform: rotate(0deg) !important;
  }
}

@keyframes picture-fade-out {
  0% {
    left: 0%;
    top: 0%;
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
    left: 0%;
    top: 0%;
    opacity: 1;
    transform: rotate(0deg);
  }
}
</style>
