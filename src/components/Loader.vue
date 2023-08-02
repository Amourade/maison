<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import InterfaceHolder from './InterfaceHolder.vue'
import { maisonApp } from '@/maison'

const show = ref(true)
const fadeLoading = ref(false)

const loadingPercent: Ref<number> = maisonApp.LOADING_PERCENT
const loaded: Ref<boolean> = maisonApp.LOADED

watch(loaded, (value) => {
  if (value)
    setTimeout(() => {
      fadeLoading.value = true
      setTimeout(() => {
        show.value = false
      }, 2000)
    }, 1)
})
</script>
<template>
  <div v-if="show" class="wrapper" :class="{ done: fadeLoading }">
    <div class="loader">
      <InterfaceHolder>{{ loadingPercent }}% Loaded</InterfaceHolder>
    </div>
    <div class="grid">
      <div v-for="n in 49" :key="n"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s, left 0.5s, top 0.5s, opacity 0.5s;
  z-index: 4;

  &:hover {
    transform: translate(-50%, -50%) scale(1.5) rotate(0turn);
  }
}

.wrapper {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
  background: #d7d3bf;
  background-size: cover;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  &.done {
    transition: background 1s;
    transition-delay: 0.5s;

    background: transparent;

    .loader {
      transition: transform 1s, left 1s, bottom 1s;
      top: 50%;
      left: 120%;
      transform: translate(-50%, -50%) rotate(450deg);
    }
    .grid div {
      transition: all 0.2s;
      transition-delay: 0.5s;
      position: relative;
      transform: scale(0);

      &:hover {
        transform: scale(0);
      }
      &:nth-child(2n) {
        transition-delay: 0.6s;
      }
      &:nth-child(9n) {
        transition-delay: 0.7s;
      }
      &:nth-child(4n) {
        transition-delay: 0.8s;
      }
      &:nth-child(5n) {
        transition-delay: 0.9s;
      }
      &:nth-child(8n) {
        transition-delay: 1s;
      }
      &:nth-child(11n) {
        transition-delay: 1.1s;
      }
      &:nth-child(14n) {
        transition-delay: 1.2s;
      }
      &:nth-child(17n) {
        transition-delay: 1.3s;
      }
    }
  }
}

.grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: clamp(3px, 2%, 10px);
  row-gap: clamp(3px, 2%, 10px);
  padding: clamp(3px, 2%, 10px);

  div {
    background: url('@assets/loading-texture.png'),
      linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(235, 233, 218, 1) 100%);
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.8), inset 0 0 30px 5px rgba(0, 0, 0, 0.5);
    background-size: cover !important;
    position: relative;
    opacity: 1;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.2s;

    &:hover {
      transform: rotate(0.7deg);
    }

    &:nth-child(2n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(180, 87, 71) 0%, rgb(63, 52, 49) 100%);
      &:hover {
        transform: rotate(2deg);
      }
    }
    &:nth-child(9n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(59, 89, 148) 0%, rgb(30, 31, 37) 100%);
      &:hover {
        transform: rotate(1deg);
      }
    }
    &:nth-child(4n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(12, 189, 41) 0%, rgb(78, 83, 73) 100%);
      &:hover {
        transform: rotate(-1deg);
      }
    }
    &:nth-child(5n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(108, 63, 116) 0%, rgb(34, 5, 39) 100%);
      &:hover {
        transform: rotate(-2deg);
      }
    }
    &:nth-child(8n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(240, 241, 200) 0%, rgb(58, 58, 51) 100%);
      &:hover {
        transform: rotate(0.5deg);
      }
    }
    &:nth-child(11n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(161, 202, 202) 0%, rgb(37, 62, 63) 100%);
      &:hover {
        transform: rotate(-0.8deg);
      }
    }
    &:nth-child(14n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(214, 172, 197) 0%, rgb(61, 46, 57) 100%);
      &:hover {
        transform: rotate(0deg);
      }
    }
    &:nth-child(17n) {
      background: url('@assets/loading-texture.png'),
        linear-gradient(180deg, rgb(190, 19, 82) 0%, rgb(75, 57, 63) 100%);
      &:hover {
        transform: rotate(-1.2deg);
      }
    }
  }
}
</style>
