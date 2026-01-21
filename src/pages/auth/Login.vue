<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Shield, Mail, Lock, LogIn } from 'lucide-vue-next'
import { AuthService } from '../../services/auth.service'

const router = useRouter()
const form = ref({ email: '', password: '' })
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await AuthService.login(form.value)
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = 'Invalid credentials. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="flex flex-col items-center mb-10">
        <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
          <Shield class="w-7 h-7 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-white">Welcome Back</h2>
        <p class="text-neutral-400 mt-2 text-center">Login to your asset register portal</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 bg-neutral-800 p-8 rounded-2xl border border-neutral-700 shadow-2xl">
        <div v-if="errorMessage" class="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input v-model="form.email" type="email" required placeholder="name@company.com" 
                   class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
          </div>
        </div>

        <div>
          <div class="flex justify-between mb-2">
            <label class="text-sm font-medium text-neutral-300">Password</label>
            <a href="#" class="text-sm text-green-400 hover:text-green-300">Forgot Password?</a>
          </div>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input v-model="form.password" type="password" required placeholder="••••••••" 
                   class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
          </div>
        </div>

        <div class="flex items-center">
          <input id="remember" type="checkbox" class="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-green-600 focus:ring-green-600">
          <label for="remember" class="ml-2 text-sm text-neutral-400">Remember this device</label>
        </div>

        <button :disabled="isLoading" type="submit" 
                class="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20 disabled:opacity-50">
          {{ isLoading ? 'Authenticating...' : 'Sign In' }}
          <LogIn v-if="!isLoading" class="w-5 h-5" />
        </button>

        <p class="text-center text-neutral-500 text-sm mt-6">
          Don't have an account yet? 
          <router-link to="/register" class="text-green-400 font-semibold hover:text-green-300">Create Account</router-link>
        </p>
      </form>
    </div>
  </div>
</template>