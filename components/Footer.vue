<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'mountain']" class="text-white text-xl" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Jeep Merapi</h3>
              <p class="text-sm text-gray-400 -mt-1">Asosiasi Tour</p>
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
                  Jl. Kaliurang KM 25, Hargobinangun<br>
                  Pakem, Sleman, Yogyakarta 55582
                </p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <font-awesome-icon :icon="['fas', 'phone']" class="text-blue-500 mt-1" />
              <div>
                <p class="text-white font-medium mb-1">Telepon</p>
                <a href="tel:+62274123456" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  +62 274 123 456
                </a>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <font-awesome-icon :icon="['fas', 'envelope']" class="text-blue-500 mt-1" />
              <div>
                <p class="text-white font-medium mb-1">Email</p>
                <a href="mailto:info@asosiasijeepmerapi.com" class="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  info@asosiasijeepmerapi.com
                </a>
              </div>
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
              © 2025 <span class="text-white font-medium">Asosiasi Jeep Tour Merapi</span>. All rights reserved.
            </p>
            <p class="text-gray-500 text-xs mt-1">
              Dibuat dengan ❤️ untuk komunitas Jeep Tour Indonesia
            </p>
          </div>
          
          <div class="flex items-center space-x-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-blue-400 transition-colors">Sitemap</a>
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
  faEnvelope
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
  faEnvelope
)
</script>
