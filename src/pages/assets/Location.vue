<script setup>
import { ref, computed } from 'vue'
import { Plus, MapPin, Trash2, Edit2, Building2, Package, Users } from 'lucide-vue-next'

const locations = ref([
  { 
    id: 1, 
    name: 'Main Headquarters', 
    address: '123 Business Park, Downtown', 
    manager: 'John Doe',
    asset_count: 145,
    staff_count: 52
  },
  { 
    id: 2, 
    name: 'North Warehouse', 
    address: '45 Industrial Way, North District', 
    manager: 'Sarah Smith',
    asset_count: 89,
    staff_count: 18
  },
  { 
    id: 3, 
    name: 'West Regional Office', 
    address: '78 Corporate Blvd, West Side', 
    manager: 'Mike Johnson',
    asset_count: 67,
    staff_count: 35
  },
  { 
    id: 4, 
    name: 'East Distribution Center', 
    address: '92 Logistics Lane, East End', 
    manager: 'Emily Chen',
    asset_count: 112,
    staff_count: 28
  }
])

const stats = computed(() => ({
  total: locations.value.length,
  totalAssets: locations.value.reduce((sum, l) => sum + l.asset_count, 0),
  totalStaff: locations.value.reduce((sum, l) => sum + l.staff_count, 0),
  avgAssets: Math.round(locations.value.reduce((sum, l) => sum + l.asset_count, 0) / locations.value.length)
}))
</script>

<template>
  <div class="space-y-6">
    
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Locations</h1>
        <p class="text-slate-500 mt-1">Physical sites where assets are registered and managed</p>
      </div>
      <button class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/40">
        <Plus class="w-5 h-5" />
        Add Location
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-violet-50 rounded-lg">
            <MapPin class="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Locations</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="p-2.5 bg-cyan-50 rounded-lg">
            <Package class="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Assets</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.totalAssets }}</p>
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
          <div class="p-2.5 bg-amber-50 rounded-lg">
            <Building2 class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Assets/Site</p>
            <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ stats.avgAssets }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Locations Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="loc in locations" 
        :key="loc.id" 
        class="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all group"
      >
        <!-- Header with Icon and ID -->
        <div class="flex justify-between items-start mb-5">
          <div class="p-3 bg-violet-50 rounded-xl">
            <MapPin class="w-7 h-7 text-violet-600" />
          </div>
          <span class="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            #{{ loc.id }}
          </span>
        </div>

        <!-- Location Info -->
        <div class="mb-5">
          <h3 class="text-lg font-bold text-slate-900 mb-2">{{ loc.name }}</h3>
          <p class="text-sm text-slate-600 flex items-start gap-2">
            <MapPin class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <span>{{ loc.address }}</span>
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-cyan-50 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-1">
              <Package class="w-4 h-4 text-cyan-600" />
              <span class="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Assets</span>
            </div>
            <p class="text-xl font-bold text-cyan-900">{{ loc.asset_count }}</p>
          </div>
          
          <div class="bg-emerald-50 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-1">
              <Users class="w-4 h-4 text-emerald-600" />
              <span class="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Staff</span>
            </div>
            <p class="text-xl font-bold text-emerald-900">{{ loc.staff_count }}</p>
          </div>
        </div>

        <!-- Footer with Manager and Actions -->
        <div class="flex justify-between items-center pt-5 border-t border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <span class="text-xs font-semibold text-slate-600">{{ loc.manager.split(' ').map(n => n[0]).join('') }}</span>
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-900">{{ loc.manager }}</p>
              <p class="text-xs text-slate-500">Location Manager</p>
            </div>
          </div>
          
          <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="p-2 hover:bg-cyan-50 rounded-lg text-slate-400 hover:text-cyan-600 transition-colors" title="Edit">
              <Edit2 class="w-4 h-4" />
            </button>
            <button class="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>