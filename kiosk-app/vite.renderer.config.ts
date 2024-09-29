import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";

  return {
    root: path.resolve(__dirname, "src/renderer"),
    mode,
    base: "./",
    build: {
      // outDir: `.vite/renderer/${name}`,
      // outDir: path.join(__dirname, ".vite", "renderer"),
      // outDir: path.resolve(__dirname, "dist/renderer"),
      outDir: path.resolve(__dirname, ".vite/renderer"),
      emptyOutDir: true,
      assetsDir: ".",
    },

    plugins: [react(), pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      // alias: {
      //   "@": path.resolve(__dirname, "src/renderer"),
      // },
    },
    clearScreen: false,
    css: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    assetsInclude: [
      "**/*.png",
      "**/*.jpg",
      "**/*.jpeg",
      "**/*.gif",
      "**/*.svg",
    ],
  } as UserConfig;
});
