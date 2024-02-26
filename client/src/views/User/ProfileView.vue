<script setup lang="ts">
import { authUserId } from '@/stores/user'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { update } from '@/stores/user'
import useErrorMessage from '@/composables/useErrorMessage'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import AlertError from '@/components/AlertError.vue'

const user = ref<Awaited<ReturnType<typeof trpc.user.get.query>>>({
  id: 0,
  email: '',
  name: '',
  phone: '',
  admin: false,
})
onBeforeMount(async () => {
  user.value = await trpc.user.get.query({ id: authUserId.value! })
})

const hasSucceeded = ref(false)

const [submitUpdate, errorMessage] = useErrorMessage(async () => {
  hasSucceeded.value = false
  await update(user.value)
  hasSucceeded.value = true
})
</script>

<template>
  <PageForm heading="Your profile:" formLabel="Account update" @submit="submitUpdate">
    <template #default>
      <FwbInput label="Email" type="email" v-model="user.email" :required="true" />

      <FwbInput
        label="Name"
        type="text"
        minlength="3"
        maxlength="64"
        v-model="user.name"
        :required="true"
      />

      <FwbInput label="Phone" type="text" maxlength="16" v-model="user.phone" />

      <div class="grid">
        <FwbButton color="default" type="submit" size="xl">Update Profile</FwbButton>
      </div>
      <FwbAlert v-if="hasSucceeded" data-testid="successMessage" type="success">
        Profile update successful
      </FwbAlert>
      <AlertError :message="errorMessage">
        {{ errorMessage }}
      </AlertError>
    </template>
  </PageForm>
</template>

<style scoped></style>
