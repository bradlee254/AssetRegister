<script setup>
import { ref, watch } from 'vue'
import { X, Save, AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  type: 'Physical', // Physical or Soft
  description: '',
  depreciation_method: 'Straight Line',
  depreciation_rate: 0,
  renewal_cycle: 'Monthly'
})

const closeModal = () => emit('close')

const handleSubmit = () => {
  // Logic to filter payload based on type
  const payload = { ...form.value }
  if (form.value.type === 'Soft') {
    delete payload.depreciation_method
    delete payload.depreciation_rate
  } else {
    delete payload.renewal_cycle
  }
  emit('submit', payload)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>

    <div class="relative w-full max-w-lg bg-neutral-800 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/50">
        <h3 class="text-xl font-bold text-white">New Asset Category</h3>
        <button @click="closeModal" class="p-2 hover:bg-neutral-700 rounded-full text-neutral-400">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-neutral-400 mb-2">Category Name</label>
          <input v-model="form.name" type="text" required placeholder="e.g. Computing Devices" 
                 class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-white focus:ring-1 focus:ring-green-500 outline-none">
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-400 mb-2">Asset Type</label>
          <div class="grid grid-cols-2 gap-3">
            <button type="button" @click="form.type = 'Physical'"
                    :class="form.type === 'Physical' ? 'bg-green-600 border-green-500 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-400'"
                    class="py-2 border rounded-xl font-semibold transition-all">
              Physical
            </button>
            <button type="button" @click="form.type = 'Soft'"
                    :class="form.type === 'Soft' ? 'bg-green-600 border-green-500 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-400'"
                    class="py-2 border rounded-xl font-semibold transition-all">
              Soft Asset
            </button>
          </div>
        </div>

        <div v-if="form.type === 'Physical'" class="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 space-y-4">
          <div class="flex items-center gap-2 text-blue-400 mb-1">
            <AlertCircle class="w-4 h-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Depreciation Settings</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Method</label>
              <select v-model="form.depreciation_method" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-sm text-white">
                <option>Straight Line</option>
                <option>Reducing Balance</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-neutral-500 mb-1">Annual Rate (%)</label>
              <input v-model="form.depreciation_rate" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-sm text-white">
            </div>
          </div>
        </div>

        <div v-if="form.type === 'Soft'" class="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/20 space-y-4">
          <div class="flex items-center gap-2 text-purple-400 mb-1">
            <AlertCircle class="w-4 h-4" />
            <span class="text-xs font-bold uppercase tracking-wider">Subscription Policy</span>
          </div>
          <div>
            <label class="block text-xs text-neutral-500 mb-1">Default Renewal Cycle</label>
            <select v-model="form.renewal_cycle" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-sm text-white">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
          </div>
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