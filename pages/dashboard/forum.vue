<template>
  <div class="min-h-screen p-3 sm:p-8 bg-gray-100">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Forum</h1>

    <!-- Notification -->
    <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
      ❌ {{ error }}
    </div>
    <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
      ✅ {{ success }}
    </div>

    <!-- Create Post -->
    <div class="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded shadow">
      <textarea
        v-model="newPost"
        placeholder="Tulis sesuatu..."
        class="w-full p-3 rounded border resize-none text-sm sm:text-base"
        rows="3"
        :disabled="!isLoggedIn"
      ></textarea>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
        <button
          @click="submitPost"
          :disabled="!isLoggedIn"
          class="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
        >
          Post
        </button>
        <p v-if="!isLoggedIn" class="text-xs text-red-500 mt-2 sm:mt-0 sm:ml-3">
          Silakan login terlebih dahulu untuk membuat post.
        </p>
      </div>
    </div>

    <!-- List Posts -->
    <div class="space-y-3 sm:space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-3 sm:p-4 rounded shadow"
      >
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
          <p class="font-semibold text-sm sm:text-base">{{ getUserName(post.user, post.user_id) }}</p>
          <div class="flex items-center justify-between sm:justify-end space-x-3">
            <span class="text-xs sm:text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
            <button
              v-if="canDelete(post.user_id)"
              @click="deletePost(post.id)"
              class="text-red-500 hover:text-red-700 text-xs sm:text-sm px-2 py-1 hover:bg-red-50 rounded transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Content -->
        <p class="mb-3 text-sm sm:text-base leading-relaxed">{{ post.content }}</p>

        <!-- Reply Section -->
        <div class="border-l-2 border-gray-200 pl-3 sm:pl-4 space-y-3">
          <!-- Existing Replies -->
          <div
            v-for="reply in post.all_replies"
            :key="reply.id"
            class="bg-gray-50 p-2 sm:p-3 rounded"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
              <p class="font-semibold text-xs sm:text-sm">{{ getUserName(reply.user, reply.user_id) }}</p>
              <div class="flex items-center justify-between sm:justify-end space-x-2">
                <span class="text-xs text-gray-500">{{ formatDate(reply.created_at) }}</span>
                <button
                  v-if="canDelete(reply.user_id)"
                  @click="deleteReply(reply.id)"
                  class="text-red-500 hover:text-red-700 text-xs px-1 py-0.5 hover:bg-red-50 rounded transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
            <p class="text-xs sm:text-sm">{{ reply.content }}</p>
          </div>

          <!-- Reply Input -->
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                v-model="replyContent[post.id]"
                type="text"
                placeholder="Balas..."
                class="flex-1 p-2 border rounded text-sm"
                :disabled="!isLoggedIn"
                @keypress.enter="submitReply(post.id)"
              />
              <button
                @click="submitReply(post.id)"
                :disabled="!isLoggedIn"
                class="w-full sm:w-auto bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 disabled:opacity-50 text-sm font-medium whitespace-nowrap"
              >
                Reply
              </button>
            </div>
            <p v-if="!isLoggedIn" class="text-xs text-red-500">
              Silakan login terlebih dahulu untuk membalas post.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="posts.length === 0" class="text-center py-8 text-gray-500">
      <p class="text-sm sm:text-base">Belum ada post di forum ini.</p>
      <p v-if="isLoggedIn" class="text-xs sm:text-sm mt-1">Jadilah yang pertama membuat post!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

useHead({
  title: 'Forum',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Forum dari Website Asosiasi Jeep Merapi' }
  ]
})
definePageMeta({
  layout: 'dashboard',
  ssr: false,
})

// Base URL API
const baseUrl = 'https://api.asosiasijeepmerapi.com/api'

// State
const posts = ref([])
const newPost = ref('')
const replyContent = ref({})
const error = ref('')
const success = ref('')

// Current user
const currentUserId = Number(localStorage.getItem('user_id') || 0)
const currentUserName = localStorage.getItem('user_name') || 'Guest'
const isAdmin = localStorage.getItem('is_admin') === '1'
const isLoggedIn = computed(() => !!currentUserId && !!localStorage.getItem('token'))

// Helper functions
const getUserName = (user, userId) => {
  if (user?.name) return user.name
  if (user?.username) return user.username
  if (userId === currentUserId) return currentUserName
  return 'Guest'
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

const canDelete = (ownerId) => {
  return Number(ownerId) === currentUserId || isAdmin
}

// Axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})

// Interceptor token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-clear notifications
const clearNotification = () => {
  setTimeout(() => {
    error.value = ''
    success.value = ''
  }, 5000)
}

// Fetch posts
const fetchPosts = async () => {
  error.value = ''
  try {
    const res = await api.get('/forum')
    posts.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal memuat forum'
    clearNotification()
  }
}

// Submit post
const submitPost = async () => {
  if (!isLoggedIn.value) {
    error.value = 'Silakan login terlebih dahulu untuk membuat post.'
    clearNotification()
    return
  }
  if (!newPost.value.trim()) {
    error.value = 'Post tidak boleh kosong'
    clearNotification()
    return
  }

  try {
    await api.post('/forum', { content: newPost.value })
    success.value = 'Post berhasil dibuat!'
    newPost.value = ''
    fetchPosts()
    clearNotification()
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal membuat post'
    clearNotification()
  }
}

// Submit reply
const submitReply = async (postId) => {
  if (!isLoggedIn.value) {
    error.value = 'Silakan login terlebih dahulu untuk membalas post.'
    clearNotification()
    return
  }
  const content = replyContent.value[postId]
  if (!content?.trim()) {
    error.value = 'Balasan tidak boleh kosong'
    clearNotification()
    return
  }

  try {
    await api.post(`/forum/${postId}/reply`, { content })
    success.value = 'Balasan berhasil dikirim!'
    replyContent.value[postId] = ''
    fetchPosts()
    clearNotification()
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal membalas post'
    clearNotification()
  }
}

// Delete post
const deletePost = async (postId) => {
  if (!confirm('Yakin hapus post ini?')) return
  try {
    await api.delete(`/forum/${postId}`)
    success.value = 'Post berhasil dihapus!'
    fetchPosts()
    clearNotification()
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal menghapus post'
    clearNotification()
  }
}

// Delete reply
const deleteReply = async (replyId) => {
  if (!confirm('Yakin hapus balasan ini?')) return
  try {
    await api.delete(`/forum/${replyId}`)
    success.value = 'Balasan berhasil dihapus!'
    fetchPosts()
    clearNotification()
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal menghapus balasan'
    clearNotification()
  }
}

onMounted(fetchPosts)
</script>