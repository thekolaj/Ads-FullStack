<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { FwbButton } from 'flowbite-vue'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <FwbButton size="sm" pill @click="toggleDark()">
      {{ isDark ? 'Dark' : 'Light' }}
    </FwbButton>
  </header>
  <main>
    <RouterView />
  </main>
</template>
