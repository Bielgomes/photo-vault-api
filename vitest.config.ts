import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    reporters: 'verbose',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', 'src/tests/**'],
    },
  },
})
