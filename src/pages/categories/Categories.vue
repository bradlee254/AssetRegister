<script setup>
import { ref, onMounted, computed } from "vue";
import {
  Plus, Search, Edit2, Trash2, Loader2, FolderTree, Layers, AlertCircle,
} from "lucide-vue-next";
import { CategoryService } from "../../services/category.service";
import CategoryModal from "../../components/CategoryModal.vue";

const categories = ref([]);
const isLoading = ref(false);
const isModalOpen = ref(false);
const isSubmitting = ref(false);
const searchQuery = ref("");

// State to track if we are editing
const selectedCategory = ref(null);

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await CategoryService.listCategories();
    // Handling different Laravel response structures
    categories.value = res.data?.data || res.data || res || [];
  } catch (error) {
    console.error("Failed to load categories", error);
  } finally {
    isLoading.value = false;
  }
};

const openCreateModal = () => {
  selectedCategory.value = null; // Ensure it's null for "Create"
  isModalOpen.value = true;
};

const openEditModal = (cat) => {
  selectedCategory.value = { ...cat }; // Clone the object for the modal
  isModalOpen.value = true;
};

const handleSubmit = async (formData) => {
  isSubmitting.value = true;
  try {
    if (selectedCategory.value) {
      // UPDATE ACTION
      await CategoryService.updateCategory(selectedCategory.value.id, formData);
    } else {
      // CREATE ACTION
      await CategoryService.createCategory(formData);
    }
    
    await fetchCategories(); // Refresh list to get latest data
    isModalOpen.value = false;
  } catch (error) {
    alert("Operation failed: " + (error?.response?.data?.message || error.message));
  } finally {
    isSubmitting.value = false;
  }
};

const deleteCategory = async (id) => {
  if (confirm("Delete this category? This might affect linked assets.")) {
    try {
      await CategoryService.deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      alert("Error deleting category");
    }
  }
};

// ... filteredCategories and stats computed remain the same ...
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  return categories.value.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const stats = computed(() => ({
  total: categories.value.length,
  active: categories.value.filter((c) => c.is_active).length,
  inactive: categories.value.filter((c) => !c.is_active).length,
}));

onMounted(fetchCategories);
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Categories</h1>
        <p class="text-slate-500 mt-1">Manage asset classifications</p>
      </div>
      <button @click="openCreateModal" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" /> New Category
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="cat in filteredCategories" :key="cat.id" class="hover:bg-slate-50 transition-colors group">
              <td class="px-6 py-4 font-mono text-xs font-semibold text-violet-600">#{{ cat.id }}</td>
              <td class="px-6 py-4 font-semibold text-slate-900">{{ cat.name }}</td>
              <td class="px-6 py-4">
                 <span :class="cat.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'" class="px-2.5 py-1 rounded-lg text-xs font-semibold border">
                  {{ cat.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEditModal(cat)" class="p-2 hover:bg-cyan-50 rounded-lg text-slate-400 hover:text-cyan-600">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteCategory(cat.id)" class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CategoryModal
      :is-open="isModalOpen"
      :loading="isSubmitting"
      :initial="selectedCategory"
      @close="isModalOpen = false"
      @submit="handleSubmit"
    />
  </div>
</template>