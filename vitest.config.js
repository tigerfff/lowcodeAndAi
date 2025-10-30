import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    server: {
      deps: {
        inline: [/^(?!.*vitest).*$/]
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  esbuild: {
    target: 'node18'
  }
})

