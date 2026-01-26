<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, MapPin, Trash2, Edit2, Building2, Package, Users, Loader2 } from 'lucide-vue-next'
import { LocationService } from '../../services/location.service'
import { useToast } from '../../composables/useToast'
import LocationModal from '../../components/LocationModal.vue'

const locations = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const selectedLocation = ref<any>(null)
const { addToast } = useToast()

const fetchLocations = async () => {
  isLoading.value = true
  try {
    const res = await LocationService.getLocations()
    // Aligning with your typical API response structure
    locations.value = res.data?.data || res.data || res || []
  } catch (error: any) {
    addToast('Failed to load locations', 'error')
  } finally {
    isLoading.value = false
  }
}

const openCreate = () => {
  selectedLocation.value = null
  isModalOpen.value = true
}

const openEdit = (loc: any) => {
  selectedLocation.value = { ...loc }
  isModalOpen.value = true
}

const handleSubmit = async (formData: any) => {
  isSubmitting.value = true
  try {
    if (selectedLocation.value) {
      await LocationService.updateLocation(selectedLocation.value.id, formData)
      addToast('Location updated successfully', 'success')
    } else {
      await LocationService.createLocation(formData)
      addToast('Location created successfully', 'success')
    }
    await fetchLocations()
    isModalOpen.value = false
  } catch (error: any) {
    addToast(error.response?.data?.message || 'Operation failed', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const deleteLoc = async (id: number) => {
  if (!confirm('Remove this location?')) return
  try {
    await LocationService.deleteLocation(id)
    addToast('Location removed', 'success')
    await fetchLocations()
  } catch (error: any) {
    addToast('Could not delete location', 'error')
  }
}

const stats = computed(() => ({
  total: locations.value.length,
  // These rely on backend relations (asset_count, etc)
  totalAssets: locations.value.reduce((sum, l) => sum + (l.asset_count || 0), 0),
  totalStaff: locations.value.reduce((sum, l) => sum + (l.staff_count || 0), 0),
  avgAssets: locations.value.length > 0 
    ? Math.round(locations.value.reduce((sum, l) => sum + (l.asset_count || 0), 0) / locations.value.length) 
    : 0
}))

onMounted(fetchLocations)
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Locations</h1>
        <p class="text-slate-500 mt-1">Physical sites where assets are registered</p>
      </div>
      <button @click="openCreate" class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" /> Add Location
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(val, label) in { 'Total Sites': stats.total, 'Total Assets': stats.totalAssets, 'Total Staff': stats.totalStaff, 'Avg/Site': stats.avgAssets }" :key="label" class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div class="p-2.5 bg-violet-50 rounded-lg text-violet-600"><MapPin class="w-5 h-5" /></div>
        <div>
          <p class="text-xs font-bold text-slate-500 uppercase">{{ label }}</p>
          <p class="text-2xl font-bold text-slate-900">{{ val }}</p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center py-20">
      <Loader2 class="w-10 h-10 animate-spin text-violet-600 mb-4" />
      <p class="text-slate-500">Syncing locations...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="loc in locations" :key="loc.id" class="bg-white border border-slate-200 rounded-xl p-6 hover:border-violet-300 transition-all group">
        <div class="flex justify-between items-start mb-5">
          <div class="p-3 bg-violet-50 rounded-xl text-violet-600"><MapPin class="w-7 h-7" /></div>
          <span :class="loc.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'" class="text-xs font-bold px-2.5 py-1 rounded-lg border">
            {{ loc.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <h3 class="text-lg font-bold text-slate-900 mb-1">{{ loc.name }}</h3>
        <p class="text-sm text-slate-500 mb-4">{{ loc.building }}, {{ loc.floor }} - {{ loc.room }}</p>

        <div class="grid grid-cols-2 gap-3 mb-5 text-sm font-semibold">
          <div class="bg-slate-50 rounded-lg p-3 text-slate-600">Assets: {{ loc.asset_count || 0 }}</div>
          <div class="bg-slate-50 rounded-lg p-3 text-slate-600">Staff: {{ loc.staff_count || 0 }}</div>
        </div>

        <div class="flex justify-between items-center pt-5 border-t border-slate-100">
          <p class="text-xs text-slate-400 italic">{{ loc.description || 'No description' }}</p>
          <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click="openEdit(loc)" class="p-2 hover:bg-violet-50 text-slate-400 hover:text-violet-600 rounded-lg"><Edit2 class="w-4 h-4" /></button>
            <button @click="deleteLoc(loc.id)" class="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg"><Trash2 class="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>

    <LocationModal 
      :is-open="isModalOpen" 
      :loading="isSubmitting" 
      :initial="selectedLocation" 
      @close="isModalOpen = false" 
      @submit="handleSubmit" 
    />
  </div>
</template>