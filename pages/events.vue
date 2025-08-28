<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <section class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Kegiatan</h1>
        <p class="text-lg text-blue-100">Daftar kegiatan terbaru Asosiasi Jeep Merapi</p>
      </div>
    </section>

    <!-- List -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="loading" class="text-center text-gray-600 py-12">Memuat data...</div>

        <div v-else-if="kegiatan.length === 0" class="text-center text-gray-500 py-12">
          Belum ada kegiatan
        </div>

        <div v-else class="grid md:grid-cols-2 gap-8">
          <div v-for="item in paginatedData" :key="item.id"
               class="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border border-gray-100">
            <div class="flex justify-between items-center mb-3">
              <h2 class="text-xl font-bold text-gray-900">{{ item.name || item.title }}</h2>
              <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                {{ formatDate(item.date) }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 mb-2">
              <i class="fas fa-location-dot text-blue-500"></i>
              <span>{{ item.location || 'Gunung Merapi' }}</span>
            </div>
            <p class="text-gray-700 leading-relaxed">{{ item.description || item.content }}</p>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-8 space-x-2" v-if="totalPages > 1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="['px-4 py-2 rounded-md', currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border']">
            {{ page }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

useHead({ title: 'Kegiatan' })

const kegiatan = ref([])
const loading = ref(true)
const currentPage = ref(1)
const perPage = 10

const formatDate = (dateString) => {
  if (!dateString) return 'TBD'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.asosiasijeepmerapi.com/api/events')
    kegiatan.value = Array.isArray(response.data) ? response.data : []
  } catch (err) {
    console.error('Error fetching kegiatan:', err)
    kegiatan.value = []
  } finally {
    loading.value = false
  }
}

// Pagination
const totalPages = computed(() => Math.ceil(kegiatan.value.length / perPage))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return kegiatan.value.slice(start, start + perPage)
})

onMounted(fetchData)
</script>
