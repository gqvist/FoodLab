import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"
import fs from "node:fs"
import process from "node:process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    strictPort: true,

    ...(command === "serve" && {
      https: {
        cert: fs.readFileSync(
          path.join(process.env.APPDATA, "ASP.NET", "https", "foodlab.pem")
        ),
        key: fs.readFileSync(
          path.join(process.env.APPDATA, "ASP.NET", "https", "foodlab.key")
        ),
      },
    }),
  },
}))