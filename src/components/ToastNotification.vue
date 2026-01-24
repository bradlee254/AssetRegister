<script setup lang="ts">
import { useToast, type ToastType } from '../composables/useToast'
import { 
  CheckCircle, AlertCircle, Info, X, 
  AlertTriangle, type LucideIcon 
} from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const icons: Record<ToastType, LucideIcon> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const styles: Record<ToastType, string> = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

const iconColors: Record<ToastType, string> = {
  success: 'text-emerald-500',
  error: 'text-rose-500',
  warning: 'text-amber-500',
  info: 'text-blue-500'
}
</script>

<template>
  <div class="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-xs pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-10 opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="[styles[toast.type]]"
        class="flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md pointer-events-auto"
      >
        <component 
          :is="icons[toast.type]" 
          :class="[iconColors[toast.type]]" 
          class="w-5 h-5 mt-0.5 shrink-0" 
        />
        
        <div class="flex-1 text-sm font-medium">
          {{ toast.message }}
        </div>

        <button 
          @click="removeToast(toast.id)" 
          class="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>