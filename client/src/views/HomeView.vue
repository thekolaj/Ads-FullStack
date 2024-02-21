<script setup lang="ts">
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'

const ads = ref<Awaited<ReturnType<typeof trpc.ad.list.query>>>([])
onBeforeMount(async () => {
  ads.value = await trpc.ad.list.query()
})
</script>

<template>
  <h1>Ads:</h1>
  <div v-for="ad in ads" :key="ad.id">{{ ad }}</div>
</template>

<style scoped></style>
