<script setup>
import { Package, UserCheck, AlertCircle, TrendingUp, User, Clock, ArrowRight, Zap } from 'lucide-vue-next'

const dashboardStats = [
  { label: 'Total Assets', value: '1,240', icon: Package, colorClass: 'bg-violet-500', textColor: 'text-violet-600', bgLight: 'bg-violet-50' },
  { label: 'Assigned', value: '852', icon: UserCheck, colorClass: 'bg-emerald-500', textColor: 'text-emerald-600', bgLight: 'bg-emerald-50' },
  { label: 'Pending Renewals', value: '14', icon: AlertCircle, colorClass: 'bg-amber-500', textColor: 'text-amber-600', bgLight: 'bg-amber-50' },
  { label: 'Net Valuation', value: '$452k', icon: TrendingUp, colorClass: 'bg-cyan-500', textColor: 'text-cyan-600', bgLight: 'bg-cyan-50' },
]

const recentActivities = [
  { 
    user: 'Admin', 
    action: 'assigned', 
    asset: 'MacBook Pro #001', 
    target: 'John Doe',
    time: '2 hours ago',
    department: 'IT Department',
    color: 'emerald'
  },
  { 
    user: 'Sarah Wilson', 
    action: 'returned', 
    asset: 'Dell Monitor #045', 
    target: 'Inventory',
    time: '4 hours ago',
    department: 'Design Team',
    color: 'cyan'
  },
  { 
    user: 'Mike Chen', 
    action: 'requested', 
    asset: 'iPhone 14 Pro', 
    target: 'Pending Approval',
    time: '5 hours ago',
    department: 'Sales',
    color: 'amber'
  },
  { 
    user: 'Admin', 
    action: 'updated', 
    asset: 'License: Adobe CC', 
    target: 'Renewed',
    time: '1 day ago',
    department: 'Marketing',
    color: 'violet'
  }
]

const getColorClasses = (color) => {
  const colors = {
    emerald: 'text-emerald-600 bg-emerald-500',
    cyan: 'text-cyan-600 bg-cyan-500',
    amber: 'text-amber-600 bg-amber-500',
    violet: 'text-violet-600 bg-violet-500'
  }
  return colors[color] || colors.emerald
}
</script>

<template>
  <div class="space-y-6">
    
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">System Overview</h1>
        <p class="text-slate-500 mt-1">Real-time status of your organizational assets</p>
      </div>
      <div class="flex gap-3">
        <button class="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          Export Report
        </button>
        <button class="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40">
          Generate Audit
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="stat in dashboardStats" 
        :key="stat.label" 
        class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group"
      >
        <div class="flex justify-between items-start mb-4">
          <div :class="`p-3 rounded-xl ${stat.bgLight}`">
            <component :is="stat.icon" :class="`w-6 h-6 ${stat.textColor}`" />
          </div>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">Active</span>
        </div>
        <div>
          <p class="text-slate-500 text-sm font-medium uppercase tracking-wider">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-slate-900 mt-2">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Recent Activity Log -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div class="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 class="font-bold text-slate-900 text-lg">Recent Activity Log</h3>
            <p class="text-sm text-slate-500 mt-0.5">Latest system updates and changes</p>
          </div>
          <router-link 
            to="/audit-logs" 
            class="flex items-center gap-1 text-green-600 text-sm font-semibold hover:text-gree-700 transition-colors"
          >
            View All
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>
        
        <div class="p-6">
          <div class="space-y-5">
            <div 
              v-for="(activity, index) in recentActivities" 
              :key="index" 
              class="flex gap-4 relative"
            >
              <!-- Timeline connector -->
              <div class="relative flex flex-col items-center">
                <div :class="`w-10 h-10 rounded-xl ${getColorClasses(activity.color).split(' ')[1]}/10 flex items-center justify-center z-10`">
                  <User :class="`w-5 h-5 ${getColorClasses(activity.color).split(' ')[0]}`" />
                </div>
                <div 
                  v-if="index !== recentActivities.length - 1" 
                  class="absolute top-10 w-0.5 h-10 bg-slate-200"
                ></div>
              </div>
              
              <!-- Activity content -->
              <div class="flex-1 pt-1">
                <p class="text-sm text-slate-900">
                  <span :class="`font-semibold ${getColorClasses(activity.color).split(' ')[0]}`">{{ activity.user }}</span> 
                  {{ activity.action }} 
                  <span class="font-semibold text-slate-900">{{ activity.asset }}</span> 
                  <span class="text-slate-500">to</span> 
                  {{ activity.target }}
                </p>
                <div class="flex items-center gap-2 mt-1.5">
                  <span class="flex items-center gap-1 text-xs text-slate-500">
                    <Clock class="w-3 h-3" />
                    {{ activity.time }}
                  </span>
                  <span class="text-slate-300">•</span>
                  <span class="text-xs text-slate-500">{{ activity.department }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Cards -->
      <div class="space-y-6">
        
        <!-- License Renewals Card -->
        <div class="bg-gradient-to-br from-violet-600 to-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-violet-600/20">
          <div class="flex items-start gap-3 mb-3">
            <div class="p-2 bg-white/20 rounded-lg">
              <Zap class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-bold text-lg">License Renewals</h3>
              <p class="text-violet-100 text-sm mt-1">4 licenses expiring in 30 days</p>
            </div>
          </div>
          <button class="w-full mt-4 py-3 bg-white text-violet-700 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-all shadow-lg">
            Review Now
          </button>
        </div>
        
        <!-- Quick Actions Card -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-4 text-lg">Quick Actions</h3>
          <div class="space-y-3">
            <button class="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-violet-600 transition-all group">
              <span>Add New Asset</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button class="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-violet-600 transition-all group">
              <span>Create Category</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button class="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-violet-600 transition-all group">
              <span>Assign Asset</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <!-- System Health Card -->
        <div class="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">System Status</span>
          </div>
          <p class="text-2xl font-bold text-emerald-900">All Systems Operational</p>
          <p class="text-sm text-emerald-600 mt-1">Last checked: Just now</p>
        </div>
        
      </div>
    </div>

  </div>
</template>