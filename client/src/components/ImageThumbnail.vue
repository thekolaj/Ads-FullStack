<script lang="ts" setup>
import type { ImageBare } from '@mono/server/src/shared/entities'
import { replaceByDefaultImage } from '@/utils'
import noImage from '@/assets/noImage.png'

defineProps<{
  images: ImageBare[]
}>()
</script>

<template>
  <div class="thumbnail">
    <img v-if="images.length" :src="images[0].url" alt="Thumbnail" @error="replaceByDefaultImage" />
    <img v-else :src="noImage" />
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
</style>
