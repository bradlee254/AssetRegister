<script setup>
import { ref } from 'vue'
import { 
  UserPlus, 
  Search, 
  Filter, 
  ArrowRightLeft, 
  Clock,
  Package,
  TrendingUp,
  AlertCircle,
  MoreVertical
} from 'lucide-vue-next'

const assignments = ref([
  { 
    id: 1, 
    user_id: 101, 
    asset_id: 5, 
    asset_name: 'MacBook Pro M2',
    user_name: 'John Doe',
    assigned_date: '2024-01-15', 
    due_date: '2025-01-15',
    status: 'active' 
  },
  { 
    id: 2, 
    user_id: 105, 
    asset_id: 12, 
    asset_name: 'Dell UltraSharp Monitor',
    user_name: 'Jane Smith',
    assigned_date: '2023-11-20', 
    due_date: '2024-11-20',
    status: 'overdue' 
  },
  { 
    id: 3, 
    user_id: 108, 
    asset_id: 23, 
    asset_name: 'iPhone 14 Pro',
    user_name: 'Mike Johnson',
    assigned_date: '2024-03-10', 
    due_date: '2025-03-10',
    status: 'active' 
  },
  { 
    id: 4, 
    user_id: 112, 
    asset_id: 31, 
    asset_name: 'Sony WH-1000XM5',
    user_name: 'Sarah Williams',
    assigned_date: '2023-12-05', 
    due_date: '2024-12-05',
    status: 'returned' 
  }
])

const getStatusConfig = (status) => {
  switch (status) {
    case 'active': 
      return { 
        class: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        label: 'Active'
      }
    case 'overdue': 
      return { 
        class: 'bg-rose-50 text-rose-600 border-rose-200',
        label: 'Overdue'
      }
    case 'returned': 
      return { 
        class: 'bg-slate-100 text-slate-600 border-slate-200',
        label: 'Returned'
      }
    default: 
      return { 
        class: 'bg-slate-100 text-slate-600 border-slate-200',
        label: status
      }
  }
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<template>
  <div class="space-y-6">
      
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Asset Assignments</h1>
          <p class="text-slate-500 text-base">Monitor and manage asset deployments across your organization</p>
        </div>
        <button class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40">
          <UserPlus class="w-5 h-5" />
          New Assignment
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-slate-200 p-6 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-violet-50 rounded-xl">
              <Package class="w-6 h-6 text-violet-600" />
            </div>
            <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">TOTAL</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 mb-1">42</p>
          <p class="text-sm text-slate-500">Active Assignments</p>
        </div>

        <div class="bg-white border border-slate-200 p-6 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-rose-50 rounded-xl">
              <AlertCircle class="w-6 h-6 text-rose-600" />
            </div>
            <span class="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">ALERT</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 mb-1">3</p>
          <p class="text-sm text-slate-500">Overdue Returns</p>
        </div>

        <div class="bg-white border border-slate-200 p-6 rounded-xl hover:border-slate-300 hover:shadow-lg transition-all">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 bg-emerald-50 rounded-xl">
              <TrendingUp class="w-6 h-6 text-emerald-600" />
            </div>
            <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">READY</span>
          </div>
          <p class="text-3xl font-bold text-slate-900 mb-1">15</p>
          <p class="text-sm text-slate-500">Available Stock</p>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div class="relative flex-1 lg:max-w-md">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by user name or asset..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
            >
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-100 hover:border-slate-300 flex items-center gap-2 transition-all">
              <Filter class="w-4 h-4" /> 
              <span class="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Assignments Table -->
      <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Asset</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assigned</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Return Due</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr 
                v-for="item in assignments" 
                :key="item.id" 
                class="hover:bg-slate-50 transition-colors group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center font-semibold text-sm text-violet-600">
                      {{ getInitials(item.user_name) }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-slate-900">{{ item.user_name }}</div>
                      <div class="text-xs text-slate-500">ID: #{{ item.user_id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-slate-900">{{ item.asset_name }}</span>
                    <span class="text-xs text-slate-500 font-mono">#{{ item.asset_id }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-slate-700">{{ item.assigned_date }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <Clock v-if="item.status === 'overdue'" class="w-4 h-4 text-rose-600" />
                    <span class="text-sm" :class="item.status === 'overdue' ? 'text-rose-600 font-semibold' : 'text-slate-700'">
                      {{ item.due_date }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span 
                    :class="getStatusConfig(item.status).class" 
                    class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border"
                  >
                    {{ getStatusConfig(item.status).label }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-2 hover:bg-violet-50 rounded-lg text-slate-400 hover:text-violet-600 transition-colors">
                      <ArrowRightLeft class="w-4 h-4" />
                    </button>
                    <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
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