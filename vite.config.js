import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/routes/*" },
      { find: "@commons", replacement: "/src/shared/commons" },
      { find: "@font", replacement: "/src/shared/assets/font" },
      { find: "@icon", replacement: "/src/shared/assets/icon" },
      { find: "@image", replacement: "/src/shared/assets/image" },
    ],
  },
});