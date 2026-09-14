import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const backendPort = env.EXPRESS_PORT;

    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        plugins: [tailwindcss(), react()],
        server: {
            host: true,
            proxy: {
                "/api": {
                    target: `http://localhost:${backendPort}`,
                    changeOrigin: true,
                    secure: false,
                },
            },
            allowedHosts: ["38c1-2600-8800-11c3-ab00-00-7941.ngrok-free.app"],
        },
    };
});
