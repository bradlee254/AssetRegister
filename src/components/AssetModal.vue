<script setup>
import { ref } from 'vue'
import { X, Save } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  serial_number: '',
  asset_type_id: null,
  category_id: null,
  location_id: null,
  department_id: null,
  depreciation_method_id: null,
  purchase_date: new Date().toISOString().split('T')[0],
  purchase_cost: 0,
  useful_life_years: 5,
  status: 'active',
  description: '',
  notes: ''
})

const closeModal = () => emit('close')
const handleSubmit = () => emit('submit', { ...form.value })
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>

    <div class="relative w-full max-w-3xl bg-neutral-800 border border-neutral-700 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 z-10 px-6 py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/90 backdrop-blur-md">
        <h3 class="text-xl font-bold text-white">Register Asset (Manual Entry)</h3>
        <button @click="closeModal" class="p-2 hover:bg-neutral-700 rounded-full text-neutral-400"><X class="w-5 h-5" /></button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-400 mb-1">Asset Name</label>
            <input v-model="form.name" type="text" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500" placeholder="e.g. MacBook Pro">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Serial Number</label>
            <input v-model="form.serial_number" type="text" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500" placeholder="SN-12345">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Status (Text)</label>
            <input v-model="form.status" type="text" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500" placeholder="active">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700">
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Type ID</label>
            <input v-model="form.asset_type_id" type="number" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white outline-none focus:border-green-500" placeholder="1">
          </div>
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Category ID</label>
            <input v-model="form.category_id" type="number" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white outline-none focus:border-green-500" placeholder="1">
          </div>
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Dept ID</label>
            <input v-model="form.department_id" type="number" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white outline-none focus:border-green-500" placeholder="1">
          </div>
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Loc ID</label>
            <input v-model="form.location_id" type="number" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white outline-none focus:border-green-500" placeholder="1">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-400 mb-1">Purchase Date</label>
            <input v-model="form.purchase_date" type="date" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Cost</label>
            <input v-model="form.purchase_cost" type="number" step="0.01" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Life (Years)</label>
            <input v-model="form.useful_life_years" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Depreciation Method ID</label>
            <input v-model="form.depreciation_method_id" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500" placeholder="1">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Notes</label>
            <input v-model="form.notes" type="text" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500" placeholder="Any extra info">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-400 mb-1">Description</label>
          <textarea v-model="form.description" rows="2" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500"></textarea>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-xl font-bold hover:bg-neutral-600 transition-all">Cancel</button>
          <button type="submit" class="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-600/20">Save Asset</button>
        </div>
      </form>
    </div>
  </div>
</template>