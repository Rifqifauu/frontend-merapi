<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-blue-900 text-white py-20">
      <div class="container mx-auto px-6 text-center max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Asosiasi Jeep Wisata Lereng Merapi</h1>
        <p class="text-lg md:text-xl leading-relaxed">
          Komunitas pecinta Jeep yang menjelajahi Merapi dengan aman, bertanggung jawab, dan penuh kebersamaan.
        </p>
      </div>
    </section>

    <!-- Timeline Section -->
    <div class="relative container mx-auto px-6 py-20 max-w-4xl">
      <!-- Garis timeline -->
      <div class="absolute left-8 top-0 w-1 h-full bg-gray-300"></div>

      <!-- Tentang Kami -->
      <div class="relative mb-16 flex items-start">
        <!-- Bullet -->
        <div class="w-16 flex justify-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow"></div>
        </div>
        <!-- Content -->
        <div class="pl-6 w-full">
          <h2 class="text-2xl font-bold mb-3">Tentang Kami</h2>
          <p class="text-gray-700 leading-relaxed">
            Kami fokus pada kegiatan jelajah Merapi yang aman, edukatif, dan memperkuat kebersamaan anggota.
          </p>
        </div>
      </div>

      <!-- Sejarah -->
      <div class="relative mb-16 flex items-start">
        <div class="w-16 flex justify-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow"></div>
        </div>
        <div class="pl-6 w-full">
          <h2 class="text-2xl font-bold mb-3">Sejarah</h2>
          <p class="text-gray-700 leading-relaxed">
            Berdiri sejak 2010, berawal dari sekelompok pecinta off-road lokal yang ingin menjelajahi Merapi dengan cara yang aman dan ramah lingkungan.
          </p>
        </div>
      </div>

      <!-- Visi & Misi -->
      <div class="relative mb-16 flex items-start">
        <div class="w-16 flex justify-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow"></div>
        </div>
        <div class="pl-6 w-full">
          <h2 class="text-2xl font-bold mb-3">Visi & Misi</h2>
          <ul class="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Menjadi komunitas Jeep yang terkemuka dan bertanggung jawab.</li>
            <li>Menyediakan pengalaman off-road yang aman dan menyenangkan.</li>
            <li>Melestarikan alam Merapi dan lingkungan sekitar.</li>
          </ul>
        </div>
      </div>

      <!-- Tujuan -->
      <div class="relative mb-16 flex items-start">
        <div class="w-16 flex justify-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow"></div>
        </div>
        <div class="pl-6 w-full">
          <h2 class="text-2xl font-bold mb-3">Tujuan</h2>
          <p class="text-gray-700 leading-relaxed">
            Mengembangkan komunitas Jeep yang solid, mendukung kegiatan sosial, dan mengedukasi anggota dalam etika off-road.
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div class="relative flex items-start">
        <div class="w-16 flex justify-center relative z-10">
          <div class="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow"></div>
        </div>
        <div class="pl-6 w-full">
          <h2 class="text-2xl font-bold mb-3">Bergabunglah!</h2>
          <p class="text-gray-700 mb-6">
            Nikmati pengalaman off-road terbaik di Merapi bersama komunitas kami.
          </p>
          <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Tentang',
  meta: [
    { name: 'description', content: 'Ini adalah halaman profil umum dari Website Asosiasi Jeep Merapi' }
  ]
})
// Halaman About versi Hero + Timeline kiri semua
</script>
