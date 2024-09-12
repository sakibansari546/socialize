import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    //   proxy: {
    //     "/api": {
    //       target: "XXXXXXXXXXXXXXXXXXXXX",
    //       changeOrigin: true,
    //     },
    //   },
    // },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "XXXXXXXXXXXXXXXXXXXXX",
    //       changeOrigin: true,
    //     },
    //   },
  },
})