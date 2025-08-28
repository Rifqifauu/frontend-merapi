<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({ layout: 'dashboard',   ssr: false
 });

// Ambil token dari localStorage
const token = localStorage.getItem('token') || '';

// Buat axios instance dengan Bearer token
const api = axios.create({
  baseURL: "https://api.asosiasijeepmerapi.com/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

const events = ref([]);
const form = ref({ id: null, name: "", description: "", date: "", location: "" });
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

// Fetch events
const fetchEvents = async () => {
  loading.value = true;
  try {
    const res = await api.get("/events"); // pakai instance
    events.value = res.data;
  } catch (err) {
    showNotification('Failed to fetch events', 'error');
    console.error('Fetch error:', err);
  } finally {
    loading.value = false;
  }
};

// Save or update event
const saveEvent = async () => {
  if (!form.value.name || !form.value.date || !form.value.location) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/events/${form.value.id}`, form.value);
      showNotification('Event updated successfully! 🎉');
    } else {
      await api.post("/events", form.value);
      showNotification('Event created successfully! ✨');
    }
    resetForm();
    await fetchEvents();
  } catch (err) {
    showNotification(isEditing.value ? 'Failed to update event' : 'Failed to create event', 'error');
    console.error('Save error:', err);
  } finally {
    loading.value = false;
  }
};

// Edit event
const editEvent = (event) => {
  form.value = { ...event };
  isEditing.value = true;
  success.value = ''; error.value = '';
};

// Delete event
const deleteEvent = async (id) => {
  if (!confirm('Are you sure you want to delete this event?')) return;

  loading.value = true;
  try {
    await api.delete(`/events/${id}`);
    showNotification('Event deleted successfully! 🗑️');
    await fetchEvents();
  } catch (err) {
    showNotification('Failed to delete event', 'error');
    console.error('Delete error:', err);
  } finally {
    loading.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = { id: null, name: "", description: "", date: "", location: "" };
  isEditing.value = false;
};

// On mount
onMounted(fetchEvents);
</script>

<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">📅 Dashboard Events</h1>

    <!-- Notifications -->
    <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
      <span class="mr-2">✅</span>{{ success }}
    </div>
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
      <span class="mr-2">❌</span>{{ error }}
    </div>
    <div v-if="loading" class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
      Loading...
    </div>

    <!-- Form -->
    <form @submit.prevent="saveEvent" class="space-y-3 bg-white p-5 rounded-xl shadow mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Event Name *</label>
        <input 
          v-model="form.name" 
          type="text" 
          class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
          :disabled="loading" required 
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea 
          v-model="form.description" 
          class="w-full p-2 rounded border h-20 focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-sm font-medium mb-1">Date *</label>
          <input 
            v-model="form.date" 
            type="date" 
            class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
            :disabled="loading" required 
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Location *</label>
          <input 
            v-model="form.location" 
            type="text" 
            class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
            :disabled="loading" required 
          />
        </div>
      </div>

      <div class="flex space-x-2">
        <button 
          type="submit" 
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : (isEditing ? 'Update' : 'Create') }}
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

    <!-- Table (desktop) -->
    <div class="hidden md:block bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3 text-left">Location</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="events.length === 0 && !loading" class="border-t">
            <td colspan="5" class="p-4 text-center text-gray-500">
              No events found
            </td>
          </tr>
          <tr v-for="event in events" :key="event.id" class="border-t hover:bg-gray-50">
            <td class="p-3 font-medium truncate max-w-[150px]">{{ event.name }}</td>
            <td class="p-3 text-sm text-gray-600 truncate max-w-[200px]">
              {{ event.description || '-' }}
            </td>
            <td class="p-3">{{ event.date }}</td>
            <td class="p-3">{{ event.location }}</td>
            <td class="p-3">
              <div class="flex justify-center space-x-2">
                <button 
                  @click="editEvent(event)" 
                  class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  :disabled="loading"
                >
                  Edit
                </button>
                <button 
                  @click="deleteEvent(event.id)" 
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

    <!-- Card list (mobile) -->
    <div class="space-y-4 md:hidden">
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="bg-white p-4 rounded-xl shadow"
      >
        <h3 class="font-bold text-lg">{{ event.name }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ event.description || '-' }}</p>
        <p class="text-sm text-gray-500">📅 {{ event.date }}</p>
        <p class="text-sm text-gray-500">📍 {{ event.location }}</p>
        <div class="flex space-x-2 mt-3">
          <button 
            @click="editEvent(event)" 
            class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
            :disabled="loading"
          >
            Edit
          </button>
          <button 
            @click="deleteEvent(event.id)" 
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            :disabled="loading"
          >
            Delete
          </button>
        </div>
      </div>
      <p v-if="events.length === 0 && !loading" class="text-center text-gray-500">
        No events found
      </p>
    </div>
  </div>
</template>
