<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({ layout: "dashboard", ssr: false });

// Ambil token dari localStorage
const token = localStorage.getItem("token") || "";

// Axios instance
const api = axios.create({
  baseURL: "https://api.asosiasijeepmerapi.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const users = ref([]);
const form = ref({ id: null, name: "", email: "", password: "", is_admin: false });
const isEditing = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");

// Notifikasi
const showNotification = (message, type = "success") => {
  if (type === "success") {
    success.value = message;
    error.value = "";
  } else {
    error.value = message;
    success.value = "";
  }
  setTimeout(() => {
    success.value = "";
    error.value = "";
  }, 3000);
};

// Fetch users
const fetchUsers = async () => {
  loading.value = true;
  try {
    const res = await api.get("/users");
    users.value = res.data;
  } catch (err) {
    showNotification("Failed to fetch users", "error");
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};

// Save / update user
const saveUser = async () => {
  if (!form.value.name || !form.value.email || (!isEditing.value && !form.value.password)) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  loading.value = true;
  try {
    if (isEditing.value) {
      await api.put(`/users/${form.value.id}`, form.value);
      showNotification("User updated successfully! 🎉");
    } else {
      await api.post("/users", form.value);
      showNotification("User created successfully! ✨");
    }
    resetForm();
    await fetchUsers();
  } catch (err) {
    showNotification(isEditing.value ? "Failed to update user" : "Failed to create user", "error");
    console.error("Save error:", err.response?.data || err);
  } finally {
    loading.value = false;
  }
};

// Edit user
const editUser = (user) => {
  form.value = { ...user, password: "" }; // kosongkan password saat edit
  isEditing.value = true;
  success.value = "";
  error.value = "";
};

// Delete user
const deleteUser = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  loading.value = true;
  try {
    await api.delete(`/users/${id}`);
    showNotification("User deleted successfully! 🗑️");
    await fetchUsers();
  } catch (err) {
    showNotification("Failed to delete user", "error");
    console.error("Delete error:", err);
  } finally {
    loading.value = false;
  }
};

// Reset form
const resetForm = () => {
  form.value = { id: null, name: "", email: "", password: "", is_admin: false };
  isEditing.value = false;
};

// Load on mount
onMounted(fetchUsers);
</script>

<template>
  <div class="p-4 sm:p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">👤 Dashboard Users</h1>

    <!-- Notifications -->
    <div
      v-if="success"
      class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center"
    >
      <span class="mr-2">✅</span>{{ success }}
    </div>
    <div
      v-if="error"
      class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center"
    >
      <span class="mr-2">❌</span>{{ error }}
    </div>
    <div
      v-if="loading"
      class="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded"
    >
      Loading...
    </div>

    <!-- Form -->
    <form @submit.prevent="saveUser" class="space-y-3 bg-white p-5 rounded-xl shadow mb-6">
      <div>
        <label class="block text-sm font-medium mb-1">Name *</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email *</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">
          {{ isEditing ? "Password (optional)" : "Password *" }}
        </label>
        <input
          v-model="form.password"
          type="password"
          class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
          :required="!isEditing"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Role</label>
        <select
          v-model="form.is_admin"
          class="w-full p-2 rounded border focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        >
          <option :value="false">User</option>
          <option :value="true">Admin</option>
        </select>
      </div>

      <div class="flex space-x-2">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? "Processing..." : (isEditing ? "Update" : "Create") }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          :disabled="loading"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- Table (desktop) -->
    <div class="hidden md:block bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Role</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0 && !loading" class="border-t">
            <td colspan="4" class="p-4 text-center text-gray-500">No users found</td>
          </tr>
          <tr v-for="user in users" :key="user.id" class="border-t hover:bg-gray-50">
            <td class="p-3 font-medium">{{ user.name }}</td>
            <td class="p-3">{{ user.email }}</td>
            <td class="p-3">
              <span
                :class="user.is_admin ? 'text-red-600 font-semibold' : 'text-gray-600'"
              >
                {{ user.is_admin ? "Admin" : "User" }}
              </span>
            </td>
            <td class="p-3">
              <div class="flex justify-center space-x-2">
                <button
                  @click="editUser(user)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  :disabled="loading"
                >
                  Edit
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  :disabled="loading"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card list (mobile) -->
    <div class="space-y-4 md:hidden">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white p-4 rounded-xl shadow"
      >
        <h3 class="font-bold text-lg">{{ user.name }}</h3>
        <p class="text-sm text-gray-600 mb-1">{{ user.email }}</p>
        <p class="text-sm text-gray-500">
          Role: {{ user.is_admin ? "Admin" : "User" }}
        </p>
        <div class="flex space-x-2 mt-3">
          <button
            @click="editUser(user)"
            class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
            :disabled="loading"
          >
            Edit
          </button>
          <button
            @click="deleteUser(user.id)"
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            :disabled="loading"
          >
            Delete
          </button>
        </div>
      </div>
      <p v-if="users.length === 0 && !loading" class="text-center text-gray-500">
        No users found
      </p>
    </div>
  </div>
</template>
