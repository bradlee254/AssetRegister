<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Save, Loader2, Key, Building2, Calendar, CreditCard, Users, ShieldCheck } from 'lucide-vue-next'

interface LicenseForm {
  asset_id: number | null;
  license_key: string;
  vendor: string;
  purchase_date: string;
  renewal_date: string;
  renewal_cycle: string;
  renewal_cost: number;
  license_cost: number;
  licensed_seats: number;
  support_level: string;
  auto_renew: boolean;
  terms: string;
}

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  initial: { type: Object, default: null }
})

const emit = defineEmits(['close', 'submit'])

const form = ref<LicenseForm>({
  asset_id: null,
  license_key: '',
  vendor: '',
  purchase_date: '',
  renewal_date: '',
  renewal_cycle: 'yearly',
  renewal_cost: 0,
  license_cost: 0,
  licensed_seats: 1,
  support_level: 'standard',
  auto_renew: false,
  terms: ''
})

watch(() => props.initial, (val) => {
  if (val) form.value = { ...val }
  else {
    form.value = { asset_id: null, license_key: '', vendor: '', purchase_date: '', renewal_date: '', renewal_cycle: 'yearly', renewal_cost: 0, license_cost: 0, licensed_seats: 1, support_level: 'standard', auto_renew: false, terms: '' }
  }
}, { immediate: true })

const handleSubmit = () => emit('submit', { ...form.value })
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
      
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-bold text-slate-900">{{ initial ? 'Update License' : 'Register New License' }}</h3>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X class="w-5 h-5" /></button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto max-h-[80vh]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Vendor Name</label>
            <div class="relative">
              <Building2 class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.vendor" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500" placeholder="e.g. Microsoft">
            </div>
          </div>

          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">License Key / Serial</label>
            <div class="relative">
              <Key class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.license_key" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500" placeholder="XXXX-XXXX-XXXX">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Purchase Date</label>
            <input v-model="form.purchase_date" type="date" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Renewal Date</label>
            <input v-model="form.renewal_date" type="date" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Initial Cost</label>
            <div class="relative">
              <CreditCard class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.license_cost" type="number" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Seats Available</label>
            <div class="relative">
              <Users class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.licensed_seats" type="number" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500">
            </div>
          </div>
        </div>

        <div class="bg-violet-50/50 p-4 rounded-xl border border-violet-100 mb-4 grid grid-cols-2 gap-4">
            <div class="flex items-center gap-3">
                <input type="checkbox" v-model="form.auto_renew" id="auto_renew" class="w-4 h-4 text-violet-600 rounded">
                <label for="auto_renew" class="text-sm font-semibold text-slate-700">Auto-Renewal</label>
            </div>
            <div>
                <select v-model="form.renewal_cycle" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="perpetual">Perpetual</option>
                </select>
            </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button type="button" @click="$emit('close')" class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>Save License</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>