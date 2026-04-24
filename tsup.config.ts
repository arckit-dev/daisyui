import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'tsup';

const clientEntries = ['client', 'primitives-client', 'blocks-client', 'headless', 'theme'];

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client/index.ts',
    primitives: 'src/primitives/index.ts',
    'primitives-client': 'src/primitives-client/index.ts',
    blocks: 'src/blocks/index.ts',
    'blocks-client': 'src/blocks-client/index.ts',
    headless: 'src/headless/index.ts',
    icons: 'src/icons/index.ts',
    theme: 'src/theme/index.ts',
    utils: 'src/utils/index.ts'
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2022',
  async onSuccess() {
    for (const entry of clientEntries) {
      for (const ext of ['.js', '.cjs']) {
        const filePath = join('dist', `${entry}${ext}`);
        try {
          const content = readFileSync(filePath, 'utf-8');
          if (!content.startsWith('"use client"')) {
            writeFileSync(filePath, `"use client";\n${content}`);
          }
        } catch {}
      }
    }
  }
});
