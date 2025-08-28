<template>
  <div class="p-6 max-w-7xl mx-auto space-y-8">
    <!-- Judul Halaman -->
    <h1 class="text-3xl font-bold text-center mb-6">Gallery</h1>

    <!-- Jika kosong -->
    <div v-if="media.length === 0" class="text-gray-500 italic text-center">
      Belum ada media
    </div>

    <!-- Gallery -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in media"
        :key="item.id"
        class="border rounded-lg shadow hover:shadow-lg transition bg-white"
      >
        <!-- Image -->
        <div
          v-if="item.type === 'image'"
          class="w-full h-48 overflow-hidden rounded-t-md cursor-pointer"
          @click="openLightbox(item)"
        >
          <img
            :src="`https://asosiasijeepmerapi.com/storage/${item.file_path}`"
            class="w-full h-48 object-cover hover:scale-105 transition"
          />
        </div>

        <!-- Video -->
        <div v-else-if="item.type === 'video'" class="w-full h-48 rounded-t-md">
          <video controls class="w-full h-48 object-cover rounded-t-md">
            <source :src="`https://asosiasijeepmerapi.com/storage/${item.file_path}`" />
          </video>
        </div>

        <!-- Title -->
        <div class="p-3 text-center">
          <h2 class="font-semibold text-gray-700">{{ item.title }}</h2>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="selectedMedia"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    >
      <!-- Tombol Close -->
      <button
        class="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-400 transition"
        @click="closeLightbox"
      >
        ✕
      </button>

      <div class="max-w-4xl max-h-[90vh] p-4">
        <img
          v-if="selectedMedia.type === 'image'"
          :src="`https://asosiasijeepmerapi.com/storage/${selectedMedia.file_path}`"
          class="max-w-full max-h-[85vh] rounded shadow-lg mx-auto"
        />
        <video
          v-else-if="selectedMedia.type === 'video'"
          controls
          autoplay
          class="max-w-full max-h-[85vh] rounded shadow-lg mx-auto"
        >
          <source :src="`https://asosiasijeepmerapi.com/storage/${selectedMedia.file_path}`" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
useHead({
  title: 'Galeri',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Galeri dari Website Asosiasi Jeep Merapi' }
  ]
})
definePageMeta({ ssr: false });

const baseUrl = "https://api.asosiasijeepmerapi.com";
const media = ref([]);
const selectedMedia = ref(null);

// Fetch data
onMounted(async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/gallery`);
    media.value = res.data || [];
  } catch (error) {
    console.error("Error fetch gallery:", error);
  }
});

// Buka lightbox
const openLightbox = (item) => {
  selectedMedia.value = item;
};

// Tutup lightbox
const closeLightbox = () => {
  selectedMedia.value = null;
};
</script>
