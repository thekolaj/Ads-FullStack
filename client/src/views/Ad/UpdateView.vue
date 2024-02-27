<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'
import blankAd from './blankAd'

const route = useRoute()
const adId = Number(route.params.id)

const ad = ref<AdUpsert>(blankAd())
onBeforeMount(async () => {
  ad.value = await trpc.ad.detail.query({ id: adId })
})

const submitUpdate = async () => {
  const response = await trpc.ad.update.mutate(ad.value)
}
</script>

<template>
  <h1>Update ad:</h1>
  {{ ad }}
</template>

<style scoped></style>
