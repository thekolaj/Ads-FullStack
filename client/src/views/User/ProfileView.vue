<script setup lang="ts">
import { authUserId } from '@/stores/user'
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'

const user = ref<Awaited<ReturnType<typeof trpc.user.get.query>>>()
onBeforeMount(async () => {
  user.value = await trpc.user.get.query({ id: authUserId.value! })
})
</script>

<template>
<h1>Profile:</h1>
{{ user }}</template>

<style scoped></style>
