<script setup>
import { ref } from 'vue'
import { Plus, MapPin, Trash2, Edit2 } from 'lucide-vue-next'

const locations = ref([
  { id: 1, name: 'Main Headquarters', address: '123 Business Park', manager: 'John Doe' },
  { id: 2, name: 'North Warehouse', address: '45 Industrial Way', manager: 'Sarah Smith' }
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-white">Locations</h1>
        <p class="text-neutral-400 text-sm">Physical sites where assets are registered.</p>
      </div>
      <button class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-600/20">
        <Plus class="w-5 h-5" /> Add Location
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="loc in locations" :key="loc.id" class="bg-neutral-800/40 border border-neutral-700/50 p-6 rounded-2xl backdrop-blur-md group relative">
        <div class="flex justify-between items-start mb-4">
          <div class="p-3 bg-green-500/10 rounded-xl text-green-500">
            <MapPin class="w-6 h-6" />
          </div>
          <span class="font-mono text-xs text-neutral-500">ID: #{{ loc.id }}</span>
        </div>
        <h3 class="text-xl font-bold text-white mb-1">{{ loc.name }}</h3>
        <p class="text-sm text-neutral-400 mb-4">{{ loc.address }}</p>
        <div class="flex justify-between items-center pt-4 border-t border-neutral-700/50">
          <span class="text-xs text-neutral-500 italic">Mgr: {{ loc.manager }}</span>
          <div class="flex gap-2">
            <button class="p-2 text-neutral-400 hover:text-white"><Edit2 class="w-4 h-4" /></button>
            <button class="p-2 text-neutral-400 hover:text-red-500"><Trash2 class="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>