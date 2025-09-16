<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center overflow-hidden">
              <img src="https://asosiasijeepmerapi.com/storage/logo.jpeg" alt="Logo Asosiasi Jeep Wisata" class="w-full h-full object-cover">
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Asosiasi Jeep Wisata</h3>
              <p class="text-sm text-gray-400 -mt-1">Lereng Merapi</p>
            </div>
          </div>
          <p class="text-gray-400 leading-relaxed mb-6">
            Organisasi profesional yang menaungi para operator Jeep Tour di kawasan Gunung Merapi dengan komitmen pada keselamatan dan kualitas layanan terbaik.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-6 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'link']" class="text-blue-500" />
            Menu Utama
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'home']" class="text-xs w-3" />
                Beranda
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/galeri" class="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'images']" class="text-xs w-3" />
                Galeri
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/communities" class="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'users']" class="text-xs w-3" />
                Profil Anggota
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <font-awesome-icon :icon="['fas', 'info-circle']" class="text-xs w-3" />
                Tentang Kami
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="font-semibold text-white mb-6 flex items-center gap-2">
            <font-awesome-icon :icon="['fas', 'address-book']" class="text-blue-500" />
            Hubungi Kami
          </h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="text-blue-500 mt-1" />
              <div>
                <p class="text-white font-medium mb-1">Alamat</p>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Banteng RT 002 RW 007, Hargobinangun, Pakem, Sleman
                </p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <font-awesome-icon :icon="['fas', 'phone']" class="text-blue-500 mt-1" />
              <div>
                <p class="text-white font-medium mb-1">Telepon</p>
                <a href="tel:+6281915561964" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +6281915561964
                </a>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <font-awesome-icon :icon="['fas', 'envelope']" class="text-blue-500 mt-1" />
              <div>
                <p class="text-white font-medium mb-1">Email</p>
                <a href="mailto:daldirijogja900@gmail.com" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  daldirijogja900@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Partner Logos Section -->
        <div>
       
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-3 rounded-lg hover:scale-105 transition-transform duration-200">
              <img src="https://asosiasijeepmerapi.com/storage/diktisaintek.png" alt="Dikti Saintek" class="w-full h-12 object-contain">
            </div>
            <div class="bg-white p-3 rounded-lg hover:scale-105 transition-transform duration-200">
              <img src="https://asosiasijeepmerapi.com/storage/umy.png" alt="UMY" class="w-full h-12 object-contain">
            </div>
            <div class="bg-white p-3 rounded-lg hover:scale-105 transition-transform duration-200">
              <img src="https://asosiasijeepmerapi.com/storage/bpbd.png" alt="BPBD" class="w-full h-12 object-contain">
            </div>
            <div class="bg-white p-3 rounded-lg hover:scale-105 transition-transform duration-200">
              <img src="https://asosiasijeepmerapi.com/storage/tut-wuri.png" alt="Tut Wuri Handayani" class="w-full h-12 object-contain">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-700 bg-gray-800">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-sm">
              © 2025 <span class="text-white font-medium">Asosiasi Jeep Wisata Lereng Merapi</span>. All rights reserved.
            </p>
          </div>
          
          <div class="flex items-center space-x-6 text-sm">
            <!-- <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Sitemap</a> -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMountain,
  faHome,
  faImages,
  faUsers,
  faComments,
  faInfoCircle,
  faLink,
  faAddressBook,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faHandshake
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMountain,
  faHome,
  faImages,
  faUsers,
  faComments,
  faInfoCircle,
  faLink,
  faAddressBook,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faHandshake
)
</script>