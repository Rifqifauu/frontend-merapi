<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center md:text-left">Manajemen Komunitas</h1>

    <!-- Form Tambah/Edit -->
    <form
      @submit.prevent="submitForm"
      class="space-y-4 bg-white shadow-md rounded-xl p-4 md:p-6 mb-10"
    >
      <h2 class="text-xl font-semibold mb-2">{{ isEditing ? 'Edit' : 'Tambah' }} Komunitas</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="field in fields" :key="field.name" class="flex flex-col">
          <label class="font-medium mb-1">{{ field.label }}</label>
          <input
            v-if="field.type === 'text'"
            v-model="form[field.name]"
            type="text"
            class="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            :required="field.required"
          />
          <input
            v-else-if="field.type === 'file'"
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="w-full"
          />
          <div v-if="field.name === 'logo' && preview" class="mt-2">
            <img :src="preview" alt="Preview" class="h-20 rounded shadow object-contain" />
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1 sm:flex-none"
        >
          {{ isEditing ? 'Update' : 'Simpan' }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          @click="resetForm"
          class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 flex-1 sm:flex-none"
        >
          Batal
        </button>
      </div>
    </form>

    <!-- Tabel Daftar Komunitas -->
    <div class="bg-white shadow-md rounded-xl p-4 md:p-6">
      <h2 class="text-xl font-semibold mb-4">Daftar Komunitas</h2>

      <!-- Mobile Card View -->
      <div class="space-y-4 md:hidden">
        <div
          v-for="item in communities"
          :key="item.id"
          class="border rounded-lg p-4 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-3">
            <img
              v-if="item.logo"
              :src="`https://asosiasijeepmerapi.com/storage/${item.logo}`"
              class="h-12 w-12 object-cover rounded-full"
            />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button
              @click="editCommunity(item)"
              class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex-1"
            >
              Edit
            </button>
            <button
              @click="deleteCommunity(item.id)"
              class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex-1"
            >
              Hapus
            </button>
          </div>
        </div>
        <p v-if="communities.length === 0" class="text-center text-gray-500">Belum ada data</p>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full border-collapse min-w-[600px]">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="border px-3 py-2">Logo</th>
              <th class="border px-3 py-2">Nama</th>
  
              <th class="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in communities" :key="item.id">
              <td class="border px-3 py-2">
                <img
                  v-if="item.logo"
                  :src="`https://asosiasijeepmerapi.com/storage/${item.logo}`"
                  class="h-12 w-12 object-cover rounded-full"
                />
              </td>
              <td class="border px-3 py-2">{{ item.name }}</td>

              <td class="border px-3 py-2 space-x-2">
                <button
                  @click="editCommunity(item)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  @click="deleteCommunity(item.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
            <tr v-if="communities.length === 0">
              <td colspan="5" class="text-center text-gray-500 py-4">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({ layout: 'dashboard', ssr: false });

const API_URL = "https://api.asosiasijeepmerapi.com/api/communities";
const TOKEN = localStorage.getItem("token");

const communities = ref([]);
const isEditing = ref(false);
const preview = ref(null);
const form = ref({
  id: null,
  name: "",
  instagram: "",
  tiktok: "",
  twitter: "",
  whatsapp: "",
  facebook: "",
  logo: null,
});

// Fields untuk form
const fields = [
  { name: 'name', label: 'Nama Komunitas', type: 'text', required: true },
  { name: 'instagram', label: 'Instagram', type: 'text' },
  { name: 'tiktok', label: 'TikTok', type: 'text' },
  { name: 'twitter', label: 'Twitter', type: 'text' },
  { name: 'whatsapp', label: 'Whatsapp', type: 'text' },
  { name: 'facebook', label: 'Facebook', type: 'text' },
  { name: 'logo', label: 'Logo', type: 'file' },
];

// Fetch data communities
const fetchCommunities = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    communities.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Handle file preview
const handleFileUpload = (e) => {
  form.value.logo = e.target.files[0];
  preview.value = URL.createObjectURL(e.target.files[0]);
};

// Simpan / update data
const submitForm = async () => {
  const formData = new FormData();
  Object.keys(form.value).forEach((key) => {
    if (form.value[key] !== null) formData.append(key, form.value[key]);
  });

  try {
    if (isEditing.value) {
      await axios.post(`${API_URL}/${form.value.id}?_method=PUT`, formData, {
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "multipart/form-data" },
      });
    } else {
      await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "multipart/form-data" },
      });
    }
    resetForm();
    fetchCommunities();
  } catch (err) {
    console.error(err);
  }
};

// Edit
const editCommunity = (item) => {
  form.value = { ...item, logo: null };
  preview.value = item.logo ? `https://asosiasijeepmerapi.com/storage/${item.logo}` : null;
  isEditing.value = true;
};

// Reset form
const resetForm = () => {
  form.value = {
    id: null,
    name: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    whatsapp: "",
    facebook: "",
    logo: null,
  };
  preview.value = null;
  isEditing.value = false;
};

// Delete
const deleteCommunity = async (id) => {
  if (!confirm("Yakin ingin menghapus?")) return;
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    fetchCommunities();
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchCommunities);
</script>
