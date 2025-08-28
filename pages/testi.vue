<script setup>
import { ref, onMounted, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faStar)

// State
const testimonies = ref([])
const loading = ref(false)
const photoPreview = ref(null)


onMounted(() => {
  loadTestimonials()
})

async function loadTestimonials() {
  try {
    loading.value = true
    testimonies.value = await $fetch('https://api.asosiasijeepmerapi.com/api/testimonials')
  } catch (err) {
    console.error('Gagal fetch testimoni', err)
  } finally {
    loading.value = false
  }
}


function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2)
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-blue-900 text-white py-16">
      <div class="max-w-5xl mx-auto text-center px-6">
        <h1 class="text-4xl font-bold mb-4">Testimoni</h1>
        <p class="text-lg text-blue-100">Apa kata mereka tentang Asosiasi Jeep Merapi</p>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="text-gray-500 mt-2">Memuat testimoni...</p>
      </div>

      <div v-else-if="testimonies.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="(item, idx) in testimonies" 
          :key="idx" 
          class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition hover:scale-[1.02]"
        >
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
             
              <div class="text-blue-600 font-bold">{{ getInitials(item.name || 'Anonim') }}</div>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">{{ item.name || 'Anonim' }}</h3>
              <p class="text-xs text-gray-400">{{ formatDate(item.created_at) }}</p>
            </div>
          </div>

          <div class="flex items-center mb-3">
            <font-awesome-icon 
              v-for="n in 5" 
              :key="n" 
              :icon="['fas','star']" 
              :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'" 
            />
            <span class="ml-2 text-sm text-gray-500">({{ item.rating }}/5)</span>
          </div>

          <p class="text-gray-700 mb-3 bg-gray-50 p-4 rounded-lg shadow-inner">{{ item.testimonial }}</p>

          <div v-if="item.photo" class="mt-2 w-full h-40 rounded-lg overflow-hidden">
            <img 
              :src="`https://asosiasijeepmerapi.com/storage/${item.photo}`" 
              class="w-full h-full object-cover"
              @error="$event.target.style.display='none'" 
            />
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <p class="text-gray-500 mb-4">Belum ada testimoni</p>
      </div>

     

    </section>
  </div>
</template>
