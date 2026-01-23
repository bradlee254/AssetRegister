<script setup>
import { ref, onMounted, computed } from 'vue'
import { 
  UserPlus, Search, Mail, ShieldCheck, 
  Loader2, Edit2, Trash2, User, MoreVertical 
} from 'lucide-vue-next'
import { UserService } from '../../services/user.service'
import UserModal from '../../components/UserModal.vue'

const users = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const searchQuery = ref('')
const selectedUser = ref(null)

const fetchUsers = async () => {
  isLoading.value = true
  try {
    const res = await UserService.getUsers()
    // Handle array or paginated response
    users.value = res.data?.data || res.data || res || []
  } catch (error) {
    console.error("Failed to load users", error)
  } finally {
    isLoading.value = false
  }
}

const openCreateModal = () => {
  selectedUser.value = null
  isModalOpen.value = true
}

const openEditModal = (user) => {
  selectedUser.value = { ...user }
  isModalOpen.value = true
}

const handleUserSubmit = async (formData) => {
  isSubmitting.value = true
  try {
    if (selectedUser.value) {
      await UserService.updateUser(selectedUser.value.id, formData)
    } else {
      await UserService.createUser(formData)
    }
    await fetchUsers()
    isModalOpen.value = false
  } catch (error) {
    alert("Error saving user: " + (error.response?.data?.message || error.message))
  } finally {
    isSubmitting.value = false
  }
}

const deleteUser = async (id) => {
  if (confirm('Are you sure you want to remove this user?')) {
    try {
      await UserService.deleteUser(id)
      await fetchUsers()
    } catch (error) {
      alert("Delete failed")
    }
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const q = searchQuery.value.toLowerCase()
  return users.value.filter(u => 
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  )
})

onMounted(fetchUsers)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">User Management</h1>
        <p class="text-slate-500 mt-1">Manage system access and user profiles</p>
      </div>
      <button @click="openCreateModal" class="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2">
        <UserPlus class="w-5 h-5" /> Add New User
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div class="relative max-w-md">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input v-model="searchQuery" type="text" placeholder="Search by name or email..." class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none">
      </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p class="text-slate-500">Loading user directory...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left">
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">User Info</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Email</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50 group transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div class="text-sm font-semibold text-slate-900">{{ user.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                <div class="flex items-center gap-2">
                  <Mail class="w-4 h-4 text-slate-400" />
                  {{ user.email }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-lg text-xs font-semibold border bg-emerald-50 text-emerald-600 border-emerald-200">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEditModal(user)" class="p-2 hover:bg-violet-50 text-slate-400 hover:text-violet-600 rounded-lg">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteUser(user.id)" class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <UserModal 
      :is-open="isModalOpen" 
      :initial="selectedUser" 
      :loading="isSubmitting"
      @close="isModalOpen = false" 
      @submit="handleUserSubmit"
    />
  </div>
</template>