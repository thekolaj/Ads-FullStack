<script setup lang="ts">
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbHeading, FwbTable, FwbTableBody, FwbTableCell, FwbTableRow } from 'flowbite-vue'

const categories = ref<Awaited<ReturnType<typeof trpc.category.list.query>>>([])
onBeforeMount(async () => {
  categories.value = await trpc.category.list.query()
})
</script>

<template>
  <fwb-heading tag="h2" class="title">Categories:</fwb-heading>
  <fwb-table hoverable>
    <fwb-table-body>
      <fwb-table-row
        v-for="category in categories"
        :key="category.id"
        @click="$router.push({ name: 'Category', params: { id: category.id } })"
      >
        <fwb-table-cell>{{ category.title }}</fwb-table-cell>
        <fwb-table-cell>{{ category.adCount }}</fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
</template>

<style scoped></style>
