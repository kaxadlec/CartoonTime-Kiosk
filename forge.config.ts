import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { VitePlugin } from "@electron-forge/plugin-vite";
import * as dotenv from "dotenv";
// .env 파일 로드
dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    asar: false,
    icon: "src/renderer/assets/CartoonTimeIcon", // no file extension required
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: "src/renderer/assets/CartoonTimeIcon.ico",
      iconUrl:
        "https://github.com/kaxadlec/CartoonTimes-KioskApp/releases/download/v0.0.0/CartoonTimeIcon.ico",
    }),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main/main.ts",
          config: "vite.main.config.ts",
        },
        {
          entry: "src/main/preload.ts",
          config: "vite.preload.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),

    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    // new FusesPlugin({
    //   version: FuseVersion.V1,
    //   [FuseV1Options.RunAsNode]: false,
    //   [FuseV1Options.EnableCookieEncryption]: true,
    //   [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    //   [FuseV1Options.EnableNodeCliInspectArguments]: false,
    //   [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    //   [FuseV1Options.OnlyLoadAppFromAsar]: true,
    // }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "kaxadlec",
          name: "CartoonTimes-KioskApp",
        },
        authToken: process.env.GITHUB_TOKEN,
        draft: true,
        prerelease: true,
        iconUrl:
          "https://github.com/kaxadlec/CartoonTimes-KioskApp/releases/download/v0.0.0/CartoonTimeIcon.ico",
      },
    },
  ],
};

export default config;
