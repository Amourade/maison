<script setup lang="ts">
import type { Ref } from 'vue'
import { lock, maisonApp } from '@/maison'
import InterfaceHolder from './InterfaceHolder.vue'

const paused: Ref<boolean> = maisonApp.SCENE.paused

const lockCursor = () => {
  if (maisonApp.LOADED.value) {
    lock()
  }
}
</script>
<template>
  <div :class="{ locked: !paused }" class="holder-wrapper">
    <InterfaceHolder @click="lockCursor">
      <h2>Contrôles/Controls</h2>
      <p>W A S D + Souris : Mouvement</p>
      <p>Clique Gauche : Interaction</p>
      <br />
      <p>Appuyer sur une touche pour commencer / Press any key to start</p>
    </InterfaceHolder>
  </div>
</template>
<style lang="scss" scoped>
.holder-wrapper {
  cursor: pointer;
  z-index: 2;
  opacity: 1;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(0turn);
  transition: transform 0.5s, left 0.5s, bottom 0.5s, opacity 0.5s;

  &.locked {
    left: 120%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
  }
}
</style>
