<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { trpc } from '@/trpc'
import AdForm from '@/components/AdForm.vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'
import blankAd from './blankAd'

const ad = ref<AdUpsert>(blankAd())

const submitCreate = async () => {
  const response = await trpc.ad.create.mutate(ad.value)
}
</script>

<template>
  {{ ad }}
  <AdForm v-model="ad" heading="Create New Ad:" label="Create Ad" :submitFunction="submitCreate" />
</template>

<style scoped></style>
