import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    primitives: 'src/primitives/index.ts',
    blocks: 'src/blocks/index.ts',
    headless: 'src/headless/index.ts',
    icons: 'src/icons/index.ts',
    theme: 'src/theme/index.ts',
    utils: 'src/utils/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  hash: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist'
});
