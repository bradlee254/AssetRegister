<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Search, Filter, Key, ShieldCheck, Calendar, AlertTriangle, MoreVertical, Edit2, Trash2, Loader2, RefreshCw } from 'lucide-vue-next'
import { LicenseService } from '../../services/license.service'
import { useToast } from '../../composables/useToast'
import LicenseModal from '../../components/LicenseModal.vue'

const licenses = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedLicense = ref<any>(null)
const { addToast } = useToast()

const fetchLicenses = async () => {
  isLoading.value = true
  try {
    const res = await LicenseService.getLicenses()
    licenses.value = res.data?.data || res.data || res || []
  } catch (error) {
    addToast('Failed to load licenses', 'error')
  } finally { isLoading.value = false }
}

const handleAction = async (formData: any) => {
  isSubmitting.value = true
  try {
    if (selectedLicense.value) {
      await LicenseService.updateLicense(selectedLicense.value.id, formData)
      addToast('License updated', 'success')
    } else {
      await LicenseService.createLicense(formData)
      addToast('License registered', 'success')
    }
    await fetchLicenses()
    isModalOpen.value = false
  } catch (error: any) {
    addToast(error.response?.data?.message || 'Action failed', 'error')
  } finally { isSubmitting.value = false }
}

const deleteLic = async (id: number) => {
  if (!confirm('Delete this license permanently?')) return
  try {
    await LicenseService.deleteLicense(id)
    addToast('License deleted', 'success')
    await fetchLicenses()
  } catch (error) { addToast('Delete failed', 'error') }
}

const getStatus = (renewalDate: string) => {
  const today = new Date()
  const expiry = new Date(renewalDate)
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return { label: 'Expired', class: 'bg-rose-50 text-rose-600 border-rose-200' }
  if (diffDays < 30) return { label: 'Expiring Soon', class: 'bg-amber-50 text-amber-600 border-amber-200' }
  return { label: 'Active', class: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
}

const totalCost = computed(() => licenses.value.reduce((sum, l) => sum + (Number(l.license_cost) || 0), 0))

onMounted(fetchLicenses)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Software Licenses</h1>
        <p class="text-slate-500 mt-1">Manage compliance and software costs</p>
      </div>
      <button @click="selectedLicense = null; isModalOpen = true" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" /> Register License
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
        <div class="p-3 bg-violet-50 rounded-xl text-violet-600"><Key class="w-6 h-6" /></div>
        <div><p class="text-sm font-medium text-slate-500">Active Licenses</p><p class="text-2xl font-bold">{{ licenses.length }}</p></div>
      </div>
      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
        <div class="p-3 bg-rose-50 rounded-xl text-rose-600"><AlertTriangle class="w-6 h-6" /></div>
        <div><p class="text-sm font-medium text-slate-500">Expiring Soon</p><p class="text-2xl font-bold">--</p></div>
      </div>
      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
        <div class="p-3 bg-emerald-50 rounded-xl text-emerald-600"><RefreshCw class="w-6 h-6" /></div>
        <div><p class="text-sm font-medium text-slate-500">Total Investment</p><p class="text-2xl font-bold">${{ totalCost.toLocaleString() }}</p></div>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div v-if="isLoading" class="p-20 flex flex-col items-center">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-slate-500">Loading licenses...</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left">
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Vendor & Key</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Seats</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Next Renewal</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Status</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="lic in licenses" :key="lic.id" class="hover:bg-slate-50 group transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-slate-100 rounded-lg text-slate-500"><ShieldCheck class="w-5 h-5" /></div>
                    <div>
                        <div class="text-sm font-bold text-slate-900">{{ lic.vendor }}</div>
                        <code class="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">{{ lic.license_key }}</code>
                    </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-semibold">{{ lic.licensed_seats }} Seats</td>
              <td class="px-6 py-4 text-sm text-slate-600">{{ lic.renewal_date }}</td>
              <td class="px-6 py-4">
                <span :class="getStatus(lic.renewal_date).class" class="px-2.5 py-1 rounded-lg text-xs font-bold border">
                  {{ getStatus(lic.renewal_date).label }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="selectedLicense = lic; isModalOpen = true" class="p-2 hover:bg-violet-50 text-slate-400 hover:text-violet-600 rounded-lg"><Edit2 class="w-4 h-4" /></button>
                  <button @click="deleteLic(lic.id)" class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 class="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <LicenseModal :is-open="isModalOpen" :loading="isSubmitting" :initial="selectedLicense" @close="isModalOpen = false" @submit="handleAction" />
  </div>
</template>