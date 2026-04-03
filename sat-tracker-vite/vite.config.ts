import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
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
