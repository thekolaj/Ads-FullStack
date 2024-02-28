<script setup lang="ts">
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import PageForm from '@/components/PageForm.vue'
import AlertError from '@/components/AlertError.vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'

const ad = defineModel<AdUpsert>({ required: true })
const props = defineProps<{
  heading: string
  label: string
  submitFunction: () => void
}>()

const [submit, errorMessage] = useErrorMessage(props.submitFunction)
</script>

<template>
  <PageForm :heading="heading" :formLabel="label" @submit="submit">
    <template #default>
      <FwbInput label="Title" type="text" maxlength="64" v-model="ad.title" :required="true" />

      <FwbTextarea label="Text" maxlength="999" v-model="ad.text" :required="true" />

      <!-- @vue-ignore -->
      <FwbInput label="Price" type="number" min="0" v-model.number="ad.price" />
      <div class="grid">
        <FwbButton color="default" type="submit" size="xl">{{ label }}</FwbButton>
      </div>
    </template>
    <template #footer>
      <AlertError :message="errorMessage">
        {{ errorMessage }}
      </AlertError>
    </template>
  </PageForm>
</template>

<style scoped></style>
