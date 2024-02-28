<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import AdForm from './components/AdForm.vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'
import makeBlankAd from './makeBlankAd'

const router = useRouter()

const ad = ref<AdUpsert>(makeBlankAd())

const submitCreate = async () => {
  const response = await trpc.ad.create.mutate(ad.value)
  router.push({ name: 'AdDetail', params: { id: response.id } })
}
</script>

<template>
  {{ ad }}
  <AdForm v-model="ad" heading="Create New Ad:" label="Create Ad" :submitFunction="submitCreate" />
</template>

<style scoped></style>
