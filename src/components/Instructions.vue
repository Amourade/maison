<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import * as THREE from 'three'
import { lock, maisonApp } from '@/maison'
import InterfaceHolder from './InterfaceHolder.vue'
import mask from '@/assets/mask.webp'
import noMask from '@/assets/nomask.webp'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const paused: Ref<boolean> = maisonApp.SCENE.paused

const lockCursor = () => {
  if (maisonApp.LOADED.value) {
    lock()
  }
}

onMounted(() => {
  new THREE.ImageLoader(maisonApp.LOADER).load(mask)
  new THREE.ImageLoader(maisonApp.LOADER).load(noMask)
})

const signRotation = ref<number>(-2)
const signVelocity = ref<number>(0)

function animateSign() {
  signVelocity.value = signVelocity.value / 1.5
  if (signVelocity.value > 1) {
    return requestAnimationFrame(animateSign)
  }
  signVelocity.value = 0
}

function changeLocale() {
  signVelocity.value += 10000
  animateSign()
  if (locale.value === 'fr') {
    return (locale.value = 'en')
  }
  return (locale.value = 'fr')
}

function straigthen() {
  signRotation.value = 0
}

function crook() {
  signRotation.value = Math.random() * 4 - 2
}
</script>
<template>
  <div :class="{ locked: !paused }" class="holder-wrapper">
    <div id="post"></div>
    <transition name="mask">
      <img v-show="paused" class="vendeur mask" :src="mask" />
    </transition>
    <Transition name="mask">
      <img v-show="paused" class="vendeur no-mask" :src="noMask" />
    </Transition>
    <h1>{{ $t('welcome') }}</h1>
    <InterfaceHolder
      :style="{
        cursor: 'pointer',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.6)',
        minWidth: '1000px'
      }"
      @click.prevent="lockCursor"
    >
      <h2>{{ $t('controls') }}</h2>
      <div class="controls">
        <p>{{ $t('movement') }}</p>
        <p>{{ $t('espace') }}</p>
        <p>{{ $t('click') }}</p>
        <p>{{ $t('putFlower') }}</p>
        <p>{{ $t('putPainting') }}</p>
      </div>
      <p>{{ $t('start') }}</p>
    </InterfaceHolder>
    <div
      @click.prevent="changeLocale"
      @mouseenter="straigthen"
      @mouseleave="crook"
      :style="{ transform: `rotate(${signRotation + signVelocity}deg)` }"
      class="lang"
    >
      <span :class="{ selected: $i18n.locale === 'fr' }">FR</span>
      <span :class="{ selected: $i18n.locale === 'en' }">EN</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mask-enter-active,
.mask-leave-active {
  transition: opacity 1s linear;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

#post {
  height: calc(100% + 50vh);
  width: 30px;
  position: absolute;
  top: -50px;
  left: 50%;
  background: white;
  border-radius: 2px;
  transform: translateX(-50%);
  background: url('@assets/loading-texture.png'),
    linear-gradient(
      90deg,
      rgba(111, 67, 46, 1) 0%,
      rgba(203, 202, 182, 1) 45%,
      rgba(241, 245, 217, 1) 50%,
      rgba(210, 212, 191, 1) 64%,
      rgba(240, 215, 162, 1) 100%
    );
}

h1,
.lang {
  padding: 10px 20px;
  background: white;
  border-radius: 5px;

  background: url('@assets/loading-texture.png'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.6);
  background-size: cover !important;

  font-size: 2em;

  transform: rotate(2deg);

  //transition: transform 0.5s linear;

  &:nth-child(2n) {
    transform: rotate(-2deg);
  }

  &:hover {
    transform: rotate(0deg);
  }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.lang {
  display: flex;
  gap: 15px;

  cursor: pointer;

  span {
    color: rgb(31, 3, 6);
    text-decoration: none;

    &.selected {
      text-decoration: underline;
    }
  }
}
.vendeur {
  position: absolute;
  bottom: calc(100% - 200px);
  right: calc(100% - 200px);

  transform: rotate(-15deg);

  animation: sellerAnim infinite 5s;

  width: 350px;

  z-index: 10;
  &.no-mask {
    right: auto;
    left: calc(100% - 200px);
    transform: rotate(15deg);

    animation: sellerAnimReverse infinite 5s;
  }
}

@keyframes sellerAnim {
  0% {
    transform: rotate(15deg);
    scale: 1;
  }

  50% {
    transform: rotate(-15deg);
    scale: 0.8;
  }

  100% {
    transform: rotate(15deg);
    scale: 1;
  }
}

@keyframes sellerAnimReverse {
  0% {
    transform: rotate(-15deg);
    scale: 1;
  }

  50% {
    transform: rotate(15deg);
    scale: 0.8;
  }

  100% {
    transform: rotate(-15deg);
    scale: 1;
  }
}

.holder-wrapper {
  z-index: 3;
  opacity: 1;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(0turn);
  transition: transform 0.5s, left 0.5s, bottom 0.5s, opacity 0.5s;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
  &.locked {
    left: 120%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 0;
  }
}
</style>
