declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_VERSION: '12' | '13' | '14'
    }
  }
}
