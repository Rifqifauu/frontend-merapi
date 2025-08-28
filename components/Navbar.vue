<template>
  <nav class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
      
      <!-- Logo -->
      <div class="flex items-center space-x-3 pr-4">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'mountain']" class="text-white text-lg" />
        </div>
        <div>
          <h1 class="text-lg font-bold text-gray-900">Asosiasi Jeep</h1>
          <p class="text-xs text-gray-500 -mt-1"> Tour Merapi</p>
        </div>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          <font-awesome-icon :icon="['fas','home']" class="text-sm" /> Beranda
        </NuxtLink>
        <NuxtLink to="/galeri" class="nav-link" :class="{ active: $route.path === '/galeri' }">
          <font-awesome-icon :icon="['fas','images']" class="text-sm" /> Galeri
        </NuxtLink>
        <NuxtLink to="/communities" class="nav-link" :class="{ active: $route.path === '/communities' }">
          <font-awesome-icon :icon="['fas','users']" class="text-sm" /> Anggota
        </NuxtLink>
        <NuxtLink v-if="auth.token" to="/forum" class="nav-link" :class="{ active: $route.path === '/forum' }">
          <font-awesome-icon :icon="['fas','comments']" class="text-sm" /> Forum
        </NuxtLink>
        <NuxtLink to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">
          <font-awesome-icon :icon="['fas','info-circle']" class="text-sm" /> Tentang
        </NuxtLink>
        <NuxtLink to="/testi" class="nav-link" :class="{ active: $route.path === '/testi' }">
          <font-awesome-icon :icon="['fas','star']" class="text-sm" /> Testimoni
        </NuxtLink>

        <!-- Dropdown -->
        <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown" class="nav-link flex items-center gap-1">
            <font-awesome-icon :icon="['fas','ellipsis-h']" class="text-sm" /> Lainnya
            <font-awesome-icon :icon="['fas', showDropdown ? 'chevron-up' : 'chevron-down']" class="text-xs" />
          </button>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div v-if="showDropdown" class="absolute right-0 bg-white border rounded-lg shadow-lg mt-2 min-w-[180px] z-50 py-1">
              <NuxtLink to="/berita" class="dropdown-link" :class="{ active: $route.path === '/berita' }" @click="closeDropdown">
                <font-awesome-icon :icon="['fas','newspaper']" class="text-sm" /> Berita
              </NuxtLink>
              <NuxtLink to="/pengumuman" class="dropdown-link" :class="{ active: $route.path === '/pengumuman' }" @click="closeDropdown">
                <font-awesome-icon :icon="['fas','bullhorn']" class="text-sm" /> Pengumuman
              </NuxtLink>
              <NuxtLink to="/events" class="dropdown-link" :class="{ active: $route.path === '/events' }" @click="closeDropdown">
                <font-awesome-icon :icon="['fas','calendar-alt']" class="text-sm" /> Events
              </NuxtLink>
            </div>
          </transition>
        </div>
      </div>

      <!-- Auth Desktop -->
      <div class="hidden pl-4 md:flex items-center space-x-4">
        <template v-if="auth.token">
          <span class="text-blue-900 font-medium">Halo, {{ auth.name }}</span>
          <button @click="logout" class="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium">
            <font-awesome-icon :icon="['fas','sign-out-alt']" /> Logout
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/auth" class="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <font-awesome-icon :icon="['fas','sign-in-alt']" /> Login 
          </NuxtLink>
        </template>
      </div>

      <!-- Mobile Toggle -->
      <button class="md:hidden" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas','bars']" class="text-xl text-gray-700" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div v-if="showMobileMenu" class="md:hidden mt-4 pb-4 border-t border-gray-100">
        <div class="flex flex-col space-y-3 pt-4">
          <NuxtLink to="/" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/' }">
            <font-awesome-icon :icon="['fas','home']" /> Beranda
          </NuxtLink>
          <NuxtLink to="/galeri" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/galeri' }">
            <font-awesome-icon :icon="['fas','images']" /> Galeri
          </NuxtLink>
          <NuxtLink to="/communities" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/communities' }">
            <font-awesome-icon :icon="['fas','users']" /> Anggota
          </NuxtLink>
          <NuxtLink v-if="auth.token" to="/forum" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/forum' }">
            <font-awesome-icon :icon="['fas','comments']" /> Forum
          </NuxtLink>

          <div class="border-t border-gray-200 pt-3 mt-3">
            <p class="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">Menu Lainnya</p>
            <NuxtLink to="/berita" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/berita' }">
              <font-awesome-icon :icon="['fas','newspaper']" /> Berita
            </NuxtLink>
            <NuxtLink to="/pengumuman" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/pengumuman' }">
              <font-awesome-icon :icon="['fas','bullhorn']" /> Pengumuman
            </NuxtLink>
            <NuxtLink to="/events" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/events' }">
              <font-awesome-icon :icon="['fas','calendar-alt']" /> Events
            </NuxtLink>
            <NuxtLink to="/about" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/about' }">
              <font-awesome-icon :icon="['fas','info-circle']" /> Tentang
            </NuxtLink>
            <NuxtLink to="/testi" @click="closeMobileMenu" class="mobile-link" :class="{ activeMobile: $route.path === '/testi' }">
              <font-awesome-icon :icon="['fas','star']" /> Testimoni
            </NuxtLink>
          </div>

          <!-- Auth Mobile -->
          <div class="border-t border-gray-200 pt-3 mt-3">
            <template v-if="auth.token">
              <div class="px-2 py-2 text-sm text-blue-900 mb-2"> Halo, {{ auth.name }}</div>
              <button @click="logout" class="mobile-link text-red-600 w-full text-left">
                <font-awesome-icon :icon="['fas','sign-out-alt']" /> Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth" @click="closeMobileMenu" class="mobile-link text-blue-600">
                <font-awesome-icon :icon="['fas','sign-in-alt']" /> Login 
              </NuxtLink>
            </template>
          </div>

        </div>
      </div>
    </transition>
  </nav>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMountain, faHome, faImages, faUsers, faComments, faInfoCircle,
  faSignInAlt, faSignOutAlt, faBars, faNewspaper, faBullhorn,
  faCalendarAlt, faEllipsisH, faChevronUp, faChevronDown, faStar
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMountain, faHome, faImages, faUsers, faComments, faInfoCircle,
  faSignInAlt, faSignOutAlt, faBars, faNewspaper, faBullhorn,
  faCalendarAlt, faEllipsisH, faChevronUp, faChevronDown, faStar
)

const router = useRouter()
const showMobileMenu = ref(false)
const showDropdown = ref(false)
const dropdownRef = ref(null)

const { auth, loadAuth, setAuth } = useAuth()

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  loadAuth()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Click outside dropdown
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showDropdown.value = false
  }
}

const toggleDropdown = () => { showDropdown.value = !showDropdown.value }
const closeDropdown = () => { showDropdown.value = false }
const toggleMobileMenu = () => { showMobileMenu.value = !showMobileMenu.value }
const closeMobileMenu = () => { showMobileMenu.value = false }

const logout = () => {
  setAuth({ id: null, name: null, token: null })
  closeMobileMenu()
  closeDropdown()
  router.push('/auth')
}
</script>


<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-2;
}
.nav-link.active {
  @apply text-blue-600;
}
.dropdown-link {
  @apply block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-3;
}
.dropdown-link.active {
  @apply text-blue-600 bg-blue-50;
}
.mobile-link {
  @apply text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50;
}
.mobile-link.activeMobile {
  @apply text-blue-600 bg-blue-50;
}
</style>
