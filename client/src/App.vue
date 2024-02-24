<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { FwbButton, FwbHeading } from 'flowbite-vue'
import NavBar from '@/components/NavBar.vue'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <div class="head">
      <FwbHeading tag="h1">Ad List</FwbHeading>
      <div>
        <FwbButton size="sm" pill @click="toggleDark()">
          {{ isDark ? 'Dark' : 'Light' }}
        </FwbButton>
      </div>
    </div>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 10% 0;
  background-color: var(--background-color2);
}
</style>
