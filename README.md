# A video converter

Provides a simple interface to convert videos using [ffmpeg.wasm](https://ffmpegwasm.netlify.app/) in the browser.

Developed with Vue 3, TypeScript, Vite, Pinia, Tailwind, and ffmpeg.wasm

## Development

```bash
# Install dependencies
yarn install

# Run dev server
yarn dev
```

## Production

Build and preview the app locally:
```bash
# Build for production
yarn build

# Preview locally
yarn preview
```
Also since ffmpeg uses [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) every response must include the following headers:
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```
The dev server already does this. See `vite.config.ts`.
