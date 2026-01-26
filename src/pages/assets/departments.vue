<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Users, Building2, Edit2, Trash2, MoreVertical, TrendingUp, Loader2 } from 'lucide-vue-next'
import { DepartmentService } from '../../services/department.service'
import { UserService } from '../../services/user.service'
import { useToast } from '../../composables/useToast'
import DepartmentModal from '../../components/DepartmentModal.vue'

const departments = ref<any[]>([])
const users = ref<any[]>([]) // For the manager dropdown
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedDept = ref<any>(null)
const { addToast } = useToast()

const fetchData = async () => {
  isLoading.value = true
  try {
    const [deptRes, userRes] = await Promise.all([
      DepartmentService.getDepartments(),
      UserService.getUsers()
    ])
    departments.value = deptRes.data?.data || deptRes.data || deptRes || []
    users.value = userRes.data?.data || userRes.data || userRes || []
  } catch (error: any) {
    addToast('Failed to sync department data', 'error')
  } finally {
    isLoading.value = false
  }
}

const openCreate = () => {
  selectedDept.value = null
  isModalOpen.value = true
}

const openEdit = (dept: any) => {
  selectedDept.value = { ...dept }
  isModalOpen.value = true
}

const handleAction = async (formData: any) => {
  isSubmitting.value = true
  try {
    if (selectedDept.value) {
      await DepartmentService.updateDepartment(selectedDept.value.id, formData)
      addToast('Department updated', 'success')
    } else {
      await DepartmentService.createDepartment(formData)
      addToast('Department created successfully', 'success')
    }
    await fetchData()
    isModalOpen.value = false
  } catch (error: any) {
    addToast(error.response?.data?.message || 'Error processing request', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteDept = async (id: number) => {
  if (!confirm('Are you sure you want to delete this department?')) return
  try {
    await DepartmentService.deleteDepartment(id)
    addToast('Department removed', 'success')
    await fetchData()
  } catch (error) {
    addToast('Failed to delete department', 'error')
  }
}

const stats = computed(() => ({
  total: departments.value.length,
  totalStaff: departments.value.reduce((sum, d) => sum + (d.staff_count || 0), 0),
  totalAssets: departments.value.reduce((sum, d) => sum + (d.assets_count || 0), 0),
  avgStaff: departments.value.length > 0 
    ? Math.round(departments.value.reduce((sum, d) => sum + (d.staff_count || 0), 0) / departments.value.length) 
    : 0
}))

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Departments</h1>
        <p class="text-slate-500 mt-1">Manage organizational structure and resource allocation</p>
      </div>
      <button @click="openCreate" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" /> Add Department
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(val, label) in { 'Total Depts': stats.total, 'Total Staff': stats.totalStaff, 'Avg Staff/Dept': stats.avgStaff, 'Assigned Assets': stats.totalAssets }" :key="label" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-violet-50 rounded-lg text-violet-600"><Building2 class="w-5 h-5" /></div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ label }}</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ val }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center py-20">
      <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
      <p class="text-slate-500 font-medium">Fetching departments...</p>
    </div>

    <div v-else class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Code</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Manager</th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Staff</th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Assets</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="dept in departments" :key="dept.id" class="hover:bg-slate-50 group">
              <td class="px-6 py-4 font-mono text-xs font-semibold text-violet-600">{{ dept.code }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600"><Building2 class="w-5 h-5" /></div>
                  <span class="text-sm font-semibold text-slate-900">{{ dept.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-700">{{ dept.manager?.name || 'N/A' }}</td>
              <td class="px-6 py-4 text-center font-bold text-slate-700 text-sm">{{ dept.staff_count || 0 }}</td>
              <td class="px-6 py-4 text-center font-bold text-cyan-600 text-sm">{{ dept.assets_count || 0 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEdit(dept)" class="p-2 hover:bg-cyan-50 text-slate-400 hover:text-cyan-600 rounded-lg"><Edit2 class="w-4 h-4" /></button>
                  <button @click="deleteDept(dept.id)" class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 class="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <DepartmentModal 
      :is-open="isModalOpen" 
      :loading="isSubmitting" 
      :initial="selectedDept" 
      :users="users"
      @close="isModalOpen = false" 
      @submit="handleAction"
    />
  </div>
</template>