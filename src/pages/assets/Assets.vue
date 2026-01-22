<script setup>
import { ref, onMounted, computed } from 'vue'
import { 
  Plus, Search, Filter, HardDrive, 
  MoreHorizontal, Loader2, AlertCircle,
  Edit2, Trash2, History, Download,
  ChevronDown
} from 'lucide-vue-next'
import { AssetService } from '../../services/asset.service'
import { CategoryService } from '../../services/category.service' // Import Category Service
import AssetModal from '../../components/AssetModal.vue'

// State Management
const assets = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false) // Added for loading states
const isModalOpen = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedAsset = ref(null) // Track asset being edited

// Dropdown Data - Initially empty, populated from API
const categories = ref([])
const assetTypes = ref([
  { id: 1, name: 'Hardware' }, 
  { id: 2, name: 'Software/License' }
])
const locations = ref([
  { id: 1, name: 'Head Office' }, 
  { id: 2, name: 'Warehouse' }
])
const departments = ref([
  { id: 1, name: 'IT' }, 
  { id: 2, name: 'Finance' }, 
  { id: 3, name: 'HR' }
])
const depreciationMethods = ref([
  { id: 1, name: 'Straight Line' }, 
  { id: 2, name: 'Reducing Balance' }
])

// Fetch Data
const fetchInitialData = async () => {
  isLoading.value = true
  try {
    // Run both requests in parallel
    const [assetRes, catRes] = await Promise.all([
      AssetService.getAssets(),
      CategoryService.listCategories()
    ])
    
    // Handle Asset Response
    assets.value = Array.isArray(assetRes) ? assetRes : assetRes.data || []
    
    // Handle Category Response
    if (Array.isArray(catRes)) {
      categories.value = catRes;
    } else {
      categories.value = catRes.data?.data || catRes.data || [];
    }
  } catch (error) {
    console.error("Failed to load data:", error)
  } finally {
    isLoading.value = false
  }
}

// Modal Triggers
const openCreateModal = () => {
  selectedAsset.value = null
  isModalOpen.value = true
}

const openEditModal = (asset) => {
  selectedAsset.value = { ...asset }
  isModalOpen.value = true
}

// Handle Form Submission (Create and Update)
const handleAssetSubmit = async (formData) => {
  isSubmitting.value = true
  try {
    if (selectedAsset.value) {
      // Update logic
      await AssetService.updateAsset(selectedAsset.value.id, formData)
    } else {
      // Create logic
      await AssetService.createAsset(formData)
    }
    isModalOpen.value = false
    await fetchInitialData() // Refresh list
  } catch (error) {
    alert("Operation failed: " + (error.response?.data?.message || error.message))
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this asset?')) {
    try {
      await AssetService.deleteAsset(id)
      await fetchInitialData()
    } catch (error) {
      console.error("Delete failed", error)
    }
  }
}

// Filter Logic
const filteredAssets = computed(() => {
  let filtered = assets.value

  if (searchQuery.value) {
    filtered = filtered.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      asset.serial_number?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(asset => asset.category_id == selectedCategory.value)
  }

  return filtered
})

// Stats computation
const stats = computed(() => ({
  total: assets.value.length,
  active: assets.value.filter(a => a.status === 'active').length,
  maintenance: assets.value.filter(a => a.status === 'maintenance').length,
  totalValue: assets.value.reduce((sum, a) => sum + Number(a.purchase_cost || 0), 0)
}))

onMounted(fetchInitialData)
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Asset Inventory</h1>
        <p class="text-slate-500 mt-1">Manage and track organizational assets and their lifecycles</p>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2">
          <Download class="w-4 h-4" />
          Export
        </button>
        <button 
          @click="openCreateModal"
          class="px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40 flex items-center gap-2"
        >
          <Plus class="w-5 h-5" />
          Add New Asset
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-violet-50 rounded-lg">
            <HardDrive class="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Assets</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-emerald-50 rounded-lg">
            <HardDrive class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-amber-50 rounded-lg">
            <HardDrive class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Maintenance</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.maintenance }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-cyan-50 rounded-lg">
            <HardDrive class="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Value</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">${{ stats.totalValue.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div class="relative flex-1 lg:max-w-md">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by name or serial number..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
          >
        </div>
        
        <div class="flex items-center gap-3">
          <div class="relative">
            <select 
              v-model="selectedCategory"
              class="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          
          <button class="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all">
            <Filter class="w-4 h-4" />
            <span class="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-sm font-medium">Loading asset registry...</p>
      </div>

      <div v-else-if="filteredAssets.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-500">
        <div class="p-4 bg-slate-100 rounded-full mb-4">
          <AlertCircle class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-sm font-medium text-slate-900 mb-1">No assets found</p>
        <p class="text-sm text-slate-500">Try adjusting your search or add a new asset</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Asset Info</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Serial No</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Purchase Date</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Cost</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr 
              v-for="asset in filteredAssets" 
              :key="asset.id" 
              class="hover:bg-slate-50 transition-colors group"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <HardDrive class="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-slate-900">{{ asset.name }}</div>
                    <div class="text-xs text-slate-500">ID: #{{ asset.id }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-sm font-mono text-slate-700">{{ asset.serial_number || 'N/A' }}</span>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="{
                    'bg-emerald-50 text-emerald-600 border-emerald-200': asset.status === 'active',
                    'bg-amber-50 text-amber-600 border-amber-200': asset.status === 'maintenance',
                    'bg-slate-100 text-slate-600 border-slate-200': asset.status === 'inactive'
                  }"
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border"
                >
                  {{ asset.status }}
                </span>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-sm text-slate-700">{{ asset.purchase_date }}</span>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-sm font-semibold text-slate-900">
                  ${{ Number(asset.purchase_cost).toLocaleString() }}
                </span>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    class="p-2 hover:bg-violet-50 rounded-lg text-slate-400 hover:text-violet-600 transition-colors" 
                    title="View History"
                  >
                    <History class="w-4 h-4" />
                  </button>
                  <button 
                    @click="openEditModal(asset)"
                    class="p-2 hover:bg-cyan-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors" 
                    title="Edit"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button 
                    @click="handleDelete(asset.id)"
                    class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors" 
                    title="Delete"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AssetModal 
      :is-open="isModalOpen"
      :loading="isSubmitting"
      :initial="selectedAsset"
      :categories="categories"
      :asset-types="assetTypes"
      :locations="locations"
      :departments="departments"
      :depreciation-methods="depreciationMethods"
      @close="isModalOpen = false"
      @submit="handleAssetSubmit"
    />
  </div>
</template>