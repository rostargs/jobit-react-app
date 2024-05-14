import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            assets: "/src/assets",
            components: "/src/components",
            data: "/src/data",
            design: "/src/design",
            hooks: "/src/hooks",
            pages: "/src/pages",
            utils: "/src/utils",
            layouts: "/src/layouts",
            models: "/src/models",
            app: "/src/app",
        },
    },
});
