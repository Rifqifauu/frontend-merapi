<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

definePageMeta({ layout: "dashboard", ssr: false });

// ----------------------
// STATE
// ----------------------
const newsList = ref([]);
const form = ref({ id: null, title: "", content: "", media_path: null });
const previewMedia = ref(null);
const isEditing = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");

// ----------------------
// HELPERS
// ----------------------
const isFile = (obj) => obj && obj instanceof File;

const showNotification = (message, type = "success") => {
  if (type === "success") {
    success.value = message;
    error.value = "";
  } else {
    error.value = message;
    success.value = "";
  }
  setTimeout(() => {
    success.value = "";
    error.value = "";
  }, 3000);
};

// ----------------------
// AXIOS INSTANCE
// ----------------------
const api = axios.create({
  baseURL: "https://api.asosiasijeepmerapi.com/api",
  headers: { Accept: "application/json", "Content-Type": "multipart/form-data" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------
// FETCH NEWS
// ----------------------
const fetchNews = async () => {
  loading.value = true;
  try {
    const res = await api.get("/news");
    newsList.value = res.data.map((item) => ({
      ...item,
      media_url: item.media_path
        ? `https://asosiasijeepmerapi.com/storage/${item.media_path}`
        : null,
    }));
  } catch (err) {
    console.error(err);
    showNotification("Failed to fetch news", "error");
  } finally {
    loading.value = false;
  }
};

// ----------------------
// FILE INPUT
// ----------------------
const handleFileChange = (e) => {
  const file = e.target.files[0] || null;
  form.value.media_path = file;
  previewMedia.value = file ? URL.createObjectURL(file) : null;
};

// ----------------------
// SAVE NEWS
// ----------------------
const saveNews = async () => {
  if (!form.value.title.trim()) {
    showNotification("Title is required", "error");
    return;
  }

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("content", form.value.content || "");

    if (isFile(form.value.media_path)) {
      formData.append("media_path", form.value.media_path);
    }

    if (isEditing.value) {
      await api.post(`/news/${form.value.id}?_method=PUT`, formData);
      showNotification("News updated successfully! 🎉");
    } else {
      await api.post("/news", formData);
      showNotification("News created successfully! ✨");
    }

    resetForm();
    await fetchNews();
  } catch (err) {
    console.error(err.response || err);
    showNotification(
      isEditing.value ? "Failed to update news" : "Failed to create news",
      "error"
    );
  } finally {
    loading.value = false;
  }
};

// ----------------------
// EDIT NEWS
// ----------------------
const editNews = (item) => {
  form.value = {
    id: item.id,
    title: item.title,
    content: item.content,
    media_path: null,
  };
  previewMedia.value = item.media_url || null;
  isEditing.value = true;
};

// ----------------------
// DELETE NEWS
// ----------------------
const deleteNews = async (id) => {
  if (!confirm("Are you sure you want to delete this news?")) return;
  loading.value = true;
  try {
    await api.delete(`/news/${id}`);
    showNotification("News deleted successfully! 🗑️");
    await fetchNews();
  } catch (err) {
    console.error(err.response || err);
    showNotification("Failed to delete news", "error");
  } finally {
    loading.value = false;
  }
};

// ----------------------
// RESET FORM
// ----------------------
const resetForm = () => {
  form.value = { id: null, title: "", content: "", media_path: null };
  previewMedia.value = null;
  isEditing.value = false;
};

// ----------------------
// COMPUTED
// ----------------------
const hasNews = computed(() => newsList.value.length > 0);

onMounted(fetchNews);
</script>

<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">📰 Dashboard News</h1>

    <!-- Notifications -->
    <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
      {{ success }}
    </div>
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ error }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
      Loading...
    </div>

    <!-- Form -->
    <form @submit.prevent="saveNews" class="space-y-4 bg-white p-4 rounded-lg shadow mb-8">
      <div>
        <label class="block text-sm font-medium mb-1">Title *</label>
        <input v-model="form.title" type="text" placeholder="Enter title" class="w-full p-2 rounded border" :disabled="loading" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Content</label>
        <textarea v-model="form.content" placeholder="Enter content" class="w-full p-2 rounded border h-24" :disabled="loading" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Media</label>
        <input type="file" @change="handleFileChange" :disabled="loading" />
        <div v-if="previewMedia" class="mt-2">
          <img v-if="isFile(form.media_path) || previewMedia.includes('/storage/')" :src="previewMedia" class="h-32 object-cover rounded border" />
        </div>
      </div>

      <div class="flex space-x-2">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" :disabled="loading">
          {{ loading ? "Processing..." : isEditing ? "Update" : "Create" }}
        </button>
        <button v-if="isEditing" type="button" @click="resetForm" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" :disabled="loading">
          Cancel
        </button>
      </div>
    </form>

    <!-- Table Desktop -->
    <div v-if="hasNews" class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-3 text-left">Media</th>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Content</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in newsList" :key="item.id" class="border-t hover:bg-gray-50">
            <td class="p-3">
              <img v-if="item.media_url" :src="item.media_url" class="h-16 object-cover rounded" />
              <span v-else class="text-gray-400">No media</span>
            </td>
            <td class="p-3 font-medium">{{ item.title }}</td>
            <td class="p-3 text-sm text-gray-600">{{ item.content || "-" }}</td>
            <td class="p-3 flex justify-center space-x-2">
              <button @click="editNews(item)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" :disabled="loading">Edit</button>
              <button @click="deleteNews(item.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" :disabled="loading">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center p-4 text-gray-500">No news found</div>

    <!-- Mobile Card -->
    <div class="md:hidden space-y-4">
      <div v-for="item in newsList" :key="item.id" class="bg-white rounded-lg shadow p-4 border">
        <div class="flex items-center space-x-3">
          <img v-if="item.media_url" :src="item.media_url" class="h-16 w-16 object-cover rounded" />
          <div>
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-2">{{ item.content || "-" }}</p>
          </div>
        </div>
        <div class="mt-3 flex space-x-2">
          <button @click="editNews(item)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm" :disabled="loading">Edit</button>
          <button @click="deleteNews(item.id)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm" :disabled="loading">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
