<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref, computed } from 'vue'
import {
  FwbHeading,
  FwbP,
  FwbButton,
  FwbCarousel,
  FwbTimeline,
  FwbTimelineBody,
  FwbTimelineContent,
  FwbTimelineItem,
  FwbTimelinePoint,
  FwbTimelineTime,
  FwbTimelineTitle,
} from 'flowbite-vue'
import CategoryBadges from '@/components/CategoryBadges.vue'
import LinkToUser from '@/components/LinkToUser.vue'
import DeleteWithConfirmationBtn from '@/components/DeleteWithConfirmationBtn.vue'
import { authUserAdmin, authUserId } from '@/stores/user'
import { localeDate } from '@/utils/'

const route = useRoute()
const router = useRouter()
const adId = Number(route.params.id)

const ad = ref<Awaited<ReturnType<typeof trpc.ad.detail.query>>>()
onBeforeMount(async () => {
  ad.value = await trpc.ad.detail.query({ id: adId })
})

const pictures = computed(() =>
  ad.value?.images.map((image) => ({
    src: image.url,
    alt: 'User Image',
  }))
)

const editVisible = computed(() => authUserAdmin.value || authUserId.value === ad.value?.userId)

const deleteFunction = async () => {
  await trpc.ad.remove.mutate({ id: adId })
  router.push({ name: 'Home' })
}
</script>

<template>
  <template v-if="ad">
    <fwb-heading tag="h2" class="title">Details:</fwb-heading>
    <div v-if="editVisible">
      <!-- prettier-ignore -->
      <FwbButton
        color="light"
        tag="router-link"
        :href="(({ name: 'AdUpdate', params: { id: ad.id } }) as any)"
        pill
        >Edit📝</FwbButton
      >
      <DeleteWithConfirmationBtn heading="Delete this Ad?" :deleteFunction="deleteFunction"
        >Delete🗑️</DeleteWithConfirmationBtn
      >
    </div>
    <fwb-heading tag="h3" class="title">{{ ad.title }}</fwb-heading>
    <div class="images">
      <FwbCarousel v-if="pictures?.length" :pictures="pictures" />
    </div>
    <div class="body">
      <fwb-p>{{ ad.text }}</fwb-p>
      <hr />
      <fwb-p class="font-bold"> Prince: {{ ad.price }} </fwb-p>
      <CategoryBadges :categories="ad.categories"></CategoryBadges>
      <fwb-p class="fade">Ad Updated: {{ localeDate(ad.updatedAt) }}</fwb-p>
      <fwb-p class="fade">Ad Created: {{ localeDate(ad.createdAt) }}</fwb-p>
      <hr />
      <fwb-heading tag="h3">Seller:</fwb-heading>
      <fwb-p class="font-bold"> Name: <LinkToUser :user="ad.user" /> </fwb-p>
      <fwb-p class="font-bold"> Email: {{ ad.user.email }} </fwb-p>
      <fwb-p class="font-bold"> Phone: {{ ad.user.phone }} </fwb-p>
      <hr />
      <fwb-timeline>
        <fwb-timeline-item v-for="comment in ad.comments" :key="comment.id">
          <fwb-timeline-point />
          <fwb-timeline-content>
            <fwb-timeline-time> {{ localeDate(comment.createdAt) }} </fwb-timeline-time>
            <fwb-timeline-title> By: <LinkToUser :user="comment.user" /></fwb-timeline-title>
            <fwb-timeline-body> {{ comment.text }} </fwb-timeline-body>
          </fwb-timeline-content>
        </fwb-timeline-item>
      </fwb-timeline>
    </div>
  </template>
  <fwb-heading v-else tag="h2" class="title">Loading Ad</fwb-heading>
</template>

<style scoped>
.fade {
  font-style: italic;
  opacity: 0.5;
}

hr,
.body {
  margin: 15px 0;
  width: 100%;
}

.images {
  width: 100%;
  max-width: 500px;
}
</style>
