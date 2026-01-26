<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Save, Loader2, Tag, Layers, Clock, ShieldCheck, AlignLeft } from 'lucide-vue-next'

interface AssetTypeForm {
  name: string;
  category: string | null;
  description: string;
  expected_useful_life_months: number;
  warranty_period: number;
  is_active: boolean;
}

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  initial: { type: Object, default: null },
  categories: { type: Array as () => any[], default: () => [] }
})

const emit = defineEmits(['close', 'submit'])

const form = ref<AssetTypeForm>({
  name: '',
  category: null,
  description: '',
  expected_useful_life_months: 36,
  warranty_period: 12,
  is_active: true
})

watch(() => props.initial, (val) => {
  if (val) {
    form.value = { ...val }
  } else {
    form.value = { name: '', category: null, description: '', expected_useful_life_months: 36, warranty_period: 12, is_active: true }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-bold">
          {{ initial ? 'Edit Asset Type' : 'Create Asset Type' }}
        </h3>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Type Name</label>
          <div class="relative">
            <Tag class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input v-model="form.name" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500" placeholder="e.g. MacBook Pro 14">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Parent Category</label>
          <div class="relative">
            <Layers class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select v-model="form.category" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10 appearance-none">
              <option :value="null">Select a Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Useful Life (Months)</label>
            <div class="relative">
              <Clock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.expected_useful_life_months" type="number" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10">
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Warranty (Months)</label>
            <div class="relative">
              <ShieldCheck class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.warranty_period" type="number" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10">
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
          <textarea v-model="form.description" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10" placeholder="Details about this asset type..."></textarea>
        </div>

        <div class="flex items-center gap-2 pt-2">
          <input type="checkbox" v-model="form.is_active" id="type_active" class="w-4 h-4 text-violet-600 rounded">
          <label for="type_active" class="text-sm font-medium text-slate-700">Active Type</label>
        </div>

        <div class="pt-4 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>{{ loading ? 'Saving...' : 'Save Type' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>