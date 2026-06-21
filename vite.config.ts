import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const backendPort = env.EXPRESS_PORT

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
            allowedHosts: ["f82c-2600-8800-11c3-ab00-00-6489.ngrok-free.app"],
        },
    }
});
