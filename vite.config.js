import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, '.', 'VITE_')
  const base = (environment.VITE_BASE_PATH || '').replace(/^\/+|\/+$/g, '')

  return {
    base: base ? `/${base}/` : '/',
    plugins: [react()],
  }
})
