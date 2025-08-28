<template>
  <div class="p-10 max-w-7xl mx-auto space-y-12">
    <!-- Judul Halaman -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold">Daftar Komunitas</h1>
      <p class="text-gray-500">Komunitas Jeep Merapi yang sudah bergabung</p>
    </div>

    <!-- Jika kosong -->
    <div v-if="communities.length === 0" class="text-gray-500 italic text-center">
      Belum ada komunitas
    </div>

    <!-- Grid Komunitas -->
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div
          v-for="community in paginatedCommunities"
          :key="community.id"
          class="rounded-2xl border bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center p-6"
        >
        <!-- Logo -->
<div
  v-if="community.logo"
  class="w-36 h-36 mb-4 flex items-center justify-center bg-gray-50 border rounded-xl shadow"
>
  <img
    :src="`https://asosiasijeepmerapi.com/storage/${community.logo}`"
    class="max-w-full max-h-full rounded-xl object-contain"
    :alt="`Logo ${community.name}`"
  />
</div>


          <!-- Nama Komunitas -->
          <h2 class="font-semibold text-lg text-gray-800 mb-4 text-center">
            {{ community.name }}
          </h2>

          <!-- Link Media Sosial -->
          <div class="flex flex-wrap justify-center gap-4 text-sm">
            <a
              v-if="community.instagram"
              :href="community.instagram"
              target="_blank"
              class="flex items-center space-x-1 hover:text-pink-500 transition"
            >
              <Instagram class="w-5 h-5" /> <span>Instagram</span>
            </a>
            <a
              v-if="community.tiktok"
              :href="community.tiktok"
              target="_blank"
              class="flex items-center space-x-1 hover:text-black transition"
            >
              <Music class="w-5 h-5" /> <span>TikTok</span>
            </a>
            <a
              v-if="community.twitter"
              :href="community.twitter"
              target="_blank"
              class="flex items-center space-x-1 hover:text-blue-400 transition"
            >
              <Twitter class="w-5 h-5" /> <span>Twitter</span>
            </a>
            <a
              v-if="community.whatsapp"
              :href="community.whatsapp"
              target="_blank"
              class="flex items-center space-x-1 hover:text-green-500 transition"
            >
              <MessageCircle class="w-5 h-5" /> <span>WhatsApp</span>
            </a>
            <a
              v-if="community.facebook"
              :href="community.facebook"
              target="_blank"
              class="flex items-center space-x-1 hover:text-blue-600 transition"
            >
              <Facebook class="w-5 h-5" /> <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-40"
        >
          ‹
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'w-10 h-10 flex items-center justify-center rounded-full border transition',
            currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-200'
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { Instagram, Music, Twitter, MessageCircle, Facebook } from 'lucide-vue-next'

definePageMeta({ ssr: false })
useHead({
  title: 'Komunitas',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Profil Komunitas dari Website Asosiasi Jeep Merapi' }
  ]
})
const apiUrl = 'https://api.asosiasijeepmerapi.com/api'
const communities = ref([])

// Pagination states
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() =>
  Math.ceil(communities.value.length / itemsPerPage)
)

const paginatedCommunities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return communities.value.slice(start, end)
})

const goToPage = (page) => {
  currentPage.value = page
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

onMounted(async () => {
  try {
    const res = await axios.get(`${apiUrl}/communities`)
    communities.value = res.data.map(c => ({
      ...c,
      logo: c.logo ? c.logo : null
    })) || []
  } catch (error) {
    console.error('Error fetch communities:', error)
  }
})
</script>
