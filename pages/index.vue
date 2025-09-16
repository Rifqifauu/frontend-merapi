<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img src="https://asosiasijeepmerapi.com/storage/gallery/68a676ecd988a.jpg" 
         alt="Asosiasi Jeep Merapi" 
         class="w-full h-full object-cover object-center">
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <!-- Content -->
  <div class="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
    <div class="max-w-3xl">
      <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
        Asosiasi Jeep Wisata Lereng Merapi
      </h1>
      <p class="text-xl lg:text-2xl mb-8 text-blue-100 font-light leading-relaxed">
        Pengalaman petualangan profesional menjelajahi keindahan Gunung Merapi dengan standar keselamatan terpercaya
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        
      </div>
    </div>
  </div>

  <!-- Decorative Blurs -->
  <div class="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-10 left-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl"></div>
</section>


    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="flex items-center justify-center text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
              <i :class="stat.icon" class="text-2xl mr-2"></i>
              {{ stat.value }}
            </div>
            <div class="text-gray-600 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
<!-- Merapi Status Section -->
<section class="py-5">
  <div class="max-w-7xl mx-auto px-6 space-y-8">
    
  
    <!-- SIMANTAB -->
    <section class="border border-gray-200 rounded-2xl bg-white p-6 shadow-md" lang="id" aria-labelledby="ajm-simantab-title">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <header class="mb-6">
          <h2 id="ajm-simantab-title" class="text-2xl font-bold text-slate-900">
            SIMANTAB — Sistem Informasi Sleman Tangguh Bencana
          </h2>
          <p class="text-slate-600 text-base mt-1">
            Aplikasi resmi BPBD Sleman untuk informasi kebencanaan dan pelaporan cepat di kawasan Merapi.
          </p>
        </header>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Mengapa Penting bagi Wisata Merapi?</h3>
            <ul class="list-disc list-inside space-y-2 text-slate-700">
              <li><strong>Kesiapsiagaan tur</strong> — memantau situasi Gunung Merapi sebelum keberangkatan.</li>
              <li><strong>Keamanan rute</strong> — panduan lokasi aman & titik evakuasi untuk kru dan tamu.</li>
              <li><strong>Pelaporan cepat</strong> — kanal resmi untuk melaporkan kejadian di lapangan.</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Fitur Utama</h3>
            <ul class="list-disc list-inside space-y-2 text-slate-700">
              <li><strong>Lapor Kak Kodar</strong> — laporkan darurat (angin kencang, pohon tumbang, dll.).</li>
              <li><strong>Merapi Live</strong> — pantau kondisi melalui CCTV & informasi status.</li>
              <li><strong>Paman Lepi</strong> — panduan posisi aman lereng Merapi.</li>
              <li><strong>Dewi Lepi</strong> — referensi destinasi wisata lereng Merapi.</li>
              <li><strong>Pandu Timan</strong> — rute menuju titik evakuasi.</li>
              <li><strong>SILOLA</strong> — informasi logistik & peralatan kebencanaan (stok, gudang, distribusi).</li>
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex flex-wrap items-center gap-4 mt-8">
          <a href="https://play.google.com/store/apps/details?id=com.bencana.sleman" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 active:translate-y-px transition">
            <i class="fab fa-google-play text-lg"></i> Lihat di Google Play
          </a>
          <span class="text-slate-500 text-sm">Privasi: aplikasi tidak mengumpulkan data pengguna.</span>
        </div>
      </div>
    </section>

  </div>
