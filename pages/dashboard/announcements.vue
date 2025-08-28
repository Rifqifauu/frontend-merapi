<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({ layout: 'dashboard',   ssr: false
 });

// Ambil token dari localStorage
const token = localStorage.getItem('token') || '';

// Axios instance dengan Bearer token
const api = axios.create({
  baseURL: "https://api.asosiasijeepmerapi.com/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

const announcements = ref([]);
const form = ref({ id: null, title: "", content: "" });
const isEditing = ref(false);
const loading = ref(false);
const error = ref('');
const success = ref('');

// Auto hide notifications
const showNotification = (message, type = 'success') => {
  if (type === 'success') { success.value = message; error.value = ''; }
  else { error.value = message; success.value = ''; }

  setTimeout(() => { success.value = ''; error.value = ''; }, 3000);
};

// Fetch all announcements
const fetchAnnouncements = async () => {
  loading.value = true;
  try {
    const res = await api.get("/announcements");
    announcements.value = res.data;
  } catch (err) {
    showNotification('Failed to fetch announcements', 'error');
    console.error('Fetch error:', err.response || err);
  } finally {
    loading.value = false;
  }
};

// Save or update announcement
const saveAnnouncement = async () => {
  if (!form.value.title) {
    showNotification('Please fill the title', 'error');
    return;
  }

  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/announcements/${form.value.id}`, form.value);
      showNotification('Announcement updated successfully! 🎉');
    } else {
      await api.post("/announcements", form.value);
      showNotification('Announcement created successfully! ✨');
    }
    resetForm();
    await fetchAnnouncements();
  } catch (err) {
    showNotification(isEditing.value ? 'Failed to update announcement' : 'Failed to create announcement', 'error');
    console.error('Save error:', err.response || err);
  } finally {
    loading.value = false;
  }
};

// Edit announcement
const editAnnouncement = (announcement) => {
  form.value = { ...announcement };
  isEditing.value = true;
  success.value = ''; error.value = '';
};

// Delete announcement
const deleteAnnouncement = async (id) => {
  if (!confirm('Are you sure you want to delete this announcement?')) return;

  loading.value = true;
  try {
    await api.delete(`/announcements/${id}`);
    showNotification('Announcement deleted successfully! 🗑️');
    await fetchAnnouncements();
  } catch (err) {
    showNotification('Failed to delete announcement', 'error');
    console.error('Delete error:', err.response || err);
  } finally {
    loading.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = { id: null, title: "", content: "" };
  isEditing.value = false;
};

// On mount
onMounted(fetchAnnouncements);
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Dashboard Announcements</h1>

    <!-- Success Message -->
    <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
      <span class="mr-2">✅</span>
      {{ success }}
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
      <span class="mr-2">❌</span>
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
      Loading...
    </div>

    <!-- Form -->
    <form @submit.prevent="saveAnnouncement" class="space-y-3 bg-gray-100 p-4 rounded-lg shadow mb-6">
      <input 
        v-model="form.title" 
        type="text" 
        placeholder="Title *" 
        class="w-full p-2 rounded border"
        :disabled="loading"
        required 
      />
      <textarea 
        v-model="form.content" 
        placeholder="Description" 
        class="w-full p-2 rounded border h-20"
        :disabled="loading"
      ></textarea>
      
      <div class="flex space-x-2">
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : (isEditing.value ? 'Update' : 'Create') }}
        </button>
        <button 
          type="button" 
          @click="resetForm" 
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          :disabled="loading"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Content</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="announcements.length === 0 && !loading" class="border-t">
            <td colspan="3" class="p-4 text-center text-gray-500">
              No announcements found
            </td>
          </tr>
          <tr v-for="announcement in announcements" :key="announcement.id" class="border-t hover:bg-gray-50">
            <td class="p-3 font-medium">{{ announcement.title }}</td>
            <td class="p-3 text-sm text-gray-600">
              {{ announcement.content || '-' }}
            </td>
            <td class="p-3">
              <div class="flex justify-center space-x-2">
                <button 
                  @click="editAnnouncement(announcement)" 
                  class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  :disabled="loading"
                >
                  Edit
                </button>
                <button 
                  @click="deleteAnnouncement(announcement.id)" 
                  class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  :disabled="loading"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
