<script setup lang="ts">
import Instructions from './components/Instructions.vue'
import Pointer from './components/Pointer.vue'
import Loader from './components/Loader.vue'
import { setup } from './maison'
import { onMounted } from 'vue'
import Dialogue from './components/Dialogue.vue'

onMounted(() => {
  const maison = setup()
  if (maison.DOMElement) {
    document.getElementById('rendererWrapper')?.appendChild(maison.DOMElement)
  }
})
</script>

<template>
  <Loader />
  <Instructions />
  <Pointer />
  <Dialogue />
  <div id="rendererWrapper"></div>
</template>

<style scoped></style>
