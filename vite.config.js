import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api/,
            "/macros/s/AKfycbyT5Ei52UVf0X_KgLAflKRir5qyfz1MkoY36pRCu1ay4hLa-sid7eThCGjE9Z6N3V19Rg/exec"
          ),
      },
    },
  },
});
