<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbHeading } from 'flowbite-vue'

const route = useRoute()
const categoryId = Number(route.params.id)

const category = ref<Awaited<ReturnType<typeof trpc.category.get.query>>>()
const ads = ref<Awaited<ReturnType<typeof trpc.ad.list.query>>>([])
onBeforeMount(async () => {
  category.value = await trpc.category.get.query({ id: categoryId })
  ads.value = await trpc.ad.list.query({ categoryId })
})
</script>

<template>
  <fwb-heading tag="h2" class="title">Category:</fwb-heading>
  {{ category }}
  <div v-for="ad in ads" :key="ad.id">{{ ad }}</div>
</template>

<style scoped></style>
