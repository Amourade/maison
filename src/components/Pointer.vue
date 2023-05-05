<script setup lang="ts">
import { app } from '@/maison/app'
import type { Object3D } from 'three'
import type { Ref } from 'vue'

const INTERSECTED: Ref<undefined | Object3D> = app.INTERACTIONS.INTERSECTED
</script>
<template>
  <div :class="{ hover: INTERSECTED }"></div>
</template>
<style lang="scss" scoped>
div {
  position: absolute;
  width: 0px;
  height: 0px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(213, 212, 202, 1) 0%, rgba(195, 181, 151, 1) 100%);
  z-index: 2;
  box-shadow: 0px 0px 3px 3px rgba(255, 255, 255, 0.8);
  opacity: 0;

  transition: opacity 0.2s, width 0.2s, height 0.2s;

  mix-blend-mode: difference;

  &.hover {
    width: 2px;
    height: 2px;

    opacity: 1;
  }
}
</style>
