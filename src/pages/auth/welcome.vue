<script setup>
import { Shield, BarChart3, FolderTree, Users } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-neutral-900 relative">
    <!-- Background Image -->
    <div class="fixed inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
        alt="Asset Management Background"
        class="w-full h-full object-cover opacity-15"
      />
      <div class="absolute inset-0 "></div>
    </div>
    
    <!-- Content Overlay -->
    <div class="relative z-10">
    <!-- Navbar -->
    <nav class="flex justify-between items-center px-8 py-6 border-b border-neutral-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <Shield class="w-6 h-6 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-white">
          Asset Register
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <router-link
          to="/login"
          class="px-5 py-2.5 text-neutral-300 font-medium hover:text-white transition-colors"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-all duration-200 shadow-lg shadow-green-600/20"
        >
          Get Started
        </router-link>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="flex flex-col items-center text-center px-8 pt-32 pb-20">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full mb-8">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span class="text-sm text-neutral-300">Enterprise Asset Management</span>
      </div>

      <h2 class="text-5xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
        Manage, Track & Secure
        <span class="block mt-2 text-green-400">Your Assets with Confidence</span>
      </h2>

      <p class="mt-8 text-xl text-neutral-400 max-w-2xl leading-relaxed">
        A modern asset management system designed to help organizations
        track physical and digital assets efficiently and securely.
      </p>

      <!-- <div class="mt-12 flex gap-5">
        <router-link
          to="/register"
          class="px-10 py-4 bg-green-600 text-white font-semibold rounded-xl text-lg hover:bg-green-500 transition-all duration-200 shadow-xl shadow-green-600/25"
        >
          Create Account
        </router-link>
        <router-link
          to="/login"
          class="px-10 py-4 bg-neutral-800 border-2 border-neutral-700 text-white font-semibold rounded-xl text-lg hover:border-green-500 hover:bg-neutral-800/50 transition-all duration-200"
        >
          Sign In
        </router-link>
      </div> -->

      <!-- Stats -->
      <div class="mt-24 grid grid-cols-3 gap-12 max-w-3xl w-full">
        <div class="text-center">
          <div class="text-4xl font-bold text-green-400 mb-2">10K+</div>
          <div class="text-neutral-500 font-medium">Assets Tracked</div>
        </div>
        <div class="text-center border-x border-neutral-800">
          <div class="text-4xl font-bold text-green-400 mb-2">500+</div>
          <div class="text-neutral-500 font-medium">Organizations</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-green-400 mb-2">99.9%</div>
          <div class="text-neutral-500 font-medium">Uptime</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-8 max-w-7xl mx-auto pb-32">
      <div class="text-center mb-16">
        <h3 class="text-3xl font-bold text-white mb-4">Powerful Features</h3>
        <p class="text-neutral-400 text-lg">Everything you need to manage your assets effectively</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Feature Card 1 -->
        <div class="group relative bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
          <div class="relative">
            <div class="w-14 h-14 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/10 transition-colors duration-300">
              <Shield class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Asset Tracking</h3>
            <p class="text-neutral-400 leading-relaxed">Monitor all assets in one centralized system with real-time updates and notifications.</p>
          </div>
        </div>

        <!-- Feature Card 2 -->
        <div class="group relative bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
          <div class="relative">
            <div class="w-14 h-14 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/10 transition-colors duration-300">
              <FolderTree class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Categorization</h3>
            <p class="text-neutral-400 leading-relaxed">Organize assets into meaningful categories and subcategories for easy management.</p>
          </div>
        </div>

        <!-- Feature Card 3 -->
        <div class="group relative bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
          <div class="relative">
            <div class="w-14 h-14 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/10 transition-colors duration-300">
              <BarChart3 class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Reports & Insights</h3>
            <p class="text-neutral-400 leading-relaxed">Generate comprehensive reports for audits, analytics, and informed decisions.</p>
          </div>
        </div>

        <!-- Feature Card 4 -->
        <div class="group relative bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-green-500 transition-all duration-300 hover:-translate-y-1">
          <div class="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
          <div class="relative">
            <div class="w-14 h-14 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/10 transition-colors duration-300">
              <Users class="w-7 h-7 text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">User Management</h3>
            <p class="text-neutral-400 leading-relaxed">Control access with secure role-based permissions and team collaboration tools.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section
    <section class="px-8 py-20 border-t border-neutral-800">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-4xl font-bold text-white mb-6">
          Ready to streamline your asset management?
        </h3>
        <p class="text-neutral-400 text-lg mb-10">
          Join hundreds of organizations already managing their assets efficiently.
        </p>
        <router-link
          to="/register"
          class="inline-block px-10 py-4 bg-green-600 text-white font-semibold rounded-xl text-lg hover:bg-green-500 transition-all duration-200 shadow-xl shadow-green-600/25"
        >
          Start Free Trial
        </router-link>
      </div>
    </section> -->

    <!-- Footer -->
    <footer class="py-8 border-t border-neutral-800 text-center text-neutral-500">
      <p>© {{ new Date().getFullYear() }} Asset Register System. All rights reserved.</p>
    </footer>
    </div>
  </div>
</template>