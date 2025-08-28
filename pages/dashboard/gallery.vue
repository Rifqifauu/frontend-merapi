<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

definePageMeta({
  layout: "dashboard",
  ssr: false,
});

const gallery = ref([]);
const form = ref({
  title: "",
  type: "image",
  file: null,
});
const message = ref(null);      // notif message
const messageType = ref("success"); // success / error

// Fetch data
const fetchGallery = async () => {
  try {
    const res = await axios.get("https://api.asosiasijeepmerapi.com/api/gallery");
    gallery.value = res.data;
  } catch (err) {
    console.error("Fetch error:", err.response?.data || err);
    showMessage("Gagal memuat gallery", "error");
  }
};

// Helper show message
const showMessage = (text, type = "success") => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => (message.value = null), 3000); // auto hilang 3 detik
};

// Handle file change
const handleFileChange = (e) => {
  form.value.file = e.target.files[0];
};

// Upload file
const uploadGallery = async () => {
  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("type", form.value.type);
    if (form.value.file) {
      formData.append("file", form.value.file);
    }

    await axios.post("https://api.asosiasijeepmerapi.com/api/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    form.value = { title: "", type: "image", file: null }; // reset form
    fetchGallery();
    showMessage("Upload berhasil ✅", "success");
  } catch (err) {
    console.error("Upload error:", err.response?.data || err);
    showMessage("Upload gagal ❌", "error");
  }
};

// Delete gallery item
const deleteGallery = async (id) => {
  try {
    await axios.delete(`https://api.asosiasijeepmerapi.com/api/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchGallery();
    showMessage("Berhasil dihapus 🗑️", "success");
  } catch (err) {
    console.error("Delete error:", err.response?.data || err);
    showMessage("Gagal menghapus ❌", "error");
  }
};

onMounted(fetchGallery);
</script>

<template>
  <div class="p-4 sm:p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">📸 Gallery Upload</h2>

    <!-- Notifikasi -->
    <div
      v-if="message"
      :class="[
        'mb-4 p-3 rounded-lg text-sm',
        messageType === 'success'
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
      ]"
    >
      {{ message }}
    </div>

    <!-- Upload Form -->
    <form
      @submit.prevent="uploadGallery"
      class="bg-white shadow rounded-lg p-4 sm:p-6 mb-8 space-y-4"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul"
          class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
        <select
          v-model="form.type"
          class="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">File</label>
        <input type="file" @change="handleFileChange" class="w-full text-sm" />
      </div>

      <button
        type="submit"
        class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Upload
      </button>
    </form>

    <!-- Gallery List -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="item in gallery"
        :key="item.id"
        class="bg-white border rounded-lg shadow hover:shadow-md transition p-3 relative flex flex-col"
      >
        <h3 class="font-semibold text-gray-800 text-sm truncate">
          {{ item.title }}
        </h3>

        <div class="mt-2 flex-1">
          <img
            v-if="item.type === 'image'"
            :src="`https://asosiasijeepmerapi.com/storage/${item.file_path}`"
            class="w-full h-48 object-cover rounded-lg"
          />
          <video v-else controls class="w-full h-48 object-cover rounded-lg">
            <source
              :src="`https://asosiasijeepmerapi.com/storage/${item.file_path}`"
            />
          </video>
        </div>

        <button
          @click="deleteGallery(item.id)"
          class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
