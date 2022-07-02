import { ref } from 'vue'
import FFmpeg from '@ffmpeg/ffmpeg'
import { Video } from '../models/video'

const { createFFmpeg, fetchFile } = FFmpeg
const ffmpeg = createFFmpeg({ log: false })

export default function useFFmpeg() {
  const isReady = ref<boolean>(false)
  const isConverting = ref<boolean>(false)
  const isSupported = ref<boolean>(true)
  const output = ref<null | string>(null)

  const load = async () => {
    try {
      await ffmpeg.load()
      isReady.value = true
    } catch (e) {
      console.warn(e)
      isSupported.value = false
    }
  }

  const convertToGIF = async (video: Video) => {
    isConverting.value = true
    const tempFileOutputName = `${Date.now()}.gif`
    ffmpeg.FS('writeFile', video.name, await fetchFile(video.uri))
    await ffmpeg.run('-i', video.name, tempFileOutputName)
    const data = ffmpeg.FS('readFile', tempFileOutputName)

    output.value = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
    isConverting.value = false
  }

  return {
    isReady,
    load,
    convertToGIF,
    output,
    isConverting,
    isSupported
  }
}
