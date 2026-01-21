<script setup>
import { ref, computed } from 'vue'
import { Plus, Users, Building2, Edit2, Trash2, MoreVertical, TrendingUp } from 'lucide-vue-next'

const departments = ref([
  { id: 1, name: 'IT & Infrastructure', head: 'Mike Tech', staff_count: 12, assets_count: 45 },
  { id: 2, name: 'Finance', head: 'Alice Money', staff_count: 5, assets_count: 18 },
  { id: 3, name: 'Human Resources', head: 'Sarah People', staff_count: 8, assets_count: 22 },
  { id: 4, name: 'Marketing', head: 'John Brand', staff_count: 15, assets_count: 38 },
  { id: 5, name: 'Operations', head: 'David Process', staff_count: 20, assets_count: 67 }
])

const stats = computed(() => ({
  total: departments.value.length,
  totalStaff: departments.value.reduce((sum, d) => sum + d.staff_count, 0),
  totalAssets: departments.value.reduce((sum, d) => sum + (d.assets_count || 0), 0),
  avgStaff: Math.round(departments.value.reduce((sum, d) => sum + d.staff_count, 0) / departments.value.length)
}))
</script>

<template>
  <div class="space-y-6">
    
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Departments</h1>
        <p class="text-slate-500 mt-1">Manage organizational departments and their structure</p>
      </div>
      <button class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40">
        <Plus class="w-5 h-5" />
        Add Department
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-violet-50 rounded-lg">
            <Building2 class="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Departments</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-emerald-50 rounded-lg">
            <Users class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Staff</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.totalStaff }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-cyan-50 rounded-lg">
            <TrendingUp class="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Staff/Dept</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.avgStaff }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-amber-50 rounded-lg">
            <Building2 class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Assets</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.totalAssets }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Departments Table -->
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department Head</th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Staff Count</th>
              <th class="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Assets</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr 
              v-for="dept in departments" 
              :key="dept.id" 
              class="hover:bg-slate-50 transition-colors group"
            >
              <td class="px-6 py-4">
                <span class="font-mono text-xs font-semibold text-violet-600">#{{ dept.id }}</span>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Building2 class="w-5 h-5 text-violet-600" />
                  </div>
                  <span class="text-sm font-semibold text-slate-900">{{ dept.name }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Users class="w-4 h-4 text-emerald-600" />
                  </div>
                  <span class="text-sm text-slate-700">{{ dept.head }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold">
                  {{ dept.staff_count }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-lg text-sm font-semibold">
                  {{ dept.assets_count }}
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
                    class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors" 
                    title="Delete"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                  <button 
                    class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" 
                    title="More"
                  >
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>