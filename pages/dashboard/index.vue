<template>
  <div>
    <!-- Header -->
    <h1 class="text-2xl font-bold mb-2">Welcome to Dashboard 🎉</h1>
    <p class="text-gray-600 mb-6">Ringkasan aplikasi kamu</p>

    <!-- Ringkasan Statistik -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(value, key) in stats" 
        :key="key" 
        class="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold capitalize">{{ key }}</h2>
          <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
            {{ value }}
          </span>
        </div>
      </div>
    </div>

    <!-- Data terbaru -->
    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Artikel Terbaru -->
      <div class="bg-white rounded-2xl shadow p-5">
        <h2 class="text-xl font-bold mb-4">📰 Artikel Terbaru</h2>
        <ul class="divide-y">
          <li v-for="item in latest.news" :key="item.id" class="flex gap-3 py-3">
            <img 
              v-if="item.media_path" 
              :src="`https://asosiasijeepmerapi.com/storage/${item.media_path}`" 
              alt="Thumbnail" 
              class="w-14 h-14 rounded object-cover"
            />
            <div>
              <p class="truncate font-medium">{{ item.title }}</p>
              <span class="text-gray-500 text-sm">{{ formatDate(item.created_at) }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Event Terbaru -->
      <div class="bg-white rounded-2xl shadow p-5">
        <h2 class="text-xl font-bold mb-4">📅 Event Terbaru</h2>
        <ul class="divide-y">
          <li v-for="item in latest.events" :key="item.id" class="py-3">
            <p class="font-medium">{{ item.name }}</p>
            <span class="text-sm text-gray-500">
              {{ formatDate(item.date) }} · {{ item.location }}
            </span>
          </li>
        </ul>
      </div>

    

   
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  ssr: false
})

// Ambil data dari API Laravel
const { data: stats } = await useFetch('https://api.asosiasijeepmerapi.com/api/dashboard/stats')
const { data: latest } = await useFetch('https://api.asosiasijeepmerapi.com/api/dashboard/latest')

// Helper format tanggal
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>
