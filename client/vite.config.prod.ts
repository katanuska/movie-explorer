import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist', // Output directory for production build
      assetsInlineLimit: 4096, // Inline assets smaller than 4KB
      sourcemap: false, // Disable source maps for smaller builds
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    server: {
      // Disable dev-specific options for production
      hmr: false,
    },
  };
});
