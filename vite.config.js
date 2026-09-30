import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    base: "/portfolio/",

    server: {
      port: 5173,
      proxy: {
        "/api": `http://localhost:${env.PORT || 5000}`,
      },
    },

    build: {
      target: "es2020",
      sourcemap: false,
    },
  };
});
