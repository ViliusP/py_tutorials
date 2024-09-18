/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly GENERATE_BLURHASH_MODE: number
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}