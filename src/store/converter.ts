import { defineStore } from 'pinia'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { Video, VideoFormat } from '../models/video'

const ffmpeg = createFFmpeg({ log: false })

export const useConverterStore = defineStore('converter', {
  state: () => ({
    isReady: false,
    isConverting: false,
    isSupported: true,
    output: ''
  }),
  actions: {
    async loadFFmpeg(): Promise<void> {
      try {
        await ffmpeg.load()
        this.isReady = true
      } catch (e) {
        console.warn(e)
        this.isSupported = false
      }
    },
    async convertToFormat(video: Video, format: VideoFormat): Promise<void> {
      this.isConverting = true
      this.output = ''

      const tempName = `${Date.now()}.${format.extension}`
      ffmpeg.FS('writeFile', video.name, await fetchFile(video.uri))
      await ffmpeg.run('-i', video.name, tempName)
      const data = ffmpeg.FS('readFile', tempName)

      this.output = URL.createObjectURL(new Blob([data.buffer], { type: format.mimeType }))
      this.isConverting = false
    }
  }
})

export default {
  useConverterStore
}
