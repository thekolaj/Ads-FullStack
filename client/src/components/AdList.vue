<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { trpc } from '@/trpc'
import { localeDate } from '@/utils/'
import type { AdSearch } from '@mono/server/src/shared/entities'
import CategoryBadges from './CategoryBadges.vue'
import ImageThumbnail from './ImageThumbnail.vue'
import {
  FwbP,
  FwbHeading,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbPagination,
} from 'flowbite-vue'

const { searchBy } = defineProps<{
  heading: string
  searchBy: AdSearch
}>()

const currentPage = ref(searchBy.pagination?.page || 1)
const adsPerPage = ref(searchBy.pagination?.take || 5)

const adList = ref<Awaited<ReturnType<typeof trpc.ad.list.query>>>({ totalCount: 0, ads: [] })
watchEffect(async () => {
  adList.value = await trpc.ad.list.query({
    ...searchBy,
    pagination: { page: currentPage.value, take: adsPerPage.value },
  })
})
</script>

<template>
  <fwb-heading tag="h2" class="title">{{ heading }}</fwb-heading>
  <slot />
  <div v-if="adList.totalCount">
    <fwb-table hoverable>
      <FwbTableHead>
        <FwbTableHeadCell>Image</FwbTableHeadCell>
        <FwbTableHeadCell>Description</FwbTableHeadCell>
        <FwbTableHeadCell>Price</FwbTableHeadCell>
      </FwbTableHead>
      <fwb-table-body>
        <fwb-table-row
          v-for="ad in adList.ads"
          :key="ad.id"
          @click.stop="$router.push({ name: 'AdDetail', params: { id: ad.id } })"
        >
          <fwb-table-cell><ImageThumbnail :images="ad.images"></ImageThumbnail></fwb-table-cell>
          <fwb-table-cell>
            <FwbP class="font-bold">{{ ad.title }}</FwbP>
            <CategoryBadges :categories="ad.categories"></CategoryBadges>
            <div>{{ localeDate(ad.updatedAt) }}</div>
          </fwb-table-cell>
          <fwb-table-cell><span v-if="ad.price">€</span> {{ ad.price }}</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <fwb-pagination
      class="pagination"
      v-model="currentPage"
      :per-page="adsPerPage"
      :total-items="adList.totalCount"
      show-icons
    ></fwb-pagination>
  </div>
  <fwb-heading v-else tag="h3" class="title">No Ads</fwb-heading>
</template>

<style scoped>
.pagination {
  margin: 30px;
  display: flex;
  justify-content: center;
}
</style>
