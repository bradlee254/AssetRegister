<script setup>
import { ref } from 'vue'
import { X, Save, Info } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  // These should be fetched from your other services
  categories: Array,
  assetTypes: Array,
  locations: Array,
  departments: Array,
  depreciationMethods: Array
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
        <h3 class="text-xl font-bold text-white">Register Asset</h3>
        <button @click="closeModal" class="p-2 hover:bg-neutral-700 rounded-full text-neutral-400"><X class="w-5 h-5" /></button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-400 mb-1">Asset Name</label>
            <input v-model="form.name" type="text" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Serial Number</label>
            <input v-model="form.serial_number" type="text" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Status</label>
            <select v-model="form.status" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700">
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Type</label>
            <select v-model="form.asset_type_id" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white">
              <option v-for="t in assetTypes" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Category</label>
            <select v-model="form.category_id" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white">
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-neutral-500 mb-1 uppercase">Department</label>
            <select v-model="form.department_id" required class="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm text-white">
              <option v-for="d in departments" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-400 mb-1">Purchase Date</label>
            <input v-model="form.purchase_date" type="date" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Cost</label>
            <input v-model="form.purchase_cost" type="number" step="0.01" required class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Life (Years)</label>
            <input v-model="form.useful_life_years" type="number" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none">
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-400 mb-1">Description</label>
            <textarea v-model="form.description" rows="2" class="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-white outline-none"></textarea>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-xl font-bold hover:bg-neutral-600 transition-all">Cancel</button>
          <button type="submit" class="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-600/20">Save Asset</button>
        </div>
      </form>
    </div>
  </div>
</template>