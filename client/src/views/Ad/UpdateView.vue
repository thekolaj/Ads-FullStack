<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbHeading } from 'flowbite-vue'

const route = useRoute()
const adId = Number(route.params.id)

const ad = ref<Awaited<ReturnType<typeof trpc.ad.detail.query>>>()
onBeforeMount(async () => {
  ad.value = await trpc.ad.detail.query({ id: adId })
})
</script>

<template>
  <h1>Update ad:</h1>
  {{ ad }}
</template>

<style scoped></style>
