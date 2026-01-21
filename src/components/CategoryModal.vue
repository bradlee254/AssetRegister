<script setup>
import { ref } from 'vue'
import { X, Save } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  description: '',
  is_active: true
})

const closeModal = () => {
  form.value = { name: '', description: '', is_active: true }
  emit('close')
}

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>

    <div class="relative w-full max-w-lg bg-neutral-800 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/50">
        <h3 class="text-xl font-bold text-white">Create New Category</h3>
        <button @click="closeModal" class="p-2 hover:bg-neutral-700 rounded-full text-neutral-400">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-neutral-400 mb-2">Category Name</label>
          <input v-model="form.name" type="text" required placeholder="e.g. Computing Hardware" 
                 class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:ring-1 focus:ring-green-500 outline-none">
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-400 mb-2">Description</label>
          <textarea v-model="form.description" rows="3" placeholder="Describe the type of assets in this category..."
                 class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:ring-1 focus:ring-green-500 outline-none"></textarea>
        </div>

        <div class="flex items-center justify-between p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700">
          <div>
            <span class="block text-sm font-medium text-white">Active Status</span>
            <span class="text-xs text-neutral-500">Enable this category for asset registration</span>
          </div>
          <button type="button" 
                  @click="form.is_active = !form.is_active"
                  :class="form.is_active ? 'bg-green-600' : 'bg-neutral-700'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none">
            <span :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
          </button>
        </div>

        <div class="pt-4">
          <button type="submit" 
                  class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20">
            <Save class="w-5 h-5" />
            Save Category
          </button>
        </div>
      </form>
    </div>
  </div>
</template>