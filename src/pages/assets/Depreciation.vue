<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Calculator, Edit2, Trash2, Loader2, Info, TrendingDown, CheckCircle2, XCircle } from 'lucide-vue-next'
import { DepreciationService } from '../../services/depreciation.service'
import { useToast } from '../../composables/useToast'
import DepreciationModal from '../../components/DepreciationModal.vue'

const methods = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedMethod = ref<any>(null)
const { addToast } = useToast()

const fetchMethods = async () => {
  isLoading.value = true
  try {
    const res = await DepreciationService.listDepreciations()
    methods.value = res.data?.data || res.data || res || []
  } catch (error) {
    addToast('Failed to load depreciation methods', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleAction = async (formData: any) => {
  isSubmitting.value = true
  try {
    if (selectedMethod.value) {
      await DepreciationService.updateDepreciation(selectedMethod.value.id, formData)
      addToast('Method updated successfully', 'success')
    } else {
      await DepreciationService.createDepreciation(formData)
      addToast('New method created', 'success')
    }
    await fetchMethods()
    isModalOpen.value = false
  } catch (error: any) {
    addToast(error.response?.data?.message || 'Error saving data', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteMethod = async (id: number) => {
  if (!confirm('Are you sure? Assets using this method may be affected.')) return
  try {
    await DepreciationService.deleteDepreciation(id)
    addToast('Method removed', 'success')
    await fetchMethods()
  } catch (error) {
    addToast('Error: This method is likely linked to existing assets.', 'error')
  }
}

onMounted(fetchMethods)

const formatType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Depreciation Methods</h1>
        <p class="text-slate-500 mt-1">Configure how asset value diminishes over time</p>
      </div>
      <button @click="selectedMethod = null; isModalOpen = true" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" />
        Add Method
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div v-if="isLoading" class="p-20 flex flex-col items-center">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-slate-500 font-medium text-lg">Loading financial models...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Method Name</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Type</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Annual Rate</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Useful Life</th>
              <th class="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="method in methods" :key="method.id" class="hover:bg-slate-50/50 group transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-violet-50 rounded-lg">
                    <TrendingDown class="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">{{ method.name }}</p>
                    <p class="text-xs text-slate-500 truncate max-w-[200px]">{{ method.description || 'No description provided' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  {{ formatType(method.type) }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-bold text-violet-600">{{ method.rate }}%</span>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-sm font-semibold text-slate-600">{{ method.useful_life_years }} Years</span>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center">
                  <CheckCircle2 v-if="method.is_active" class="w-5 h-5 text-emerald-500" />
                  <XCircle v-else class="w-5 h-5 text-slate-300" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="selectedMethod = method; isModalOpen = true" class="p-2 hover:bg-violet-50 rounded-lg text-slate-400 hover:text-violet-600" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteMethod(method.id)" class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600" title="Delete">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <DepreciationModal 
      :is-open="isModalOpen" 
      :loading="isSubmitting" 
      :initial="selectedMethod" 
      @close="isModalOpen = false" 
      @submit="handleAction"
    />
  </div>
</template>