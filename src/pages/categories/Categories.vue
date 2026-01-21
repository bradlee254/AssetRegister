<script setup>
import { ref } from 'vue'
import { Plus, Search, MoreVertical, Edit2, Trash2, Power } from 'lucide-vue-next'
import CategoryModal from '../../components/CategoryModal.vue'

// Logic for opening/closing modal
const isModalOpen = ref(false)

// Placeholder for data
const categories = ref([
  { id: 1, name: 'Laptops', type: 'Physical', assets: 45, status: 'Active', rate: '20%' },
  { id: 2, name: 'SaaS Subscriptions', type: 'Soft Asset', assets: 12, status: 'Active', rate: '0%' },
  { id: 3, name: 'Office Furniture', type: 'Physical', assets: 120, status: 'Inactive', rate: '10%' },
])

const handleCategorySubmit = (payload) => {
    // In the next step, we will call CategoryService.create(payload) here
    console.log("Saving Category:", payload)
    isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Asset Categories</h1>
        <p class="text-neutral-400 text-sm">Manage types and classification for your inventory.</p>
      </div>
      <button @click="isModalOpen = true" 
        class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-600/20">
        <Plus class="w-5 h-5" />
        Add Category
      </button>
    </div>

    <CategoryModal 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      @submit="handleCategorySubmit"
    />    

  

    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-800/40 p-4 rounded-2xl border border-neutral-700/50 backdrop-blur-md">
      <div class="relative w-full md:w-96">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input type="text" placeholder="Search categories..." 
               class="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none text-white">
      </div>
      <div class="flex gap-2">
        <select class="bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-neutral-300 outline-none">
          <option>All Types</option>
          <option>Physical</option>
          <option>Soft Asset</option>
        </select>
      </div>
    </div>

    <div class="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl overflow-hidden backdrop-blur-md">
      <table class="w-full text-left border-collapse">
        <thead class="bg-neutral-900/50 text-neutral-400 text-xs uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4 font-semibold">Category Name</th>
            <th class="px-6 py-4 font-semibold">Type</th>
            <th class="px-6 py-4 font-semibold">Linked Assets</th>
            <th class="px-6 py-4 font-semibold">Depr. Rate</th>
            <th class="px-6 py-4 font-semibold">Status</th>
            <th class="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-700/50 text-neutral-300">
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-neutral-700/20 transition-colors group">
            <td class="px-6 py-4 font-medium text-white">{{ cat.name }}</td>
            <td class="px-6 py-4">
              <span :class="cat.type === 'Physical' ? 'text-blue-400' : 'text-purple-400'" class="text-xs font-bold uppercase">
                {{ cat.type }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm">{{ cat.assets }} items</td>
            <td class="px-6 py-4 text-sm">{{ cat.rate }}</td>
            <td class="px-6 py-4">
              <span :class="cat.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-neutral-500/10 text-neutral-500'" 
                    class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border"
                    :style="{ borderColor: cat.status === 'Active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(115, 115, 115, 0.2)' }">
                {{ cat.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white" title="Edit">
                  <Edit2 class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-green-500" title="Toggle Status">
                  <Power class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-red-500" title="Delete">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>