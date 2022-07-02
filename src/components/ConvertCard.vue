<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Video } from '../models/video'
import useFFmpeg from '../hooks/UseFFmpeg'
import ConvertButton from './ConvertButton.vue'

const video = ref<Video>({
  name: '',
  uri: '',
  type: ''
})

const {
  isReady,
  convertToGIF,
  output,
  isConverting,
  isSupported,
  load
} = useFFmpeg()

const updatePreview = (e: Event) => {
  const files = e?.target?.files ?? []
  if (files.length) {
    const file = files[0]
    video.value.uri = URL.createObjectURL(file)
    video.value.name = file.name
  }
}

const downloadBlob = () => {
  const saveImg = document.createElement('a')
  saveImg.href = video.value.uri
  saveImg.download = `${Date.now()}.gif`
  saveImg.click()
}

onMounted(() => {
  load()
})
</script>

<template>
  <div class="antialiased text-gray-900 px-6">
    <div class="max-w-7xl mx-auto py-12">
      <div class="text-center">
        <h1 class="text-4xl text-white font-semibold">
          Video-to-GIF
        </h1>
      </div>
      <div
        v-if="!isSupported"
        class="text-xl text-center mt-5"
      >
        Your browser does not support ffmpeg.wasm. Try in Chrome instead.
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-5"
      >
        <div :class="`bg-white rounded md:shadow p-4 ${!video.uri && 'h-60'} flex flex-col items-center justify-center`">
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
              :text="isReady ? 'Select Video File' : 'Loading ffmpeg...'"
              @click="$refs.fileInput.click()"
            />
            <ConvertButton
              v-if="video.uri"
              class="ml-2"
              :disabled="isConverting"
              :text="isConverting ? 'Converting Video...' : 'Convert To GIF'"
              @click="convertToGIF(video)"
            />
          </div>
        </div>
        <div class="bg-white rounded md:shadow p-4">
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
            >
              GIF comes here
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
