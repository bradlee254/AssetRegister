<script setup>
import { ref, onMounted, computed } from 'vue'
import { Plus, Search, Edit2, Trash2, Loader2, FolderTree, Layers, AlertCircle } from 'lucide-vue-next'
import { CategoryService } from '../../services/category.service'
import CategoryModal from '../../components/CategoryModal.vue'

const categories = ref([])
const isLoading = ref(false)
const isModalOpen = ref(false)
const searchQuery = ref('')

const fetchCategories = async () => {
  isLoading.value = true
  try {
    const response = await CategoryService.listCategories()
    categories.value = response.data || response
  } catch (error) {
    console.error("Failed to load categories", error)
  } finally {
    isLoading.value = false
  }
}

const handleCreateCategory = async (payload) => {
  try {
    await CategoryService.createCategory(payload)
    isModalOpen.value = false
    await fetchCategories()
  } catch (error) {
    alert("Failed to create category: " + error.message)
  }
}

const deleteCategory = async (id) => {
  if (confirm("Delete this category? This might affect linked assets.")) {
    try {
      await CategoryService.deleteCategory(id)
      await fetchCategories()
    } catch (error) {
      alert("Error deleting category")
    }
  }
}

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  return categories.value.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const stats = computed(() => ({
  total: categories.value.length,
  active: categories.value.filter(c => c.is_active).length,
  inactive: categories.value.filter(c => !c.is_active).length
}))

onMounted(fetchCategories)
</script>

<template>
  <div class="space-y-6">
    
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Categories</h1>
        <p class="text-slate-500 mt-1">Manage asset classifications and organizational structure</p>
      </div>
      <button 
        @click="isModalOpen = true" 
        class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40"
      >
        <Plus class="w-5 h-5" />
        New Category
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-violet-50 rounded-lg">
            <Layers class="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Categories</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-emerald-50 rounded-lg">
            <FolderTree class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-slate-100 rounded-lg">
            <AlertCircle class="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inactive</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.inactive }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="relative">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search categories by name or description..." 
          class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
        >
      </div>
    </div>

    <!-- Categories Table -->
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-sm font-medium text-slate-500">Loading categories...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCategories.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="p-4 bg-slate-100 rounded-full mb-4">
          <Layers class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-sm font-medium text-slate-900 mb-1">No categories found</p>
        <p class="text-sm text-slate-500">Try adjusting your search or create a new category</p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr 
              v-for="cat in filteredCategories" 
              :key="cat.id" 
              class="hover:bg-slate-50 transition-colors group"
            >
              <td class="px-6 py-4">
                <span class="font-mono text-xs font-semibold text-violet-600">#{{ cat.id }}</span>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Layers class="w-5 h-5 text-violet-600" />
                  </div>
                  <span class="text-sm font-semibold text-slate-900">{{ cat.name }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-sm text-slate-600">{{ cat.description || 'No description' }}</span>
              </td>
              
              <td class="px-6 py-4">
                <span 
                  :class="cat.is_active 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                    : 'bg-slate-100 text-slate-600 border-slate-200'"
                  class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border"
                >
                  {{ cat.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    class="p-2 hover:bg-cyan-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors" 
                    title="Edit"
                  >
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button 
                    @click="deleteCategory(cat.id)"
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

    <!-- Category Modal -->
    <CategoryModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      @submit="handleCreateCategory" 
    />
  </div>
</template>