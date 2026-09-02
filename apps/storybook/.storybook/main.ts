import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import type { Plugin } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const stylexOptions = require("../stylex-options.cjs");

/**
 * Compiles stylex.create calls to class names. apps/web gets this from Next's
 * Babel loader; Vite has no equivalent, so run @babel/core directly over the
 * UI source and the stories.
 */
function stylexBabel(): Plugin {
  return {
    name: "stylex-babel",
    enforce: "pre",
    async transform(code, id) {
      if (!/\.tsx?$/.test(id) || id.includes("node_modules")) return null;
      if (!code.includes("@stylexjs/stylex")) return null;

      const babel = await import("@babel/core");
      const result = await babel.transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [["@stylexjs/babel-plugin", stylexOptions]],
        sourceMaps: true,
      });
      if (!result?.code) return null;
      return { code: result.code, map: result.map };
    },
  };
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [stylexBabel()],
      resolve: {
        alias: {
          "@repo/ui/globals.css": resolve(
            __dirname,
            "../../../packages/ui/src/globals.css",
          ),
        },
      },
    });
  },
};

export default config;
