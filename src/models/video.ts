export interface VideoFormat {
    mimeType: 'video/mp4' | 'video/webm' | 'video/ogg' | 'image/gif',
    extension: string,
}

export interface Video {
    name: string,
    uri: string,
    format: null | VideoFormat,
}
