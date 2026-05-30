import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import cesium from "vite-plugin-cesium";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    cesium(),
  ],
  server: {
    proxy: {
      "/frontend": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
      "/graphql": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
    },
  },
});
