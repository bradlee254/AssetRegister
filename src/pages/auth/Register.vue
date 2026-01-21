<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Shield, User, Mail, Lock, ArrowRight } from 'lucide-vue-next'
import { AuthService } from '../../services/auth.service'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  isLoading.ref = true
  errorMessage.value = ''
  try {
    await AuthService.register(form.value)
    router.push('/login')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed. Please try again.'
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
        <h2 class="text-3xl font-bold text-white">Create Account</h2>
        <p class="text-neutral-400 mt-2 text-center">Join us to start managing your assets securely.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5 bg-neutral-800 p-8 rounded-2xl border border-neutral-700">
        <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
          <div class="relative">
            <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input v-model="form.name" type="text" required placeholder="John Doe" 
                   class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input v-model="form.email" type="email" required placeholder="name@company.com" 
                   class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input v-model="form.password" type="password" required placeholder="••••••••" 
                     class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">Confirm</label>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input v-model="form.password_confirmation" type="password" required placeholder="••••••••" 
                     class="w-full bg-neutral-900 border border-neutral-700 text-white pl-11 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all">
            </div>
          </div>
        </div>

        <button :disabled="isLoading" type="submit" 
                class="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-500 flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20 disabled:opacity-50">
          {{ isLoading ? 'Creating Account...' : 'Register' }}
          <ArrowRight v-if="!isLoading" class="w-5 h-5" />
        </button>

        <p class="text-center text-neutral-500 text-sm mt-6">
          Already have an account? 
          <router-link to="/login" class="text-green-400 font-semibold hover:text-green-300">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>