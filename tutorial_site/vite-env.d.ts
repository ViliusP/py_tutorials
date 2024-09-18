/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly GENERATE_REMOTE_BLURHASH: boolean
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}