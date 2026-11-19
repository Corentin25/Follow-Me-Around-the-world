import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const REPO_BASE = '/Follow-Me-Around-the-world/'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? (process.env.VITE_BASE ?? REPO_BASE) : '/',
  plugins: [react()],
}))
