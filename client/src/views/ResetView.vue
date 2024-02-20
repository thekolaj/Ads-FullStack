<script lang="ts" setup>
import { trpc } from '@/trpc'
import { FwbButton } from 'flowbite-vue'

async function reset() {
  await trpc.reset.mutate()
}
</script>

<template>
  <h1>Ad list!</h1>
  <FwbButton @click="reset">Reset</FwbButton>
</template>
