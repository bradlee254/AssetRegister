<script setup>
import { ref, onMounted, computed } from 'vue'
import { 
  Plus, Search, Filter, HardDrive, 
  MoreHorizontal, Loader2, AlertCircle,
  Edit2, Trash2, History
} from 'lucide-vue-next'
import { AssetService } from '../../services/asset.service'
import AssetModal from '../../components/AssetModal.vue'

// State Management
const assets = ref([])
const isLoading = ref(false)
const isModalOpen = ref(false)
const searchQuery = ref('')

// Dropdown Data (In a real app, fetch these from your respective services onMounted)
const categories = ref([{ id: 1, name: 'Laptops' }, { id: 2, name: 'Servers' }, { id: 3, name: 'Furniture' }])
const assetTypes = ref([{ id: 1, name: 'Hardware' }, { id: 2, name: 'Software/License' }])
const locations = ref([{ id: 1, name: 'Head Office' }, { id: 2, name: 'Warehouse' }])
const departments = ref([{ id: 1, name: 'IT' }, { id: 2, name: 'Finance' }, { id: 3, name: 'HR' }])
const depreciationMethods = ref([{ id: 1, name: 'Straight Line' }, { id: 2, name: 'Reducing Balance' }])

// Fetch Data
const fetchAssets = async () => {
  isLoading.value = true
  try {
    const response = await AssetService.getAssets()
    console.log("Fetched assets:", response)
    assets.value = Array.isArray(response) ? response : response.data || []
  } catch (error) {
    console.error("Failed to load assets:", error)
  } finally {
    isLoading.value = false
  }
}

// Handle Form Submission
const handleCreateAsset = async (formData) => {
  try {
    await AssetService.createAsset(formData)
    isModalOpen.value = false
    await fetchAssets() // Refresh the list
  } catch (error) {
    alert("Error creating asset: " + (error.response?.data?.message || error.message))
  }
}

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this asset?')) {
    try {
      await AssetService.deleteAsset(id)
      await fetchAssets()
    } catch (error) {
      console.error("Delete failed", error)
    }
  }
}

// Filter Logic
const filteredAssets = computed(() => {
  if (!searchQuery.value) return assets.value
  return assets.value.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    asset.serial_number?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(fetchAssets)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Asset Inventory</h1>
        <p class="text-neutral-400 text-sm">Manage and track organization assets and their lifecycles.</p>
      </div>
      <button 
        @click="isModalOpen = true"
        class="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-600/20 active:scale-95"
      >
        <Plus class="w-5 h-5" />
        Add New Asset
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 items-center justify-between bg-neutral-800/40 p-4 rounded-2xl border border-neutral-700/50 backdrop-blur-md">
      <div class="relative w-full lg:w-96">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by name or serial number..." 
          class="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-green-500 outline-none transition-all"
        >
      </div>
      
      <div class="flex items-center gap-3 w-full lg:w-auto">
        <select class="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-neutral-300 outline-none focus:border-green-500">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <button class="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-sm text-neutral-400 hover:text-white transition-colors">
          <Filter class="w-4 h-4" />
          More Filters
        </button>
      </div>
    </div>

    <div class="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl overflow-hidden backdrop-blur-md">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-neutral-500">
        <Loader2 class="w-10 h-10 animate-spin text-green-500 mb-4" />
        <p>Loading asset registry...</p>
      </div>

      <div v-else-if="filteredAssets.length === 0" class="flex flex-col items-center justify-center py-20 text-neutral-500">
        <AlertCircle class="w-12 h-12 mb-4 opacity-20" />
        <p>No assets found. Try adjusting your search or add a new one.</p>
      </div>

      <table v-else class="w-full text-left border-collapse">
        <thead class="bg-neutral-900/50 text-neutral-400 text-xs uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4 font-semibold">Asset Info</th>
            <th class="px-6 py-4 font-semibold">Serial No</th>
            <th class="px-6 py-4 font-semibold">Status</th>
            <th class="px-6 py-4 font-semibold">Purchase Date</th>
            <th class="px-6 py-4 font-semibold">Cost</th>
            <th class="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-700/50 text-neutral-300">
          <tr v-for="asset in filteredAssets" :key="asset.id" class="hover:bg-neutral-700/20 transition-colors group">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center">
                  <HardDrive class="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div class="text-white font-medium">{{ asset.name }}</div>
                  <div class="text-xs text-neutral-500">ID: #{{ asset.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 font-mono text-xs">{{ asset.serial_number || 'N/A' }}</td>
            <td class="px-6 py-4">
              <span 
                :class="{
                  'bg-green-500/10 text-green-500 border-green-500/20': asset.status === 'active',
                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20': asset.status === 'maintenance',
                  'bg-neutral-500/10 text-neutral-500 border-neutral-500/20': asset.status === 'inactive'
                }"
                class="px-2 py-1 rounded-md text-[10px] font-bold uppercase border"
              >
                {{ asset.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm">{{ asset.purchase_date }}</td>
            <td class="px-6 py-4 text-sm font-medium text-white">
              ${{ Number(asset.purchase_cost).toLocaleString() }}
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="handleDelete(asset.id)" class="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-500" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white" title="View Details">
                  <History class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AssetModal 
      :is-open="isModalOpen"
      :categories="categories"
      :asset-types="assetTypes"
      :locations="locations"
      :departments="departments"
      :depreciation-methods="depreciationMethods"
      @close="isModalOpen = false"
      @submit="handleCreateAsset"
    />
  </div>
</template>