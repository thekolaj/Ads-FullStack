<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import AdList from '@/components/AdList.vue'
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
  <AdList v-if="category" heading="Category:" :ads="ads">
    <FwbHeading tag="h3" class="title">{{ category.title }}</FwbHeading>
  </AdList>
</template>

<style scoped></style>
