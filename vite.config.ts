import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
    plugins: [sveltekit()],
    clearScreen: false,
    server: {
		port: 1420,
        strictPort: true,
    },
    envPrefix: ["VITE_", "TAURI_"],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});