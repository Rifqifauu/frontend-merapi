<template>
  <div class="p-10 max-w-7xl mx-auto space-y-12">
    <!-- Judul Halaman -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold">Daftar Komunitas</h1>
      <p class="text-gray-500">Komunitas Jeep Merapi yang sudah bergabung</p>
    </div>

    <!-- Grid Komunitas -->
    <div v-if="communities.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="community in paginatedCommunities"
        :key="community.id"
        @click="openModal(community)"
        class="cursor-pointer rounded-2xl border bg-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 p-6 flex flex-col items-center"
      >
        <!-- Logo -->
        <div class="w-36 h-36 flex items-center justify-center bg-gray-50 border rounded-xl shadow mb-4">
          <img
            v-if="community.logo"
            :src="`https://asosiasijeepmerapi.com/storage/${community.logo}`"
            class="max-w-full max-h-full object-contain rounded-xl"
            :alt="`Logo ${community.name}`"
          />
        </div>

        <!-- Nama Komunitas -->
        <h2 class="font-semibold text-lg text-gray-800 text-center mb-3">{{ community.name }}</h2>

        <!-- Link Media Sosial -->
        <div class="flex flex-wrap justify-center gap-4 mt-2">
          <a
            v-if="community.instagram"
            :href="community.instagram"
            target="_blank"
            class="flex items-center gap-2 text-gray-800 hover:text-pink-500 transition-colors"
          >
            <Instagram class="w-5 h-5" />
            <span class="text-sm font-medium">Instagram</span>
          </a>
          <a
            v-if="community.tiktok"
            :href="community.tiktok"
            target="_blank"
            class="flex items-center gap-2 text-gray-800 hover:text-black transition-colors"
          >
            <Music class="w-5 h-5" />
            <span class="text-sm font-medium">TikTok</span>
          </a>
          <a
            v-if="community.twitter"
            :href="community.twitter"
            target="_blank"
            class="flex items-center gap-2 text-gray-800 hover:text-blue-400 transition-colors"
          >
            <Twitter class="w-5 h-5" />
            <span class="text-sm font-medium">Twitter</span>
          </a>
          <a
            v-if="community.whatsapp"
            :href="community.whatsapp"
            target="_blank"
            class="flex items-center gap-2 text-gray-800 hover:text-green-500 transition-colors"
          >
            <MessageCircle class="w-5 h-5" />
            <span class="text-sm font-medium">WhatsApp</span>
          </a>
          <a
            v-if="community.facebook"
            :href="community.facebook"
            target="_blank"
            class="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <Facebook class="w-5 h-5" />
            <span class="text-sm font-medium">Facebook</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Jika kosong -->
    <div v-else class="text-gray-500 italic text-center">
      Belum ada komunitas
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6">
      <button @click="prevPage" :disabled="currentPage === 1"
        class="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-40">‹</button>

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

      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-200 disabled:opacity-40">›</button>
    </div>

    <!-- Modal Carousel -->
    <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div class="relative w-full max-w-4xl flex flex-col items-center">
        <!-- Tombol Close -->
        <button @click="closeModal" class="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-20">✕</button>

        <!-- Main Photo -->
        <div class="relative w-full flex items-center justify-center">
          <button @click="prevPhoto" class="absolute left-0 text-white text-4xl px-3 hover:text-gray-300 z-10">‹</button>
          
          <transition name="fade" mode="out-in">
            <img
              v-if="currentPhoto"
              :key="currentPhoto.id"
              :src="`https://asosiasijeepmerapi.com/storage/${currentPhoto.path}`"
              class="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg"
            />
          </transition>

          <button @click="nextPhoto" class="absolute right-0 text-white text-4xl px-3 hover:text-gray-300 z-10">›</button>
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-2 mt-4 overflow-x-auto py-2 w-full justify-center">
          <img
            v-for="(f, idx) in modalCommunity.foto"
            :key="f.id"
            :src="`https://asosiasijeepmerapi.com/storage/${f.path}`"
            @click="currentPhotoIndex = idx"
            :class="['h-20 rounded-lg cursor-pointer object-cover border', currentPhotoIndex === idx ? 'border-blue-600 border-2' : 'border-gray-300']"
          />
        </div>

        <!-- Indicator -->
        <p class="text-sm text-gray-300 mt-2">Foto {{ currentPhotoIndex + 1 }} dari {{ modalCommunity.foto.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { Instagram, Music, Twitter, MessageCircle, Facebook } from 'lucide-vue-next'

useHead({
  title: 'Komunitas',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Komunitas dari Website Asosiasi Jeep Merapi' }
  ]
})
const apiUrl = 'https://api.asosiasijeepmerapi.com/api'
const communities = ref([])

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6
const totalPages = computed(() => Math.ceil(communities.value.length / itemsPerPage))
const paginatedCommunities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return communities.value.slice(start, start + itemsPerPage)
})
const goToPage = (page) => currentPage.value = page
const prevPage = () => { if(currentPage.value>1) currentPage.value-- }
const nextPage = () => { if(currentPage.value<totalPages.value) currentPage.value++ }

// Modal Carousel
const modalOpen = ref(false)
const modalCommunity = ref({ foto: [] })
const currentPhotoIndex = ref(0)
const currentPhoto = computed(() => modalCommunity.value.foto[currentPhotoIndex.value] || null)

const openModal = (community) => {
  if (!community.foto.length) return
  modalCommunity.value = community
  currentPhotoIndex.value = 0
  modalOpen.value = true
  nextTick(() => document.querySelector('.fixed').focus())
}
const closeModal = () => modalOpen.value = false

// Infinite loop carousel
const prevPhoto = () => {
  if(!modalCommunity.value.foto.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + modalCommunity.value.foto.length) % modalCommunity.value.foto.length
}
const nextPhoto = () => {
  if(!modalCommunity.value.foto.length) return
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % modalCommunity.value.foto.length
}

// Fetch communities
onMounted(async () => {
  try {
    const res = await axios.get(`${apiUrl}/communities`)
    communities.value = res.data.map(c => ({ ...c, foto: c.foto || [], logo: c.logo || null }))
  } catch(e) {
    console.error('Fetch communities error:', e)
  }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
