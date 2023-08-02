<script setup lang="ts"></script>
<template>
  <div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
div {
  line-height: 1;
  white-space: nowrap;
  transform-origin: center center;
  background: url('@assets/loading-texture.png'),
    linear-gradient(180deg, rgb(223, 238, 231) 0%, rgb(221, 208, 179) 100%);
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.8);
  background-size: cover !important;

  color: rgb(31, 3, 6);

  padding: 30px;
  border-radius: 3px;
  font-size: 2em;
  text-transform: uppercase;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 30px;
  p,
  li {
    font-size: 0.8em;

    list-style-type: none;
  }
}
</style>
