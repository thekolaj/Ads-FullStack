<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from 'flowbite-vue'
import { authUserId, logout } from '@/stores/user'
import { trpc } from '@/trpc'

const links = [
  { label: 'Home', name: 'Home' },
  { label: 'Category List', name: 'CategoryList' },
  { label: 'Create Ad', name: 'AdCreate' },
]

const router = useRouter()

const user = ref<Awaited<ReturnType<typeof trpc.user.get.query>>>()
watchEffect(
  async () =>
    (user.value = authUserId.value
      ? await trpc.user.get.query({ id: authUserId.value })
      : undefined)
)

function logoutUser() {
  logout()
  router.push({ name: 'Home' })
}
</script>

<template>
  <FwbNavbar>
    <template #default="{ isShowMenu }">
      <FwbNavbar-collapse :isShowMenu="isShowMenu">
        <!-- prettier-ignore -->
        <FwbNavbarLink
          v-for="link in links"
          :key="link.name"
          :link="({ name: link.name } as any)"
          link-attr="to"
          component="RouterLink"
        >
          {{ link.label }}
        </FwbNavbarLink>
        <template v-if="user">
          <!-- prettier-ignore -->
          <FwbNavbarLink :link="({ name: 'Profile' } as any)" link-attr="to" component="RouterLink">
            User: {{ user.name }}
          </FwbNavbarLink>
          <FwbNavbarLink @click.prevent="logoutUser" link="#">Logout</FwbNavbarLink>
        </template>

        <template v-else>
          <!-- prettier-ignore -->
          <FwbNavbarLink :link="({ name: 'Login' } as any)" link-attr="to" component="RouterLink">
            Login
          </FwbNavbarLink>
          <!-- prettier-ignore -->
          <FwbNavbarLink :link="({ name: 'Signup' } as any)" link-attr="to" component="RouterLink">
            Signup
          </FwbNavbarLink>
        </template>
      </FwbNavbar-collapse>
    </template>
  </FwbNavbar>
</template>

<style scoped>
nav {
  width: 100%;
  background-color: var(--background-color2) !important;
}
</style>
