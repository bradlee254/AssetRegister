<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Save, Loader2, Building2, Hash, AlignLeft, User } from 'lucide-vue-next'

interface DepartmentForm {
  name: string;
  code: string;
  description: string;
  manager_id: number | null;
  is_active: boolean;
}

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  initial: { type: Object, default: null },
  users: { type: Array as () => any[], default: () => [] } // For manager selection
})

const emit = defineEmits(['close', 'submit'])

const form = ref<DepartmentForm>({
  name: '',
  code: '',
  description: '',
  manager_id: null,
  is_active: true
})

watch(() => props.initial, (val) => {
  if (val) {
    form.value = { ...val }
  } else {
    form.value = { name: '', code: '', description: '', manager_id: null, is_active: true }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-bold text-slate-900">
          {{ initial ? 'Edit Department' : 'Add New Department' }}
        </h3>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-200 rounded-full text-slate-400">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-slate-700 mb-1">Department Name</label>
            <div class="relative">
              <Building2 class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.name" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500 transition-all" placeholder="e.g. Information Technology">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Dept Code</label>
            <div class="relative">
              <Hash class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model="form.code" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500" placeholder="IT-001">
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Manager</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select v-model="form.manager_id" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500 appearance-none">
                <option :value="null">Select Manager</option>
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Description</label>
          <textarea v-model="form.description" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500" placeholder="Purpose and function of this department..."></textarea>
        </div>

        <div class="flex items-center gap-2 py-2">
          <input type="checkbox" v-model="form.is_active" id="dept_active" class="w-4 h-4 text-violet-600 rounded">
          <label for="dept_active" class="text-sm font-medium text-slate-700">Department is active</label>
        </div>

        <div class="pt-2 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>{{ loading ? 'Saving...' : 'Save Department' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>