</section>



    <!-- Main Content with Sidebar -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-16">
            
            <!-- Pengumuman Section -->
            <div>
              <div class="flex items-center gap-3 mb-8">
                <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i class="fas fa-bullhorn text-white text-xl"></i>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">Pengumuman Penting</h2>
              </div>
              
              <div v-if="pengumuman.length === 0" class="text-center py-12 text-gray-500">
                Belum ada pengumuman
              </div>
              
              <div v-else class="space-y-6">
                <div v-for="item in pengumuman.slice(0, 5)" :key="item.id" class="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border-l-4 border-blue-500">
                  <h3 class="text-xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
                  <p class="text-gray-700">{{ item.content }}</p>
                </div>
              </div>
              
              <div class="text-center mt-8" v-if="pengumuman.length > 5">
                <a href="/pengumuman" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 inline-block">
                  Lihat Semua Pengumuman →
                </a>
              </div>
            </div>

            <!-- Berita Section -->
            <div>
              <div class="flex items-center gap-3 mb-8">
                <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <i class="fas fa-newspaper text-white text-xl"></i>
                </div>
                <h2 class="text-3xl font-bold text-gray-900">Berita & Informasi</h2>
              </div>
              
              <div v-if="berita.length === 0" class="text-center py-12 text-gray-500">
                Belum ada berita tersedia
              </div>
              
              <div v-else class="space-y-6">
                <article v-for="item in berita.slice(0, 5)" :key="item.id" class="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 overflow-hidden">
                  <div class="flex flex-col md:flex-row">
                    <div v-if="item.media_path" class="md:w-48 h-48 md:h-32 overflow-hidden">
                      <img :src="getMediaUrl(item.media_path)" :alt="item.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" @error="handleImageError">
                    </div>
                    <div class="p-6 flex-1">
                      <h3 class="text-xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
                      <p class="text-gray-700 mb-4 line-clamp-2">{{ item.content }}</p>
                    
                    </div>
                  </div>
                </article>
              </div>
              
              <div class="text-center mt-8" v-if="berita.length > 5">
                <a href="/berita" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 inline-block">
                  Lihat Semua Berita →
                </a>
              </div>
            </div>
            
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            
            <!-- Kegiatan Sidebar -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i class="fas fa-calendar-days text-white text-lg"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Kegiatan Terbaru</h3>
              </div>
              
              <div v-if="kegiatan.length === 0" class="text-center py-8 text-gray-500">
                Belum ada kegiatan terjadwal
              </div>
              
              <div v-else class="space-y-4">
                <div v-for="item in kegiatan.slice(0, 5)" :key="item.id" class="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50/50 rounded-r-lg">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-900 text-sm">{{ item.name || item.title }}</h4>
                    <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {{ formatDate(item.date) }}
                    </span>
                  </div>
                  <div class="flex items-center gap-1 text-gray-600 mb-2">
                    <i class="fas fa-location-dot text-blue-500 text-xs"></i>
                    <span class="text-xs">{{ item.location || 'Gunung Merapi' }}</span>
                  </div>
                  <p class="text-gray-700 text-sm line-clamp-2">{{ item.description || item.content }}</p>
                </div>
              </div>
              
              <div class="text-center mt-6" v-if="kegiatan.length > 5">
                <a href="/kegiatan" class="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline">
                  Lihat Semua Kegiatan →
                </a>
              </div>
            </div>

            <!-- Quick Stats Sidebar -->
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold mb-6 text-center">Info Cepat</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-blue-100">Total Kegiatan</span>
                  <span class="font-bold text-xl">{{ kegiatan.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-blue-100">Total Berita</span>
                  <span class="font-bold text-xl">{{ berita.length }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-blue-100">Pengumuman Aktif</span>
                  <span class="font-bold text-xl">{{ pengumuman.length }}</span>
                </div>
              </div>
            </div>

            <!-- Contact Info Sidebar -->
            <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 class="text-xl font-bold text-gray-900 mb-6">Kontak Kami</h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <i class="fas fa-phone text-blue-600"></i>
                  <span class="text-gray-700">+6281915561964</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-envelope text-blue-600"></i>
                  <span class="text-gray-700">daldirijogja900@gmail.com</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-map-marker-alt text-blue-600"></i>
                  <span class="text-gray-700">Banteng RT 002 RW 007, Hargobinangun, Pakem, Sleman</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl lg:text-5xl font-bold mb-6">Siap Menjelajahi Merapi Bersama Kami?</h2>
        <p class="text-xl mb-8 text-blue-100 leading-relaxed max-w-2xl mx-auto">
          Bergabunglah dengan Asosiasi Jeep Wisata Lereng Merapi dan dapatkan pengalaman petualangan yang tak terlupakan.
        </p>
 
      </div>
    </section>

    <!-- Loading -->
    <div v-if="loading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 flex items-center gap-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span class="text-gray-700">Memuat data...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
useHead({
  title: 'Beranda',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Beranda dari Website Asosiasi Jeep Wisata Lereng Merapi' }
  ]
})
const kegiatan = ref([])
const berita = ref([])
const pengumuman = ref([])
const loading = ref(true)

const stats = [
  { icon: 'fas fa-route', value: '500+', label: 'Tour Berhasil' },
  { icon: 'fas fa-users', value: '50+', label: 'Driver Profesional' },
  { icon: 'fas fa-calendar-check', value: '10+', label: 'Tahun Pengalaman' },
  { icon: 'fas fa-star', value: '100%', label: 'Kepuasan Pelanggan' }
]

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
  return path ? `https://asosiasijeepmerapi.com/storage/${path}` : 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Jeep+Tour+Merapi'
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Image+Not+Available'
}

const fetchData = async (endpoint, targetRef) => {
  try {
    const token = localStorage.getItem('token')
    const api = axios.create({
      baseURL: 'https://api.asosiasijeepmerapi.com/api',
      timeout: 10000
    })
    const response = await api.get(endpoint)
    const data = response.data?.data || response.data || []
    targetRef.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err)
    targetRef.value = []
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.allSettled([
    fetchData('/events', kegiatan),
    fetchData('/news', berita),
    fetchData('/announcements', pengumuman)
  ])
  loading.value = false
})
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
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>