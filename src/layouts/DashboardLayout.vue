<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  UserCheck, 
  Settings, 
  LogOut, 
  Shield,
  FileText,
  Clock
} from 'lucide-vue-next'
import { AuthService } from '../services/auth.service'

const router = useRouter()
const isSidebarOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Assets', icon: Package, path: '/assets' },
  { name: 'Categories', icon: Layers, path: '/categories' },
  { name: 'Assignments', icon: UserCheck, path: '/assignments' },
  { name: 'Reports', icon: FileText, path: '/reports' },
  { name: 'Audit Logs', icon: Clock, path: '/audit-logs' },
]

const handleLogout = () => {
  AuthService.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden text-neutral-100 bg-neutral-900">
    <aside class="w-64 bg-neutral-900/50 backdrop-blur-xl border-r border-neutral-800 flex flex-col h-full">
      <div class="p-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
          <Shield class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight">AssetReg</span>
      </div>

      <nav class="flex-1 px-4 py-4 space-y-1">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-green-600/10 hover:text-green-400"
          active-class="bg-green-600 text-white hover:bg-green-600 hover:text-white"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t border-neutral-800">
        <button 
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-4 py-3 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut class="w-5 h-5" />
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 border-b border-neutral-800 bg-neutral-900/30 backdrop-blur-md flex items-center justify-between px-8">
        <h2 class="text-sm font-semibold uppercase tracking-widest text-neutral-500">System Overview</h2>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-sm font-medium">{{ AuthService.user?.name || 'Admin' }}</p>
            <p class="text-xs text-neutral-500">Administrator</p>
          </div>
          <div class="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center font-bold text-green-400">
            {{ AuthService.user?.name?.charAt(0) || 'A' }}
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8 bg-neutral-900/10">
        <router-view />
      </main>
    </div>
  </div>
</template>