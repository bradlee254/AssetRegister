<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Search, Edit2, Trash2, Loader2, FolderTree } from 'lucide-vue-next'
import { CategoryService } from '../../services/category.service'
import CategoryModal from '../../components/CategoryModal.vue'

const categories = ref([])
const isLoading = ref(false)
const isModalOpen = ref(false)

const fetchCategories = async () => {
  isLoading.value = true
  try {
    const response = await CategoryService.listCategories()
    // Laravel usually wraps data in a 'data' key or returns the array directly
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

onMounted(fetchCategories)
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Categories</h1>
        <p class="text-neutral-400 text-sm">Manage asset classifications and IDs.</p>
      </div>
      <button @click="isModalOpen = true" 
        class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-600/20">
        <Plus class="w-5 h-5" />
        New Category
      </button>
    </div>

    <div class="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl overflow-hidden backdrop-blur-md">
      <div v-if="isLoading" class="p-20 flex flex-col items-center justify-center">
        <Loader2 class="w-8 h-8 animate-spin text-green-500 mb-2" />
        <span class="text-neutral-500">Loading categories...</span>
      </div>

      <table v-else class="w-full text-left">
        <thead class="bg-neutral-900/50 text-neutral-400 text-xs uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4">ID</th>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Description</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-700/50 text-neutral-300">
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-neutral-700/20 group transition-colors">
            <td class="px-6 py-4 font-mono text-green-500 text-sm">#{{ cat.id }}</td>
            <td class="px-6 py-4 font-bold text-white">{{ cat.name }}</td>
            <td class="px-6 py-4 text-sm text-neutral-400">{{ cat.description }}</td>
            <td class="px-6 py-4">
              <span :class="cat.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'" 
                    class="px-2 py-1 rounded-full text-[10px] font-bold uppercase border border-current">
                {{ cat.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="deleteCategory(cat.id)" class="p-2 hover:bg-red-500/10 rounded-lg text-neutral-400 hover:text-red-500">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CategoryModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      @submit="handleCreateCategory" 
    />
  </div>
</template>