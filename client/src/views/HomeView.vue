<script setup lang="ts">
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import AdList from '@/components/AdList.vue'

const ads = ref<Awaited<ReturnType<typeof trpc.ad.list.query>>>([])
onBeforeMount(async () => {
  ads.value = await trpc.ad.list.query()
})
</script>

<template>
  <AdList heading="Ads:" :ads="ads"></AdList>
</template>

<style scoped></style>
