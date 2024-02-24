<script lang="ts" setup>
import { trpc } from '@/trpc'
import { FwbButton } from 'flowbite-vue'

async function reset() {
  await trpc.reset.mutate()
}
</script>

<template>
  <p>You can reset the database to it's default demo entries by clicking the button below</p>
  <FwbButton @click="reset">Reset</FwbButton>
</template>

<style scoped>
p {
  margin-top: 20vh;
  margin-bottom: 5vh;
}
</style>
