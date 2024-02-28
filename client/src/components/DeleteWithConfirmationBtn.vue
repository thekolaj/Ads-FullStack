<script setup lang="ts">
import { ref } from 'vue'
import { FwbButton, FwbModal, FwbP } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import AlertError from '@/components/AlertError.vue'

const props = defineProps<{
  heading: string
  deleteFunction: () => void
}>()

const [submit, errorMessage] = useErrorMessage(props.deleteFunction)

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}
</script>

<template>
  <FwbButton color="red" pill @click="showModal"><slot>🗑️</slot></FwbButton>
  <fwb-modal size="xs" v-if="isShowModal" @close="closeModal">
    <template #body>
      <fwb-p class="text-center">{{ heading }}</fwb-p>
    </template>
    <template #footer>
      <AlertError :message="errorMessage">
        <div>{{ errorMessage }}</div>
      </AlertError>
      <div class="flex justify-around">
        <fwb-button size="lg" @click="closeModal" color="alternative"> No </fwb-button>
        <fwb-button size="lg" @click="submit" color="red"> Yes </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<style scoped>
button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
