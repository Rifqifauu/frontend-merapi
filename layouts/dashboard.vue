<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
definePageMeta({
  ssr: false
})

const router = useRouter()
const token = process.client ? localStorage.getItem('token') : null
const isAdmin = process.client ? localStorage.getItem('is_admin') : null
const isOpen = ref(false) // sidebar toggle

// Cek autentikasi dan autorisasi
if (process.client) {
  if (!token) {
    router.replace('/auth')
  } else if (isAdmin !== '1') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Akses Ditolak',
      message: 'Halaman ini hanya dapat diakses oleh administrator.'
    })
  }
}

const logout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('is_admin')
    window.location.href = '/'
  }
}
</script>

<template>
  <div v-if="token && isAdmin === '1'" class="flex min-h-screen bg-gray-100">
    <!-- Sidebar (desktop & mobile) -->
    <aside 
      :class="[
        'fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-40',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      ]"
    >
      <div class="p-4 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold">Dashboard</h2>
        <!-- Close btn (mobile only) -->
        <button class="lg:hidden text-gray-600" @click="isOpen = false">✕</button>
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li><NuxtLink to="/dashboard" class="nav-link">Home</NuxtLink></li>
          <li><NuxtLink to="/dashboard/events" class="nav-link">Event</NuxtLink></li>
          <li><NuxtLink to="/dashboard/gallery" class="nav-link">Galeri</NuxtLink></li>
          <li><NuxtLink to="/dashboard/announcements" class="nav-link">Pengumuman</NuxtLink></li>
          <li><NuxtLink to="/dashboard/news" class="nav-link">Berita</NuxtLink></li>
          <li><NuxtLink to="/dashboard/communities" class="nav-link">Komunitas</NuxtLink></li>
          <li><NuxtLink to="/dashboard/forum" class="nav-link">Forum</NuxtLink></li>
          <li><NuxtLink to="/dashboard/testi" class="nav-link">Testi</NuxtLink></li>
          <li><NuxtLink to="/dashboard/users" class="nav-link">User</NuxtLink></li>
        </ul>
        <button @click="logout" class="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </nav>
    </aside>

    <!-- Overlay (mobile only) -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Main content -->
    <main class="flex-1 p-6 w-full lg:ml-64">
      <!-- Topbar (mobile only) -->
      <div class="lg:hidden mb-4">
        <button @click="isOpen = true" class="p-2 bg-white rounded shadow">
          ☰
        </button>
      </div>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
/* Default link style */
.nav-link {
  @apply block p-2 rounded hover:bg-gray-200;
}

/* Aktif */
.router-link-active {
  @apply bg-gray-200 font-semibold text-blue-600;
}
</style>
