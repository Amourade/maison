<script setup lang="ts">
import { app } from '@/maison/app'
import type { Ref } from 'vue'

const dialogue: Ref<[string, string]> = app.DIALOGUE
</script>
<template>
  <transition name="dialogue">
    <div v-if="dialogue[0] && dialogue[1]">{{ $t(`${dialogue[0]}.${dialogue[1]}`) }}</div>
  </transition>
</template>
<style lang="scss" scoped>
div {
  position: fixed;
  bottom: 25px;
  left: 50%;

  transform: translateX(-50%);

  margin: 0 auto;
  z-index: 2;
  width: min(calc(100% - 50px), 1000px);
  padding: 25px;
  background: linear-gradient(
    0deg,
    rgba(50, 27, 27, 1) 0%,
    rgba(191, 171, 161, 1) 3%,
    rgba(236, 228, 212, 1) 92%,
    rgba(255, 253, 249, 1) 100%
  );

  font-size: 1.4em;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.6), 3px 3px 3px rgba(0, 0, 0, 0.5);
  text-align: center;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.7), 10px 10px 10px 0px rgba(0, 0, 0, 0.4);
}
</style>
