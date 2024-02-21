<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'

const route = useRoute()
const userId = Number(route.params.id)

const user = ref<Awaited<ReturnType<typeof trpc.user.get.query>>>()
const ads = ref<Awaited<ReturnType<typeof trpc.ad.list.query>>>([])
onBeforeMount(async () => {
  user.value = await trpc.user.get.query({ id: userId })
  ads.value = await trpc.ad.list.query({ userId })
})
</script>

<template>
  <h1>User:</h1>
  {{ user }}
  <div v-for="ad in ads" :key="ad.id">{{ ad }}</div>
</template>

<style scoped></style>
