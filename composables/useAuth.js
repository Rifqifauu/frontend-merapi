// ~/composables/useAuth.js
export function useAuth() {
  // ✅ useState Nuxt - Shared state across all components
  const auth = useState('auth.user', () => ({ 
    id: null, 
    name: null, 
    token: null, 
    is_admin: '0' 
  }))

  const loadAuth = () => {
    // Only run on client side
    if (process.client) {
      const token = localStorage.getItem('token')
      const user_name = localStorage.getItem('user_name')
      const user_id = localStorage.getItem('user_id')
      const is_admin = localStorage.getItem('is_admin') || '0'

      if (token && user_name && user_id) {
        auth.value = { 
          id: user_id, 
          name: user_name, 
          token, 
          is_admin 
        }
      }
    }
  }

  const setAuth = (data) => {
    // ✅ Update useState - akan memicu reactivity di semua komponen
    auth.value = { 
      id: data.id || null,
      name: data.name || null,
      token: data.token || null,
      is_admin: data.is_admin || '0'
    }
    
    // Update localStorage
    if (process.client) {
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.id)
        localStorage.setItem('user_name', data.name)
        localStorage.setItem('is_admin', data.is_admin || '0')
      } else {
        // Clear localStorage saat logout
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_name')
        localStorage.removeItem('is_admin')
      }
    }
  }

  return { auth, loadAuth, setAuth }
}