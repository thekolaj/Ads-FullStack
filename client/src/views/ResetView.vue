<script lang="ts" setup>
import { ref } from 'vue'
import { trpc } from '@/trpc'
import { FwbButton, FwbHeading, FwbAlert } from 'flowbite-vue'
import AlertError from '@/components/AlertError.vue'
import useErrorMessage from '@/composables/useErrorMessage'

const hasSucceeded = ref(false)

const [reset, errorMessage] = useErrorMessage(async () => {
  hasSucceeded.value = false
  await trpc.reset.mutate()
  hasSucceeded.value = true
})
</script>

<template>
  <div>
    <fwb-heading tag="h2" class="title">Reset:</fwb-heading>

    <p>You can reset the database to it's default demo entries by clicking the button below</p>
    <FwbButton @click="reset">Reset</FwbButton>
    <FwbAlert v-if="hasSucceeded" data-testid="successMessage" type="success">
      Reset successful!
    </FwbAlert>
    <AlertError :message="errorMessage">
      {{ errorMessage }}
    </AlertError>
  </div>
</template>

<style scoped>
div {
  text-align: center;
}

button {
  margin: 20px;
}
</style>
