<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import AdForm from './components/AdForm.vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'
import makeBlankAd from './makeBlankAd'

const route = useRoute()
const router = useRouter()

const adId = Number(route.params.id)

const ad = ref<AdUpsert>(makeBlankAd())
onBeforeMount(async () => {
  ad.value = await trpc.ad.detail.query({ id: adId })
})

const submitUpdate = async () => {
  const response = await trpc.ad.update.mutate(ad.value)
  router.push({ name: 'AdDetail', params: { id: response.id } })
}
</script>

<template>
  {{ ad }}
  <AdForm v-model="ad" heading="Update Ad:" label="Update Ad" :submitFunction="submitUpdate" />
</template>

<style scoped></style>
