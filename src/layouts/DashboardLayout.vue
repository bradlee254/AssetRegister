<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  UserCheck, 
  LogOut, 
  Shield,
  FileText,
  Clock,
  ChevronRight,
  MapPin,
  Building2,
  Box,
  FolderTree,
  Bell,
  Settings,
  Search,
  MoreHorizontal
} from 'lucide-vue-next'
import { AuthService } from '../services/auth.service'

const router = useRouter()
const route = useRoute()

const isInventoryExpanded = ref(false)
const isNavMinimized = ref(false)

const handleLogout = () => {
  AuthService.logout()
  router.push('/login')
}

const mainNav = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'violet' },
  { to: '/reports', icon: FileText, label: 'Reports', color: 'cyan' },
  { to: '/audit-logs', icon: Clock, label: 'Audit Logs', color: 'amber' },
  { to: '/users', icon: UserCheck, label: 'Users', color: 'emerald' }
]

const inventoryItems = [
  { to: '/assets', icon: Box, label: 'Assets' },
  { to: '/categories', icon: Layers, label: 'Categories' },
  { to: '/locations', icon: MapPin, label: 'Locations' },
  { to: '/departments', icon: Building2, label: 'Departments' },
  { to: '/assignments', icon: UserCheck, label: 'Assignments' },
  { to: '/licences', icon: FolderTree, label: 'Licences' }
]

const getColorClasses = (color, isActive) => {
  const colors = {
    violet: isActive ? 'bg-violet-500 text-white' : 'bg-violet-500/10 text-violet-600 hover:bg-violet-500/20',
    cyan: isActive ? 'bg-cyan-500 text-white' : 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20',
    amber: isActive ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20',
    emerald: isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
  }
  return colors[color] || colors.violet
}

const isInventoryRoute = () => {
  return inventoryItems.some(item => route.path.includes(item.to.slice(1)))
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-slate-100">
    
    <!-- Floating Sidebar -->
    <aside 
      class="flex flex-col bg-white m-4 rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300"
      :class="isNavMinimized ? 'w-20' : 'w-80'"
    >
      
      <!-- Header with Logo -->
      <div class="p-6 border-b border-slate-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3" :class="isNavMinimized ? 'justify-center' : ''">
            <div class="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield class="w-7 h-7 text-white" />
            </div>
            <div v-if="!isNavMinimized">
              <h1 class="text-lg font-bold text-slate-900">AssetRegister</h1>
              <p class="text-xs text-slate-500">Command Center</p>
            </div>
          </div>
          <button 
            v-if="!isNavMinimized"
            @click="isNavMinimized = true"
            class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight class="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div v-if="!isNavMinimized" class="p-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
          >
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        
        <!-- Main Navigation Items -->
        <div class="space-y-1">
          <router-link 
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium"
            :class="getColorClasses(item.color, route.path === item.to)"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="!isNavMinimized">{{ item.label }}</span>
          </router-link>
        </div>

        <!-- Inventory Expandable Section -->
        <div class="pt-4">
          <button 
            @click="isInventoryExpanded = !isInventoryExpanded"
            class="w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-medium"
            :class="isInventoryRoute() ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'"
          >
            <div class="flex items-center gap-3">
              <Package class="w-5 h-5 flex-shrink-0" />
              <span v-if="!isNavMinimized">Inventory</span>
            </div>
            <ChevronRight 
              v-if="!isNavMinimized"
              class="w-4 h-4 transition-transform duration-200" 
              :class="{ 'rotate-90': isInventoryExpanded }" 
            />
          </button>

          <!-- Inventory Subitems -->
          <div 
            v-if="isInventoryExpanded && !isNavMinimized" 
            class="mt-2 ml-4 pl-4 border-l-2 border-emerald-200 space-y-1"
          >
            <router-link 
              v-for="item in inventoryItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-sm"
              active-class="text-emerald-600 bg-emerald-50 font-semibold"
            >
              <component :is="item.icon" class="w-4 h-4" />
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>
        

      </nav>

      <!-- Bottom Section - User Profile -->
      <div class="p-4 border-t border-slate-200">
        <div v-if="!isNavMinimized" class="mb-3">
          <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div class="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              {{ AuthService.user?.name?.charAt(0) || 'A' }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-900 truncate">{{ AuthService.user?.name || 'Admin' }}</p>
              <p class="text-xs text-slate-500">Administrator</p>
            </div>
            <button class="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
              <MoreHorizontal class="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div class="flex gap-2">
          <button 
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            :class="isNavMinimized ? 'flex-col' : ''"
          >
            <Settings class="w-5 h-5 text-slate-600" />
            <span v-if="!isNavMinimized" class="text-sm font-medium text-slate-700">Settings</span>
          </button>
          <button 
            @click="handleLogout"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
            :class="isNavMinimized ? 'flex-col' : ''"
          >
            <LogOut class="w-5 h-5" />
            <span v-if="!isNavMinimized" class="text-sm font-medium">Logout</span>
          </button>
        </div>

        <button 
          v-if="isNavMinimized"
          @click="isNavMinimized = false"
          class="w-full mt-3 p-2 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center"
        >
          <ChevronRight class="w-4 h-4 text-slate-600 rotate-180" />
        </button>
      </div>

    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      
      <!-- Top Bar -->
      <header class="bg-white m-4 mb-0 rounded-t-2xl shadow-lg border border-slate-200 px-8 py-5">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Welcome Back!</h2>
            <p class="text-sm text-slate-500 mt-1">Here's your asset overview for today</p>
          </div>
          
          <div class="flex items-center gap-3">
            <button class="relative p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell class="w-5 h-5 text-slate-600" />
              <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto bg-white mx-4 mb-4 rounded-b-2xl shadow-lg border border-t-0 border-slate-200">
        <div class="p-8">
          <router-view />
        </div>
      </main>

    </div>
  </div>
</template>