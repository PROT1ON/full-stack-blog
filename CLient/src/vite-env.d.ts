
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMAGEKIT_URL_ENDPOINT: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
