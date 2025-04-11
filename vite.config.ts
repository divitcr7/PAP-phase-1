import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(() => {

  // const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        images: path.resolve(__dirname, "public/images"),
      },
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: env.VITE_API_BASE_URL || "http://localhost:5000",
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
  };
});
