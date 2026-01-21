<script setup>
import { ref } from 'vue'
import { Plus, Users, Building2 } from 'lucide-vue-next'

const departments = ref([
  { id: 1, name: 'IT & Infrastructure', head: 'Mike Tech', staff_count: 12 },
  { id: 2, name: 'Finance', head: 'Alice Money', staff_count: 5 }
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center text-white">
      <h1 class="text-2xl font-bold">Departments</h1>
      <button class="bg-green-600 px-4 py-2 rounded-xl font-bold text-sm">+ Add Dept</button>
    </div>

    <div class="bg-neutral-800/40 border border-neutral-700/50 rounded-2xl overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-neutral-900/50 text-neutral-400 text-xs uppercase">
          <tr>
            <th class="px-6 py-4">ID</th>
            <th class="px-6 py-4">Department Name</th>
            <th class="px-6 py-4">Dept. Head</th>
            <th class="px-6 py-4 text-center">Staff Count</th>
            <th class="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody class="text-neutral-300">
          <tr v-for="dept in departments" :key="dept.id" class="border-t border-neutral-700/50 hover:bg-neutral-700/10">
            <td class="px-6 py-4 font-mono text-xs text-green-500">#{{ dept.id }}</td>
            <td class="px-6 py-4 font-bold text-white">{{ dept.name }}</td>
            <td class="px-6 py-4">{{ dept.head }}</td>
            <td class="px-6 py-4 text-center">{{ dept.staff_count }}</td>
            <td class="px-6 py-4 text-right">
                <button class="text-neutral-500 hover:text-white px-2">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>