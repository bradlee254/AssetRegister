<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Bell, Mail, Clock, Edit2, Trash2, Loader2, AlertTriangle } from 'lucide-vue-next'
import { notificationService } from '../../services/notification.service.ts'
import { useToast } from '../../composables/useToast'
import NotificationModal from '../../components/NotificationModal.vue'

const schedules = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedSchedule = ref(null)
const { addToast } = useToast()

const fetchSchedules = async () => {
  isLoading.value = true
  try {
    const res = await notificationService.listNotifications()
    schedules.value = res.data?.data || res.data || res || []
  } catch (error) {
    addToast('Failed to load schedules', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleAction = async (formData: any) => {
  isSubmitting.value = true
  try {
    if (selectedSchedule.value) {
      await notificationService.updateNotification(selectedSchedule.value.id, formData)
      addToast('Schedule updated', 'success')
    } else {
      await notificationService.createNotification(formData)
      addToast('New schedule created', 'success')
    }
    fetchSchedules()
    isModalOpen.value = false
  } catch (error) {
    addToast('Error saving schedule', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteSchedule = async (id: number) => {
  if (!confirm('Stop these notifications?')) return
  try {
    await notificationService.deleteNotification(id)
    addToast('Schedule removed', 'success')
    fetchSchedules()
  } catch (error) {
    addToast('Delete failed', 'error')
  }
}

onMounted(fetchSchedules)

const formatEvent = (event: string) => event.replace(/_/g, ' ').toUpperCase()
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-black text-slate-900">Notification Center</h1>
        <p class="text-slate-500">Automate alerts for lifecycles and maintenance</p>
      </div>
      <button @click="selectedSchedule = null; isModalOpen = true" class="bg-violet-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-200">
        <Plus class="w-5 h-5" /> New Alert
      </button>
    </div>

    <div v-if="isLoading" class="py-20 flex justify-center"><Loader2 class="animate-spin text-violet-600" /></div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in schedules" :key="item.id" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div :class="item.is_active ? 'bg-emerald-500' : 'bg-slate-300'" class="absolute top-0 left-0 w-full h-1"></div>

        <div class="flex justify-between items-start mb-4">
          <div class="p-3 rounded-xl" :class="item.notification_type === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'">
            <Mail v-if="item.notification_type === 'email'" class="w-6 h-6" />
            <Bell v-else class="w-6 h-6" />
          </div>
          <div class="flex gap-1">
            <button @click="selectedSchedule = item; isModalOpen = true" class="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Edit2 class="w-4 h-4" /></button>
            <button @click="deleteSchedule(item.id)" class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600"><Trash2 class="w-4 h-4" /></button>
          </div>
        </div>

        <h3 class="font-black text-slate-900 mb-1">{{ formatEvent(item.event_type) }}</h3>
        <p class="text-sm text-slate-500 mb-4 line-clamp-2">"{{ item.message_template }}"</p>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
          <div class="flex items-center gap-2 text-slate-600">
            <Clock class="w-4 h-4" />
            <span class="text-xs font-bold">{{ item.days_before }} Days Before</span>
          </div>
          <span :class="item.is_active ? 'text-emerald-600' : 'text-slate-400'" class="text-[10px] font-black uppercase tracking-widest">
            {{ item.is_active ? 'Enabled' : 'Paused' }}
          </span>
        </div>
      </div>
    </div>

    <NotificationModal :is-open="isModalOpen" :loading="isSubmitting" :initial="selectedSchedule" @close="isModalOpen = false" @submit="handleAction" />
  </div>
</template>