<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Tag, Edit2, Trash2, Loader2, Info, Search } from 'lucide-vue-next'
import { AssetTypesService } from '../../services/assetTypes.service'
import { CategoryService } from '../../services/category.service'
import { useToast } from '../../composables/useToast'
import AssetTypeModal from '../../components/AssetTypeModal.vue'

const types = ref<any[]>([])
const categories = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedType = ref<any>(null)
const searchQuery = ref('')
const { addToast } = useToast()

const fetchData = async () => {
  isLoading.value = true
  try {
    const [typesRes, catsRes] = await Promise.all([
      AssetTypesService.getAssetTypes(),
      CategoryService.listCategories()
    ])
    types.value = typesRes.data?.data || typesRes.data || typesRes || []
    categories.value = catsRes.data?.data || catsRes.data || catsRes || []
  } catch (error) {
    addToast('Failed to load asset types', 'error')
  } finally {
    isLoading.value = false
  }
}

const handleAction = async (formData: any) => {
  isSubmitting.value = true
  const payload ={
    ...formData, 
    category: String(formData.category)
  }
  try {
    if (selectedType.value) {
      await AssetTypesService.updateAssetType(selectedType.value.id, payload)
      addToast('Type updated successfully', 'success')
    } else {
      await AssetTypesService.createAssetType(payload)
      addToast('New asset type registered', 'success')
    }
    await fetchData()
    isModalOpen.value = false
  } catch (error: any) {
    addToast(error.response?.data?.message || 'Action failed', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteType = async (id: number) => {
  if (!confirm('Permanently delete this asset type?')) return
  try {
    await AssetTypesService.deleteAssetType(id)
    addToast('Type deleted', 'success')
    await fetchData()
  } catch (error) {
    addToast('Cannot delete: Type may be in use by existing assets', 'error')
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Asset Types</h1>
        <p class="text-slate-500 mt-1">Define hardware models and lifecycle configurations</p>
      </div>
      <button @click="selectedType = null; isModalOpen = true" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" /> Add New Type
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div v-if="isLoading" class="p-20 flex flex-col items-center">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-slate-500">Loading catalog...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-slate-900">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left">
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Asset Type</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Useful Life</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Warranty</th>
              <th class="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Status</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="type in types" :key="type.id" class="hover:bg-slate-50 group transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-violet-50 rounded-lg text-violet-600"><Tag class="w-5 h-5" /></div>
                  <div>
                    <p class="text-sm font-bold">{{ type.name }}</p>
                    <p class="text-xs text-slate-500">{{ type.description || 'No description' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-slate-700">{{ type.expected_useful_life_months }} Months</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-slate-700">{{ type.warranty_period }} Months</span>
              </td>
              <td class="px-6 py-4">
                <span :class="type.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'" class="px-2.5 py-1 rounded-lg text-xs font-bold border">
                  {{ type.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="selectedType = type; isModalOpen = true" class="p-2 hover:bg-violet-50 text-slate-400 hover:text-violet-600 rounded-lg"><Edit2 class="w-4 h-4" /></button>
                  <button @click="deleteType(type.id)" class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 class="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AssetTypeModal 
      :is-open="isModalOpen" 
      :loading="isSubmitting" 
      :initial="selectedType" 
      :categories="categories"
      @close="isModalOpen = false" 
      @submit="handleAction" 
    />
  </div>
</template>