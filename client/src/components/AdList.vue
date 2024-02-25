<script setup lang="ts">
import localeDate from '@/utils/localeDate'
import type { Ad } from '@mono/server/src/shared/entities'
import CategoryBadges from '@/components/CategoryBadges.vue'
import {
  FwbP,
  FwbHeading,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue'

defineProps<{
  heading: string
  ads: Ad[]
}>()
</script>

<template>
  <fwb-heading tag="h2" class="title">{{ heading }}</fwb-heading>
  <slot />
  <fwb-table v-if="ads.length" hoverable>
    <FwbTableHead>
      <FwbTableHeadCell>Image</FwbTableHeadCell>
      <FwbTableHeadCell>Description</FwbTableHeadCell>
      <FwbTableHeadCell>Price</FwbTableHeadCell>
    </FwbTableHead>
    <fwb-table-body>
      <fwb-table-row
        v-for="ad in ads"
        :key="ad.id"
        @click.stop="$router.push({ name: 'AdDetail', params: { id: ad.id } })"
      >
        <fwb-table-cell>image</fwb-table-cell>
        <fwb-table-cell>
          <FwbP class="font-bold">{{ ad.title }}</FwbP>
          <CategoryBadges :categories="ad.categories"></CategoryBadges>
          <div>{{ localeDate(ad.updatedAt) }}</div>
        </fwb-table-cell>
        <fwb-table-cell><span v-if="ad.price">€</span> {{ ad.price }}</fwb-table-cell>
      </fwb-table-row>
    </fwb-table-body>
  </fwb-table>
  <fwb-heading v-else tag="h3" class="title">No Ads</fwb-heading>
</template>

<style scoped></style>
