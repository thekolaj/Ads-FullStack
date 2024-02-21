<script setup lang="ts">
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'

const categories = ref<Awaited<ReturnType<typeof trpc.category.list.query>>>([])
onBeforeMount(async () => {
  categories.value = await trpc.category.list.query()
})
</script>

<template>
  <h1>Categories:</h1>
  <div v-for="category in categories" :key="category.id">{{ category }}</div>
</template>

<style scoped></style>
