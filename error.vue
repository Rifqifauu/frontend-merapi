<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
    <div class="max-w-lg w-full">
      <div class="bg-white rounded-2xl shadow-xl p-10 text-center">
        <!-- Icon -->
        <div class="text-6xl text-blue-600 mb-6">
          <font-awesome-icon v-if="error.statusCode === 404" :icon="faSearch" />
          <font-awesome-icon v-else-if="error.statusCode === 403" :icon="faBan" />
          <font-awesome-icon v-else-if="error.statusCode === 500" :icon="faTriangleExclamation" />
          <font-awesome-icon v-else :icon="faCircleXmark" />
        </div>

        <!-- Title -->
        <h1 class="text-5xl font-extrabold text-gray-900 mb-2">
          {{ error.statusCode || 'Error' }}
        </h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">
          {{ getTitle }}
        </h2>

        <!-- Message -->
        <p class="text-gray-600 mb-8">
          {{ getMessage }}
        </p>

        <!-- Actions -->
        <div class="grid gap-3">
          <button
            v-if="error.statusCode === 500 || !error.statusCode"
            @click="handleError"
            class="w-full py-3 px-4 rounded-xl bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <font-awesome-icon :icon="faRotateRight" /> Coba Lagi
          </button>

   

          <button
            @click="router.push('/')"
            class="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <font-awesome-icon :icon="faHouse" /> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faBan, faTriangleExclamation, faCircleXmark, faHouse, faRightFromBracket, faRotateRight } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  error: { type: Object, required: true }
})

const router = useRouter()

// FontAwesome component lokal
defineExpose({ FontAwesomeIcon })

const getTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404: return 'Halaman Tidak Ditemukan'
    case 403: return 'Akses Ditolak'
    case 500: return 'Server Error'
    default: return 'Terjadi Kesalahan'
  }
})

const getMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404: return 'Maaf, halaman yang Anda cari tidak tersedia.'
    case 403: return props.error.message || 'Anda tidak memiliki hak akses untuk halaman ini.'
    case 500: return 'Terjadi kesalahan pada server. Silakan coba lagi nanti.'
    default: return props.error.message || 'Terjadi kesalahan yang tidak terduga.'
  }
})

const logout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('is_admin')
    window.location.href = '/'
  }
}

const handleError = () => {
  clearError({ redirect: '/' })
}

useHead({
  title: `Error ${props.error.statusCode || ''} - Website`
})
</script>
