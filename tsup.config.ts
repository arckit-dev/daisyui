import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'tsup';

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
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  outDir: 'dist',
  target: 'es2022',
  async onSuccess() {
    const files = readdirSync('dist').filter((f) => f.endsWith('.js') || f.endsWith('.cjs'));
    for (const file of files) {
      const filePath = join('dist', file);
      const content = readFileSync(filePath, 'utf-8');
      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        writeFileSync(filePath, `"use client";\n${content}`);
      }
    }
  }
});
