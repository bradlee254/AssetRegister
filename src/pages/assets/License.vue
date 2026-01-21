<script setup>
import { ref } from 'vue'
import { 
  Plus, 
  Search, 
  Filter, 
  Key,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  MoreVertical,
  ExternalLink,
  CreditCard
} from 'lucide-vue-next'

const licenses = ref([
  { 
    id: 1, 
    name: 'Adobe Creative Cloud', 
    vendor: 'Adobe Inc.',
    license_key: 'XXXX-REDACTED-XXXX',
    category: 'Design',
    purchase_date: '2024-01-10',
    expiry_date: '2025-01-10',
    seats: '25/50',
    cost: 1200,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Microsoft 365 Business', 
    vendor: 'Microsoft',
    license_key: 'MSFT-O365-PREM',
    category: 'Productivity',
    purchase_date: '2023-06-15',
    expiry_date: '2024-06-15',
    seats: '190/200',
    cost: 4500,
    status: 'expiring_soon'
  },
  { 
    id: 3, 
    name: 'JetBrains All Products Pack', 
    vendor: 'JetBrains',
    license_key: 'JB-DEV-9922',
    category: 'Development',
    purchase_date: '2023-03-01',
    expiry_date: '2024-03-01',
    seats: '10/10',
    cost: 850,
    status: 'expired'
  }
])

const getStatusConfig = (status) => {
  switch (status) {
    case 'active': 
      return { class: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: 'Active' }
    case 'expiring_soon': 
      return { class: 'bg-amber-50 text-amber-600 border-amber-200', label: 'Expiring Soon' }
    case 'expired': 
      return { class: 'bg-rose-50 text-rose-600 border-rose-200', label: 'Expired' }
    default: 
      return { class: 'bg-slate-100 text-slate-600 border-slate-200', label: status }
  }
}
</script>

<template>
  <div class="space-y-6 text-slate-900">
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">Software Licenses</h1>
        <p class="text-slate-500 text-base">Manage software subscriptions and seat allocations</p>
      </div>
      <button class="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all shadow-lg shadow-violet-600/30">
        <Plus class="w-5 h-5" />
        Register License
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-violet-50 rounded-xl text-violet-600">
            <Key class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Total Licenses</p>
            <p class="text-2xl font-bold">128</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-rose-50 rounded-xl text-rose-600">
            <AlertTriangle class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Expired/Expiring</p>
            <p class="text-2xl font-bold">7</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CreditCard class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Monthly Spend</p>
            <p class="text-2xl font-bold">$12,450</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type="text" placeholder="Search by software or vendor..." 
               class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none">
      </div>
      <button class="px-4 py-3 border border-slate-200 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50">
        <Filter class="w-4 h-4" /> Filter
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left">
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Software & Vendor</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Key / Reference</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Seats / Utilization</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Expiry Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="license in licenses" :key="license.id" class="hover:bg-slate-50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <ShieldCheck class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold">{{ license.name }}</div>
                    <div class="text-xs text-slate-500">{{ license.vendor }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <code class="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">{{ license.license_key }}</code>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1.5">
                  <div class="flex justify-between text-xs font-medium">
                    <span>{{ license.seats }} Seats</span>
                  </div>
                  <div class="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="bg-violet-500 h-full" :style="{ width: '70%' }"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar class="w-4 h-4" />
                  {{ license.expiry_date }}
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusConfig(license.status).class" 
                      class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border">
                  {{ getStatusConfig(license.status).label }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 hover:bg-violet-50 rounded-lg text-slate-400 hover:text-violet-600">
                    <ExternalLink class="w-4 h-4" />
                  </button>
                  <button class="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                    <MoreVertical class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>