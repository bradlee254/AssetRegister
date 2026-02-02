<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  History, Search, Filter, Trash2,
  Loader2, Eye, ShieldAlert, User,
  Clock, Database, ArrowRight, X
} from 'lucide-vue-next'
import { AuditService } from '../../services/auditLogs.service.ts'
import { useToast } from '../../composables/useToast'

const logs = ref<any[]>([])
const isLoading = ref(false)
const searchQuery = ref('')
const selectedAction = ref('')
const selectedLog = ref<any>(null)
const isDetailModalOpen = ref(false)

const { addToast } = useToast()

const fetchLogs = async () => {
  isLoading.value = true
  try {
    const res = await AuditService.listAuditLogs()
    logs.value = res.data?.data || res.data || res || []
  } catch (error) {
    addToast('Failed to load audit security logs', 'error')
  } finally {
    isLoading.value = false
  }
}

const openDetails = (log: any) => {
  selectedLog.value = log
  isDetailModalOpen.value = true
}

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this log entry? This is usually not recommended for compliance.')) return
  try {
    await AuditService.deleteAuditLog(id)
    addToast('Log entry removed', 'success')
    fetchLogs()
  } catch (error) {
    addToast('Action denied', 'error')
  }
}

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const matchesSearch = !searchQuery.value ||
        log.user?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        log.event?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        log.auditable_type?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesAction = !selectedAction.value || log.event === selectedAction.value
    return matchesSearch && matchesAction
  })
})

const getEventColor = (event: string) => {
  const e = event.toLowerCase()
  if (e.includes('created')) return 'text-emerald-600 bg-emerald-50 border-emerald-100'
  if (e.includes('updated')) return 'text-amber-600 bg-amber-50 border-amber-100'
  if (e.includes('deleted')) return 'text-rose-600 bg-rose-50 border-rose-100'
  return 'text-blue-600 bg-blue-50 border-blue-100'
}

onMounted(fetchLogs)
</script>

<template>
  <div class="space-y-6 max-w-[1400px] mx-auto p-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-slate-900 flex items-center gap-3">
          <ShieldAlert class="w-8 h-8 text-violet-600" />
          System Audit Logs
        </h1>
        <p class="text-slate-500 mt-1">Track every change and user interaction within the system</p>
      </div>
      <button @click="fetchLogs" class="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
        <History class="w-5 h-5 text-slate-600" :class="{ 'animate-spin': isLoading }" />
      </button>
    </div>

    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input v-model="searchQuery" type="text" placeholder="Search by user, event, or resource..."
               class="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-violet-500/20 outline-none">
      </div>
      <select v-model="selectedAction" class="bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-violet-500/20 outline-none">
        <option value="">All Events</option>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
        <option value="deleted">Deleted</option>
      </select>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div v-if="isLoading" class="py-20 flex flex-col items-center">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600" />
        <p class="mt-4 text-slate-500 font-medium">Fetching secure records...</p>
      </div>

      <table v-else class="w-full text-left border-collapse">
        <thead>
        <tr class="bg-slate-50/50 border-b border-slate-100">
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Event</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Resource</th>
          <th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
        <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-slate-50/50 transition-colors group">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <Clock class="w-4 h-4 text-slate-400" />
              {{ new Date(log.created_at).toLocaleString() }}
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <User class="w-4 h-4 text-slate-500" />
              </div>
              <span class="text-sm font-bold text-slate-900">{{ log.user?.name || 'System' }}</span>
            </div>
          </td>
          <td class="px-6 py-4">
              <span :class="getEventColor(log.event)" class="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border">
                {{ log.event }}
              </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2 text-sm text-slate-700">
              <Database class="w-4 h-4 text-slate-400" />
              {{ log.auditable_type.split('\\').pop() }}
              <span class="text-slate-400 font-mono text-xs">#{{ log.auditable_id }}</span>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex justify-end gap-2">
              <button @click="openDetails(log)" class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-violet-600 border border-transparent hover:border-slate-200 transition-all shadow-sm">
                <Eye class="w-4 h-4" />
              </button>
              <button @click="handleDelete(log.id)" class="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-rose-600 border border-transparent hover:border-slate-200 transition-all shadow-sm">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isDetailModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isDetailModalOpen = false"></div>
      <div class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 class="font-bold text-slate-900">Log Entry Details</h3>
          <button @click="isDetailModalOpen = false"><X class="w-5 h-5 text-slate-400" /></button>
        </div>
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="p-3 bg-slate-50 rounded-xl"><p class="text-xs text-slate-500 font-bold mb-1">USER IP</p>{{ selectedLog.ip_address || 'N/A' }}</div>
            <div class="p-3 bg-slate-50 rounded-xl"><p class="text-xs text-slate-500 font-bold mb-1">USER AGENT</p>{{ selectedLog.user_agent?.substring(0, 30) }}...</div>
          </div>

          <div>
            <p class="text-xs text-slate-500 font-bold mb-2 uppercase">Changes Preview</p>
            <div class="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre class="text-emerald-400 text-xs font-mono">{{ JSON.stringify(selectedLog.old_values, null, 2) }} <ArrowRight class="inline w-3 h-3 text-white mx-2" /> {{ JSON.stringify(selectedLog.new_values, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>