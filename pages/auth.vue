<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Toggle Tabs -->
      <div class="flex justify-around mb-6">
        <button
          @click="isLogin = true"
          :class="isLogin ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-500'"
          class="pb-2 w-1/2"
        >
          Login
        </button>  
      </div>

      <!-- Notification -->
      <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        ❌ {{ error }}
      </div>
      <div v-if="success" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
        ✅ {{ success }}
      </div>

      <!-- Form Login -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="login.email"
            type="email"
            required
            class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="login.password"
            type="password"
            required
            class="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
    ssr: false
})

useHead({
  title: 'Masuk/Daftar Akun',
  meta: [
    { name: 'description', content: 'Ini adalah halaman Masuk/Daftar dari Website Asosiasi Jeep Merapi' }
  ]
})

const router = useRouter()
const baseUrl = 'https://api.asosiasijeepmerapi.com/api'

const { auth, setAuth } = useAuth()

// toggle state
const isLogin = ref(true)

// form state
const login = ref({
  email: '',
  password: ''
})

const register = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

// notification state
const error = ref('')
const success = ref('')

// handle login
const handleLogin = async () => {
  error.value = ''
  success.value = ''
  try {
    const res = await axios.post(`${baseUrl}/login`, login.value)
    const isAdmin = res.data.user.is_admin ? '1' : '0'

    // ✅ GANTI: Gunakan setAuth dari composable (bukan manual localStorage + auth.value)
    setAuth({
      id: res.data.user.id,
      name: res.data.user.name,
      token: res.data.token,
      is_admin: isAdmin
    })

    success.value = 'Login berhasil!'

    // redirect sesuai role
    if (isAdmin === '1') router.push('/dashboard')
    else router.push('/')
    
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Login gagal'
  }
}

// handle register
const handleRegister = async () => {
  error.value = ''
  success.value = ''
  try {
    const res = await axios.post(`${baseUrl}/register`, register.value)
    const isAdmin = res.data.user.is_admin ? '1' : '0'

    // ✅ GANTI: Gunakan setAuth dari composable
    setAuth({
      id: res.data.user.id,
      name: res.data.user.name,
      token: res.data.token,
      is_admin: isAdmin
    })

    success.value = 'Register berhasil!'
    router.push('/')
    
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.message || 'Register gagal'
  }
}
</script>
