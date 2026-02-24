import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    visualizer({
      open: true, // abre o relatório automaticamente no navegador após o build
      gzipSize: true, // mostra tamanho comprimido (mais realista)
      brotliSize: true, // mostra tamanho brotli (ainda mais realista)
      filename: "bundle-stats.html", // nome do arquivo gerado
    }),
  ],
});
