<script setup lang="ts">
import { FwbBadge } from 'flowbite-vue'
import type { CategoryBare } from '@mono/server/src/shared/entities'

defineProps<{
  categories: CategoryBare[]
}>()
</script>
<template>
  <div v-if="categories.length">
    <FwbBadge v-for="category in categories" :key="category.id" class="inline" type="green">{{
      category.title
    }}</FwbBadge>
  </div>
  <div v-else><FwbBadge type="yellow" class="inline">None</FwbBadge></div>
</template>
