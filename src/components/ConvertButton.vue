<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    class="disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 transition text-white py-3 px-6 rounded hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none"
    v-text="text"
  />
</template>
