<script setup>
import { ref } from 'vue'
import { X, Save, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  categories: Array
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  serial_number: '',
  category_id: '',
  status: 'active',
  purchase_date: new Date().toISOString().split('T')[0],
  purchase_cost: 0,
  useful_life_years: 5,
  description: ''
})

const closeModal = () => {
  // Optional: Reset form here
  emit('close')
}

const handleSubmit = () => {
  // Ensure we send numbers to the API
  const payload = {
    ...form.value,
    category_id: parseInt(form.value.category_id),
    purchase_cost: parseFloat(form.value.purchase_cost)
  }
  emit('submit', payload)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>

    <div class="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-bold text-slate-900">Add New Asset</h3>
        <button @click="closeModal" class="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Asset Name</label>
            <input v-model="form.name" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all" placeholder="e.g. MacBook Pro M3">
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Category</label>
            <select v-model="form.category_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500">
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Serial Number</label>
            <input v-model="form.serial_number" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500" placeholder="SN-123456789">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Purchase Date</label>
            <input v-model="form.purchase_date" type="date" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Cost ($)</label>
            <input v-model="form.purchase_cost" type="number" step="0.01" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Useful Life (Yrs)</label>
            <input v-model="form.useful_life_years" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
          <textarea v-model="form.description" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500" placeholder="Add technical details or specifications..."></textarea>
        </div>

        <div class="flex gap-3 pt-4 border-t border-slate-100">
          <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 disabled:opacity-70 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>{{ loading ? 'Saving...' : 'Register Asset' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>