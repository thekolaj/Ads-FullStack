<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { trpc } from '@/trpc'
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'
import useErrorMessage from '@/composables/useErrorMessage'
import PageForm from '@/components/PageForm.vue'
import CategoryBadges from '@/components/CategoryBadges.vue'
import AlertError from '@/components/AlertError.vue'
import type { AdUpsert } from '@mono/server/src/shared/entities'

const ad = defineModel<AdUpsert>({ required: true })
const props = defineProps<{
  heading: string
  label: string
  submitFunction: () => void
}>()

const categories = ref<Awaited<ReturnType<typeof trpc.category.list.query>>>([])
onBeforeMount(async () => {
  categories.value = await trpc.category.list.query()
})

function addImage() {
  ad.value.images.push({ url: '' })
}

function removeImage() {
  ad.value.images.pop()
}

const [submit, errorMessage] = useErrorMessage(props.submitFunction)
</script>

<template>
  <PageForm :heading="heading" :formLabel="label" @submit="submit">
    <template #default>
      <FwbInput
        class="mb-2.5"
        label="Title"
        data-testid="titleInput"
        type="text"
        maxlength="64"
        v-model="ad.title"
        :required="true"
      />

      <FwbTextarea
        label="Text"
        data-testid="textInput"
        maxlength="999"
        v-model="ad.text"
        :required="true"
      />

      <!-- @vue-ignore -->
      <FwbInput
        label="Price"
        data-testid="priceInput"
        type="number"
        min="0"
        step="0.01"
        v-model.number="ad.price"
      />

      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Image URLs
      </label>
      <FwbInput
        v-for="(image, i) in ad.images"
        :key="i"
        :data-testid="`image-${i}`"
        class="mt-1"
        type="text"
        v-model="image.url"
        :required="true"
      />
      <div class="flex justify-center">
        <fwb-button class="smallBtn" size="xs" @click.prevent="removeImage" color="red">
          -
        </fwb-button>
        <fwb-button class="smallBtn" size="xs" @click.prevent="addImage" color="green">
          +
        </fwb-button>
      </div>

      <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Categories
        <div class="hint">Hold Ctrl to select multiple</div>
        <CategoryBadges :categories="ad.categories"></CategoryBadges>
      </label>
      <select v-model="ad.categories" multiple size="10">
        <option v-for="category in categories" :key="category.id" :value="category">
          {{ category.title }}
        </option>
      </select>

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

<style scoped>
select {
  color: var(--text-color);
  background: var(--background-color);
}

.hint {
  font-style: italic;
  opacity: 0.5;
  margin: 0;
}

.smallBtn {
  margin: 5px;
}
</style>
