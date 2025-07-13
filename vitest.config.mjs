import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['pages/api/__tests__/snacks.test.js'],
  },
});
