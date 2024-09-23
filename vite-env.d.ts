/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly GENERATE_BLURHASH_MODE: string
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}