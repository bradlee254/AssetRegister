
<script setup>
import { Package, UserCheck, AlertCircle, TrendingDown, User } from 'lucide-vue-next'

const dashboardStats = [
  { label: 'Total Assets', value: '1,240', icon: Package, colorClass: 'bg-blue-500', textColor: 'text-blue-500' },
  { label: 'Assigned', value: '852', icon: UserCheck, colorClass: 'bg-green-500', textColor: 'text-green-500' },
  { label: 'Pending Renewals', value: '14', icon: AlertCircle, colorClass: 'bg-orange-500', textColor: 'text-orange-500' },
  { label: 'Net Valuation', value: '$452k', icon: TrendingDown, colorClass: 'bg-purple-500', textColor: 'text-purple-500' },
]
</script>
<template>
  <div class="space-y-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-white">System Overview</h1>
        <p class="text-neutral-400 mt-1">Real-time status of your organizational assets.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-sm font-medium hover:bg-neutral-700 transition-colors">
          Export Report
        </button>
        <button class="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-500 transition-all shadow-lg shadow-green-600/20">
          Generate Audit
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in dashboardStats" :key="stat.label" 
           class="bg-neutral-800/40 backdrop-blur-md p-6 rounded-2xl border border-neutral-700/50 hover:border-green-500/50 transition-colors group">
        <div class="flex justify-between items-start">
          <div :class="`p-3 rounded-xl ${stat.colorClass} bg-opacity-10`">
            <component :is="stat.icon" :class="`w-6 h-6 ${stat.textColor}`" />
          </div>
          <span class="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Active</span>
        </div>
        <div class="mt-4">
          <p class="text-neutral-500 text-sm font-medium uppercase tracking-wider">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-white mt-1">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-neutral-800/40 backdrop-blur-md rounded-2xl border border-neutral-700/50">
        <div class="p-6 border-b border-neutral-700/50 flex justify-between items-center">
          <h3 class="font-bold text-white">Recent Activity Log</h3>
          <router-link to="/audit-logs" class="text-green-400 text-sm hover:underline">Full Log</router-link>
        </div>
        <div class="p-6 space-y-6">
          <div v-for="i in 4" :key="i" class="flex gap-4">
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center z-10 relative">
                <User class="w-5 h-5 text-neutral-300" />
              </div>
              <div v-if="i !== 4" class="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-neutral-700"></div>
            </div>
            <div>
              <p class="text-sm text-white">
                <span class="font-bold text-green-400">Admin</span> 
                assigned <span class="text-blue-400">MacBook Pro #001</span> to John Doe
              </p>
              <p class="text-xs text-neutral-500 mt-1">2 hours ago • IT Department</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl text-white shadow-xl">
          <h3 class="font-bold text-lg mb-2">License Renewals</h3>
          <p class="text-green-100 text-sm mb-4">You have 4 software licenses expiring within the next 30 days.</p>
          <button class="w-full py-2 bg-white text-green-700 rounded-lg font-bold text-sm hover:bg-green-50">
            Review Now
          </button>
        </div>
        
        <div class="bg-neutral-800/40 backdrop-blur-md p-6 rounded-2xl border border-neutral-700/50">
          <h3 class="font-bold text-white mb-4">Quick Shortcuts</h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="p-3 bg-neutral-700/50 rounded-xl text-xs hover:bg-neutral-600 transition-colors text-center">New Category</button>
            <button class="p-3 bg-neutral-700/50 rounded-xl text-xs hover:bg-neutral-600 transition-colors text-center">Assign Asset</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

