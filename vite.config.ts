import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only intentional demo assets enter the public artifact. Original quiz data is archived in public/.
  publicDir: "public-demo",
});
