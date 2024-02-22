<script setup lang="ts">
import { login } from '@/stores/user'
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput, FwbAccordion } from 'flowbite-vue'
import { FwbAccordionHeader, FwbAccordionPanel, FwbAccordionContent } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import useErrorMessage from '@/composables/useErrorMessage'

const router = useRouter()

const userForm = ref({
  email: '',
  password: '',
})

const [submitLogin, errorMessage] = useErrorMessage(async () => {
  await login(userForm.value)

  router.push({ name: 'Home' })
})
</script>

<template>
  <PageForm heading="Log in to your account" formLabel="Login" @submit="submitLogin">
    <template #default>
      <FwbInput label="Email" type="email" v-model="userForm.email" :required="true" />

      <FwbInput label="Password" type="password" v-model="userForm.password" :required="true" />

      <FwbAlert v-if="errorMessage" data-testid="errorMessage" type="danger">
        {{ errorMessage }}
      </FwbAlert>

      <div class="grid">
        <FwbButton color="default" type="submit" size="xl">Log in</FwbButton>
      </div>
    </template>

    <template #footer>
      <FwbAlert class="bg-transparent text-center">
        Not a member?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Signup' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign up</RouterLink
        >
      </FwbAlert>
    </template>
  </PageForm>
  <FwbAccordion flush :open-first-item="false">
    <FwbAccordionPanel>
      <FwbAccordionHeader>Demo Users</FwbAccordionHeader>
      <FwbAccordionContent>
        <h3>Admin:</h3>
        <p>email: 'admin@admin.com'</p>
        <p>password: 'admin123'</p>
        <h3>User:</h3>
        <p>email: 'first@user.org'</p>
        <p>password: 'Password321'</p>
      </FwbAccordionContent>
    </FwbAccordionPanel>
  </FwbAccordion>
</template>

<style scoped></style>
