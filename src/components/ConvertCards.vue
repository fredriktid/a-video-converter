<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Video, VideoFormat } from '../models/video'
import { useConverterStore } from '../store/converter'
import { storeToRefs } from 'pinia'
import ConvertButton from './ConvertButton.vue'

const video = ref<Video>({ name: '', uri: '', format: null })

const converterStore = useConverterStore()
const { loadFFmpeg, convertToFormat } = converterStore
const { isReady, isConverting, isSupported, output } = storeToRefs(converterStore)

// Proof of concept
const convertToGIF = () => {
  const toFormat: VideoFormat = { mimeType: 'image/gif', extension: 'gif' }
  convertToFormat(video.value, toFormat)
}

const updatePreview = (e: Event): void => {
  const files = e?.target?.files ?? []
  if (files.length) {
    const file = files[0]
    video.value.uri = URL.createObjectURL(file)
    video.value.name = file.name
  }
}

const downloadBlob = (): void => {
  const saveImg = document.createElement('a')
  saveImg.href = video.value.uri
  saveImg.download = `${Date.now()}.gif`
  saveImg.click()
}

onMounted(() => {
  loadFFmpeg()
})
</script>

<template>
  <div
    v-if="!isSupported"
    class="text-xl text-center mt-5"
  >
    Your browser does not support ffmpeg.wasm. Try to upgrade or switch to Chrome.
  </div>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-5"
  >
    <div
      class="bg-white rounded md:shadow p-4 flex flex-col items-center justify-center"
      :class="{ 'h-60': !video.uri, 'opacity-50': !isReady }"
    >
      <video
        v-if="video.uri"
        controls
        :src="video.uri"
        class="mb-4"
      />
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="video/*"
        @change="updatePreview"
      >
      <div>
        <ConvertButton
          :disabled="!isReady || isConverting"
          :text="isReady ? 'Select a video file' : 'Loading converter...'"
          @click="$refs.fileInput.click()"
        />
        <ConvertButton
          v-if="video.uri"
          class="ml-2"
          :disabled="isConverting"
          :text="isConverting ? 'Converting...' : 'Convert To GIF'"
          @click="convertToGIF"
        />
      </div>
    </div>
    <div
      class="bg-white rounded md:shadow p-4"
      :class="{ 'opacity-50': !video.uri }"
    >
      <div class="flex items-center justify-center h-full">
        <div
          v-if="output"
          class="text-center"
        >
          <img
            :src="output"
            alt="output gif"
            class="mb-4"
          >
          <ConvertButton
            text="Download GIF"
            @click="downloadBlob"
          />
        </div>
        <div
          v-else
          class="text-gray-500 text-xl"
          v-text="isConverting ? 'Converting...' : 'Output'"
        />
      </div>
    </div>
  </div>
</template>
