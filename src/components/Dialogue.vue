<script setup lang="ts">
import { app } from '@/maison/app'
import type { Ref } from 'vue'

const dialogue: Ref<string> = app.DIALOGUE
</script>
<template>{{ dialogue }}</template>
<style lang="scss" scoped></style>
