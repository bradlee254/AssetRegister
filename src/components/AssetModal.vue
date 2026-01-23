<script setup>
import { ref, watch } from "vue";
import { X, Save, Loader2 } from "lucide-vue-next";

const props = defineProps({
  isOpen: Boolean,
  loading: Boolean,
  categories: Array,
  initial: Object,
  assetTypes: Array,
  locations: Array,
  departments: Array,
  depreciationMethods: Array,
});

const emit = defineEmits(["close", "submit"]);

const defaultDate = new Date().toISOString().split("T")[0];

const form = ref({
  name: "",
  serial_number: "",
  type: "physical",
  asset_type_id: "",
  category_id: "",
  location_id: "",
  department_id: "",
  depreciation_method_id: "",
  status: "active",
  purchase_date: defaultDate,
  purchase_cost: 0,
  useful_life_years: 5,
  description: "",
  notes: "",
});

// populate form when editing or when initial changes
const populate = (init) => {
  if (!init) return;
  Object.assign(form.value, {
    name: init.name ?? form.value.name,
    serial_number: init.serial_number ?? form.value.serial_number,
    type: init.type ?? form.value.type,
    asset_type_id: init.asset_type_id ?? form.value.asset_type_id,
    category_id: init.category_id ?? form.value.category_id,
    location_id: init.location_id ?? form.value.location_id,
    department_id: init.department_id ?? form.value.department_id,
    depreciation_method_id:
      init.depreciation_method_id ?? form.value.depreciation_method_id,
    status: init.status ?? form.value.status,
    purchase_date: init.purchase_date ?? form.value.purchase_date,
    purchase_cost: init.purchase_cost ?? form.value.purchase_cost,
    useful_life_years: init.useful_life_years ?? form.value.useful_life_years,
    description: init.description ?? form.value.description,
    notes: init.notes ?? form.value.notes,
  });
};

if (props.initial) populate(props.initial);

watch(
  () => props.initial,
  (v) => {
    if (v) populate(v);
  },
);

const closeModal = () => {
  // Optional: Reset form here
  emit("close");
};

const handleSubmit = () => {
  // Ensure we send numbers to the API
  const payload = {
    name: form.value.name,
    serial_number: form.value.serial_number,
    type: form.value.type,
    asset_type_id: parseInt(form.value.asset_type_id),
    category_id: parseInt(form.value.category_id),
    location_id: parseInt(form.value.location_id),
    department_id: parseInt(form.value.department_id),
    depreciation_method_id: parseInt(form.value.depreciation_method_id),
    purchase_date: form.value.purchase_date,
    purchase_cost: parseFloat(form.value.purchase_cost),
    useful_life_years: parseInt(form.value.useful_life_years),
    status: form.value.status,
    description: form.value.description,
    notes: form.value.notes,
  };

  emit("submit", payload);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <div
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      @click="closeModal"
    ></div>

    <div
      class="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <div
        class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50"
      >
        <h3 class="text-xl font-bold text-slate-900">Add New Asset</h3>
        <button
          @click="closeModal"
          class="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form
        @submit.prevent="handleSubmit"
        class="p-6 space-y-6 overflow-y-auto"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Asset Name</label
            >
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all"
              placeholder="e.g. MacBook Pro M3"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Category</label
            >
            <select
              v-model="form.category_id"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="">Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Serial Number</label
            >
            <input
              v-model="form.serial_number"
              type="text"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
              placeholder="SN-123456789"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Type</label
            >
            <select
              v-model="form.type"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="physical">Physical</option>
              <option value="digital">Digital</option>
              <option value="license">License</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Asset Type</label
            >
            <select
              v-model="form.asset_type_id"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="">Select asset type</option>
              <option v-for="t in assetTypes || []" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Purchase Date</label
            >
            <input
              v-model="form.purchase_date"
              type="date"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Cost ($)</label
            >
            <input
              v-model="form.purchase_cost"
              type="number"
              step="0.01"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Useful Life (Yrs)</label
            >
            <input
              v-model="form.useful_life_years"
              type="number"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Location</label
            >
            <select
              v-model="form.location_id"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="">Select location</option>
              <option
                v-for="loc in locations || []"
                :key="loc.id"
                :value="loc.id"
              >
                {{ loc.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Department</label
            >
            <select
              v-model="form.department_id"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="">Select department</option>
              <option v-for="d in departments || []" :key="d.id" :value="d.id">
                {{ d.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1"
              >Depreciation Method</label
            >
            <select
              v-model="form.depreciation_method_id"
              required
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            >
              <option value="">Select method</option>
              <option
                v-for="m in depreciationMethods || []"
                :key="m.id"
                :value="m.id"
              >
                {{ m.name }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            placeholder="Add technical details or specifications..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1"
            >Notes</label
          >
          <textarea
            v-model="form.notes"
            rows="2"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500"
            placeholder="Additional notes, warranty info, etc."
          ></textarea>
        </div>

        <div class="flex gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
            <Save v-else class="w-5 h-5" />
            <span>{{ loading ? "Saving..." : "Register Asset" }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
