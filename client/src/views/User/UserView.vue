<script setup lang="ts">
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import AdList from '@/components/AdList.vue'
import { FwbBadge, FwbP } from 'flowbite-vue'

const route = useRoute()
const userId = Number(route.params.id)

const user = ref<Awaited<ReturnType<typeof trpc.user.get.query>>>()
onBeforeMount(async () => {
  user.value = await trpc.user.get.query({ id: userId })
})
</script>

<template>
  <AdList v-if="user" heading="User:" :searchBy="{ userId }">
    <div class="info">
      <fwb-p class="font-bold">
        Name: {{ user.name }} <fwb-badge v-if="user.admin" class="inline">Admin</fwb-badge>
      </fwb-p>
      <fwb-p class="font-bold"> Email: {{ user.email }} </fwb-p>
      <fwb-p class="font-bold"> Phone: {{ user.phone }} </fwb-p>
    </div>
  </AdList>
</template>

<style scoped>
.info {
  margin-bottom: 20px;
}
</style>
