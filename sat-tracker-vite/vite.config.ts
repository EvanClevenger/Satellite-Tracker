import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      "/frontend": {
        target: "http://localhost:5173",
        changeOrigin: true,
      },
      "/graphql": {
        target: "http://localhost:5173",
        changeOrigin: true,
      },
    },
  },
});
