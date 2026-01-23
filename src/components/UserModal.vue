<script setup>
import { ref, watch } from 'vue'
import { X, Save, Loader2, User, Mail, Lock } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  initial: { type: Object, default: null }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  email: '',
  password: ''
})

watch(() => props.initial, (val) => {
  if (val) {
    form.value = {
      name: val.name || '',
      email: val.email || '',
      password: '' // Keep password empty when editing
    }
  } else {
    form.value = { name: '', email: '', password: '' }
  }
}, { immediate: true })

const closeModal = () => emit('close')

const handleSubmit = () => {
  const payload = { ...form.value }
  // If editing and password is empty, remove it from payload
  if (props.initial && !payload.password) {
    delete payload.password
  }
  emit('submit', payload)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>

    <div class="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 class="text-xl font-bold text-slate-900">
          {{ initial ? 'Edit User' : 'Add New User' }}
        </h3>
        <button @click="closeModal" class="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
          <div class="relative">
            <User class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input v-model="form.name" type="text" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500" placeholder="John Doe">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input v-model="form.email" type="email" required class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500" placeholder="john@company.com">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">
            {{ initial ? 'New Password (leave blank to keep current)' : 'Password' }}
          </label>
          <div class="relative">
            <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input v-model="form.password" type="password" :required="!initial" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-500" placeholder="••••••••">
          </div>
        </div>

        <div class="pt-2 flex gap-3">
          <button type="button" @click="closeModal" class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all">
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2">
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>{{ loading ? 'Saving...' : 'Save User' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>