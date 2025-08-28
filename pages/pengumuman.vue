<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <section class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">Pengumuman</h1>
        <p class="text-lg text-blue-100">Informasi resmi terbaru dari Asosiasi Jeep Merapi</p>
      </div>
    </section>

    <!-- List -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="loading" class="text-center text-gray-600 py-12">Memuat data...</div>

        <div v-else-if="pengumuman.length === 0" class="text-center text-gray-500 py-12">
          Belum ada pengumuman tersedia
        </div>

        <div v-else class="space-y-6">
          <div v-for="item in paginatedData" :key="item.id"
               class="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border-l-4 border-blue-600">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">{{ item.title }}</h2>
            <p class="text-gray-700 leading-relaxed">{{ item.content }}</p>
            <p class="mt-4 text-sm text-gray-500">
              <i class="fas fa-calendar-alt text-blue-600 mr-2"></i>
              {{ formatDate(item.created_at) }}
            </p>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center mt-8 space-x-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="['px-4 py-2 rounded-md', currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border']">
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

useHead({ title: 'Pengumuman' })

const pengumuman = ref([])
const loading = ref(true)
const currentPage = ref(1)
const perPage = 10

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.asosiasijeepmerapi.com/api/announcements')
    pengumuman.value = Array.isArray(response.data) ? response.data : []
  } catch (err) {
    console.error('Error fetching pengumuman:', err)
    pengumuman.value = []
  } finally {
    loading.value = false
  }
}

// Computed: data sesuai halaman
const totalPages = computed(() => Math.ceil(pengumuman.value.length / perPage))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return pengumuman.value.slice(start, start + perPage)
})

onMounted(fetchData)
</script>
