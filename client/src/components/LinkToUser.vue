<script lang="ts" setup>
import type { UserBare } from '@mono/server/src/shared/entities'

defineProps<{
  user: UserBare
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'User', params: { id: user.id } }"
    class="font-semibold leading-6 text-indigo-400 hover:text-indigo-500"
    >{{ user.name }}</RouterLink
  >
</template>
