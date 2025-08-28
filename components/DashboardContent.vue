<template>
  <div v-if="authChecked" class="flex min-h-screen bg-gray-100">
    <aside class="w-64 min-h-screen bg-white shadow-md p-4">
      <h2 class="text-xl font-bold mb-4">Dashboard</h2>
      <nav>
        <ul class="space-y-2">
          <li><NuxtLink to="/dashboard" class="block p-2 rounded hover:bg-gray-200">Home</NuxtLink></li>
          <li><NuxtLink to="/dashboard/events" class="block p-2 rounded hover:bg-gray-200">Event</NuxtLink></li>
          <li><NuxtLink to="/dashboard/gallery" class="block p-2 rounded hover:bg-gray-200">Galeri</NuxtLink></li>
          <li><NuxtLink to="/dashboard/announcements" class="block p-2 rounded hover:bg-gray-200">Pengumuman</NuxtLink></li>
          <li><NuxtLink to="/dashboard/news" class="block p-2 rounded hover:bg-gray-200">Berita</NuxtLink></li>
          <li><NuxtLink to="/dashboard/communities" class="block p-2 rounded hover:bg-gray-200">Komunitas</NuxtLink></li>
        </ul>
         <button @click="logout" class="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
  Logout
</button>
      </nav>
     

    </aside>

    <main class="flex-1 p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
export const authChecked = ref(true) // state bisa di-share atau di-pass via props
definePageMeta({
    ssr: false

})
</script>
