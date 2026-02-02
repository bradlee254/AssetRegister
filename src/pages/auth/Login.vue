<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Shield, Mail, Lock, LogIn } from 'lucide-vue-next'
import { AuthService } from '../../services/auth.service'
import { useToast } from '../../composables/useToast'

const router = useRouter()
const form = ref({ email: '', password: '' })
const isLoading = ref(false)
const errorMessage = ref('')
let { addToast } = useToast()

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await AuthService.login(form.value)
    addToast('Login successful', 'success')
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = 'Invalid credentials. Please try again.'
    addToast('Invalid credentials', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-900 relative flex items-center justify-center p-6">
    <!-- Background Image -->
    <div class="fixed inset-0 z-0">
      <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Asset Management Background"
          class="w-full h-full object-cover opacity-15"
      />
    </div>

    <div class="w-full max-w-md relative z-10">

      <!-- Header -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-600/20">
          <Shield class="w-8 h-8 text-white" />
        </div>

        <h2 class="text-3xl font-bold text-white">Welcome Back</h2>
        <p class="text-neutral-400 mt-2 text-center">
          Login to your asset register portal
        </p>
      </div>

      <!-- Card -->
      <form
          @submit.prevent="handleLogin"
          class="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-3xl border border-neutral-700 space-y-6 shadow-2xl"
      >

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">
            Email Address
          </label>
          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
                v-model="form.email"
                type="email"
                required
                placeholder="name@company.com"
                class="w-full pl-11 pr-4 py-4 rounded-xl bg-neutral-900/50 border border-neutral-700
              text-white placeholder-neutral-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
              transition-all duration-200"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <div class="flex justify-between mb-2">
            <label class="text-sm font-medium text-neutral-300">Password</label>
            <a href="#" class="text-sm text-green-400 hover:text-green-300 transition-colors">
              Forgot Password?
            </a>
          </div>

          <div class="relative">
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
                v-model="form.password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full pl-11 pr-4 py-4 rounded-xl bg-neutral-900/50 border border-neutral-700
              text-white placeholder-neutral-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
              transition-all duration-200"
            />
          </div>
        </div>

        <!-- Remember -->
        <div class="flex items-center">
          <input
              id="remember"
              type="checkbox"
              class="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-green-600 focus:ring-green-500 focus:ring-offset-neutral-800"
          />
          <label for="remember" class="ml-2 text-sm text-neutral-400">
            Remember this device
          </label>
        </div>

        <!-- Button -->
        <button
            :disabled="isLoading"
            type="submit"
            class="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500
          text-white font-semibold flex items-center justify-center gap-2
          transition-all duration-200 shadow-lg shadow-green-600/20 disabled:opacity-50"
        >
          {{ isLoading ? 'Authenticating...' : 'Sign In' }}
          <LogIn v-if="!isLoading" class="w-5 h-5" />
        </button>

        <!-- Footer -->
        <p class="text-center text-neutral-400 text-sm mt-6">
          Don't have an account yet?
          <router-link
              to="/register"
              class="font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            Create Account
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>
