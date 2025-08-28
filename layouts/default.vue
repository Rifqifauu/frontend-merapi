<template>
  <div class="flex flex-col min-h-screen bg-white"> <!-- pastikan bg-white -->
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <Footer />
    <WhatsAppIcon />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import WhatsAppIcon from '~/components/WhatsAppIcon.vue'
definePageMeta({
    ssr: false

})
</script>
