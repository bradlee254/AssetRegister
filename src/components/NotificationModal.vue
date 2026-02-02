<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Bell, Mail, Clock, Users, FileText, CheckCircle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  initial: { type: Object, default: null }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  notifiable_type: 'Asset',
  notifiable_id: 1, // Usually tied to a specific model or category
  event_type: 'warranty_expiry',
  notification_type: 'email',
  days_before: 7,
  is_active: true,
  recipients: [] as number[],
  message_template: 'Reminder: The warranty for {asset_name} is expiring in {days} days.'
})

watch(() => props.initial, (val) => {
  if (val) form.value = { ...val }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      <div class="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
        <h3 class="font-bold text-slate-900">Configure Alert Schedule</h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors"><X class="w-5 h-5" /></button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Trigger Event</label>
            <select v-model="form.event_type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500">
              <option value="warranty_expiry">Warranty Expiry</option>
              <option value="maintenance_due">Maintenance Due</option>
              <option value="license_renewal">License Renewal</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Channel</label>
            <select v-model="form.notification_type" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500">
              <option value="email">Email</option>
              <option value="system">In-App Notification</option>
              <option value="sms">SMS</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Days Before Event</label>
            <div class="relative">
              <Clock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model.number="form.days_before" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500">
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Recipient Group</label>
            <div class="relative">
              <Users class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input v-model.number="form.recipients" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-violet-500">
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1">Message Template</label>
          <textarea v-model="form.message_template" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 text-sm" placeholder="Use tags like {asset_name}..."></textarea>
          <p class="text-[10px] text-slate-400 mt-1 italic">Available tags: {asset_name}, {days}, {serial_number}</p>
        </div>

        <div class="flex items-center gap-2 py-2">
          <input type="checkbox" v-model="form.is_active" id="notif_active" class="w-4 h-4 text-violet-600 rounded">
          <label for="notif_active" class="text-sm font-medium text-slate-700">Enable this schedule</label>
        </div>

        <div class="pt-4 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
            <span v-if="loading" class="animate-spin"><Loader2 /></span>
            Save Schedule
          </button>
        </div>
      </form>
    </div>
  </div>
</template>