<script setup lang="ts">
import Instructions from './components/Instructions.vue'
import Pointer from './components/Pointer.vue'
import Loader from './components/Loader.vue'
import { setup } from './maison'
import { onMounted, ref } from 'vue'
import { app } from './maison/app'
import * as THREE from 'three'
import Dialogue from './components/Dialogue.vue'
import PictureTaker from './components/PictureTaker.vue'
import PhotosViewer from './components/PhotosViewer.vue'

const { PICTURE } = app

const showPicture = ref(false)

onMounted(() => {
  const maison = setup()
  if (maison.DOMElement) {
    document.getElementById('rendererWrapper')?.appendChild(maison.DOMElement)
  }

  if (app.DEBUG.general) {
    showDebugStats()
  }
})

const position = ref<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

function showDebugStats() {
  if (!app.SCENE.camera) return
  position.value.copy(app.SCENE.camera.position)

  requestAnimationFrame(showDebugStats)
}
</script>

<template>
  <Loader />
  <Instructions @open-photo="showPicture = true" />
  <Pointer />
  <Dialogue />
  <Suspense>
    <PhotosViewer v-if="app.SHOWALLPICTURES.value" />
  </Suspense>
  <PictureTaker v-if="PICTURE.taking.value || showPicture" @close-photo="showPicture = false" />
  <div id="debug-stat" v-if="app.DEBUG.general">
    <p>{{ position.x.toFixed(1) }}</p>
    <p>{{ position.y.toFixed(1) }}</p>
    <p>{{ position.z.toFixed(1) }}</p>
  </div>
  <div id="rendererWrapper"></div>
</template>

<style lang="scss">
.img-download {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lans="scss" scoped>
#debug-stat {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 15;
  color: purple;
}
</style>
