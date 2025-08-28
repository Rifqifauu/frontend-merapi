<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">⭐ Dashboard Testimoni</h1>

    <!-- Notifications -->
    <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
      <span class="mr-2">✅</span>{{ success }}
    </div>
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
      <span class="mr-2">❌</span>{{ error }}
    </div>
    <div v-if="loading" class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
      Loading...
    </div>

    <!-- Form Tambah/Edit -->
    <form @submit.prevent="saveTestimonial" class="space-y-3 bg-white p-5 rounded-xl shadow mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Nama *</label>
        <input v-model="form.name" type="text" class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500" :disabled="loading" required />
      </div>

      <!-- Rating bintang interaktif -->
      <div>
        <label class="block text-sm font-medium mb-1">Rating *</label>
        <div class="flex space-x-1 text-yellow-500 text-xl">
          <span 
            v-for="n in 5" 
            :key="n" 
            @click="form.rating = n" 
            class="cursor-pointer hover:text-yellow-400"
          >
            {{ n <= form.rating ? '★' : '☆' }}
          </span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Testimoni *</label>
        <textarea v-model="form.testimonial" class="w-full p-2 rounded border h-20 focus:ring-2 focus:ring-blue-500" :disabled="loading" required></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Foto</label>
        <input type="file" @change="handleFileChange" accept="image/*" :disabled="loading" />
      </div>

      <div class="flex space-x-2">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50" :disabled="loading">
          {{ loading ? 'Processing...' : (isEditing ? 'Update' : 'Create') }}
        </button>
        <button type="button" @click="resetForm" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" :disabled="loading">
          Cancel
        </button>
      </div>
    </form>

    <!-- Card list (mobile & desktop) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="t in testimonials" :key="t.id" class="bg-white p-4 rounded-xl shadow flex flex-col">
        <img v-if="t.photo" :src="photoUrl(t.photo)" class="w-full h-48 object-cover rounded mb-3" />
        <h3 class="font-bold text-lg mb-1">{{ t.name }}</h3>
        <p class="text-yellow-500 mb-1">
          <span v-for="n in 5" :key="n">
            {{ n <= t.rating ? '★' : '☆' }}
          </span>
        </p>
        <p class="text-gray-700 mb-2">{{ t.testimonial }}</p>
        <div class="flex space-x-2 mt-auto">
          <button @click="editTestimonial(t)" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600" :disabled="loading">
            Edit
          </button>
          <button @click="deleteTestimonial(t.id)" class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" :disabled="loading">
            Delete
          </button>
        </div>
      </div>
      <p v-if="testimonials.length === 0 && !loading" class="text-center text-gray-500 col-span-full">
        No testimonials found
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

definePageMeta({ layout: 'dashboard', ssr: false })

const token = localStorage.getItem('token') || ''

const api = axios.create({
  baseURL: 'https://api.asosiasijeepmerapi.com/api',
  headers: { Authorization: `Bearer ${token}` }
})

const testimonials = ref([])
const form = ref({ id: null, name: '', testimonial: '', rating: 1, photo: null })
const isEditing = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

const showNotification = (message, type = 'success') => {
  if (type === 'success') { success.value = message; error.value = '' }
  else { error.value = message; success.value = '' }

  setTimeout(() => { success.value = ''; error.value = '' }, 3000)
}

const fetchTestimonials = async () => {
  loading.value = true
  try {
    const res = await api.get('/testimonials')
    testimonials.value = res.data
  } catch (err) {
    showNotification('Failed to fetch testimonials', 'error')
    console.error(err)
  } finally { loading.value = false }
}

const handleFileChange = e => {
  form.value.photo = e.target.files[0]
}

const saveTestimonial = async () => {
  if (!form.value.name || !form.value.testimonial || !form.value.rating) {
    showNotification('Please fill all required fields', 'error')
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('testimonial', form.value.testimonial)
    formData.append('rating', form.value.rating)
    if (form.value.photo) formData.append('photo', form.value.photo)

    if (isEditing.value) {
      await api.post(`/testimonials/${form.value.id}?_method=PUT`, formData)
      showNotification('Testimonial updated! 🎉')
    } else {
      await api.post('/testimonials', formData)
      showNotification('Testimonial created! ✨')
    }

    resetForm()
    await fetchTestimonials()
  } catch (err) {
    showNotification(isEditing.value ? 'Failed to update testimonial' : 'Failed to create testimonial', 'error')
    console.error(err)
  } finally { loading.value = false }
}

const editTestimonial = t => {
  form.value = { ...t, photo: null }
  isEditing.value = true
}

const deleteTestimonial = async id => {
  if (!confirm('Are you sure to delete this testimonial?')) return
  loading.value = true
  try {
    await api.delete(`/testimonials/${id}`)
    showNotification('Testimonial deleted 🗑️')
    await fetchTestimonials()
  } catch (err) {
    showNotification('Failed to delete testimonial', 'error')
    console.error(err)
  } finally { loading.value = false }
}

const resetForm = () => {
  form.value = { id: null, name: '', testimonial: '', rating: 1, photo: null }
  isEditing.value = false
}

const photoUrl = path => `https://asosiasijeepmerapi.com/storage/${path}`

onMounted(fetchTestimonials)
</script>

<style scoped>
</style>
