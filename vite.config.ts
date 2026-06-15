import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const backendPort = env.EXPREES_PORT

    return {
        plugins: [
            tailwindcss(),
            react({
                babel: {
                    plugins: [["babel-plugin-react-compiler"]],
                },
            }),
        ],
            server: {
            host: true,
                proxy: {
                '/api': {
                    target: `http://localhost:${backendPort}`,
                    changeOrigin: true,
                    secure: false
                }
            },
            allowedHosts: ["ac56-72-223-0-116.ngrok-free.app"],
        },
    }
});
