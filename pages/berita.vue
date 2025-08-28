<template>
  <div class="max-w-6xl mx-auto px-6 py-12 space-y-8">
    <h1 class="text-3xl font-bold text-gray-900 text-center">Berita</h1>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <i class="fas fa-circle-notch animate-spin text-blue-600 text-3xl"></i>
    </div>

    <!-- Jika kosong -->
    <div v-else-if="berita.length === 0" class="text-center text-gray-500 italic">
      Belum ada berita
    </div>

    <!-- List berita -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in berita"
        :key="item.id"
        class="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
      >
        <img
          :src="getMediaUrl(item.media_path)"
          @error="handleImageError"
          class="rounded-lg mb-4 h-40 w-full object-cover"
        />
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          {{ item.title }}
        </h2>
        <p class="text-gray-600 text-sm line-clamp-3">{{ item.content }}</p>
        <div class="mt-3 text-xs text-gray-400">
          {{ formatDate(item.created_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
useHead({
  title: 'Berita',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Berita dari Website Asosiasi Jeep Merapi' }
  ]
})

const berita = ref([])
const loading = ref(true)

const formatDate = (dateString) => {
  if (!dateString) return 'TBD'
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

const getMediaUrl = (path) => {
  return path
    ? `https://asosiasijeepmerapi.com/storage/${path}`
    : 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Berita'
}

const handleImageError = (event) => {
  event.target.src =
    'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Image+Not+Available'
}

const fetchData = async () => {
  try {
    const api = axios.create({
      baseURL: 'https://api.asosiasijeepmerapi.com/api',
      timeout: 10000
    })
    const res = await api.get('/news')
    // API langsung return array, fallback ke res.data.data kalau ada wrapper
    berita.value = Array.isArray(res.data) ? res.data : (res.data?.data || [])
  } catch (err) {
    console.error('Error fetching berita:', err)
    berita.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
