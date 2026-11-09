import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin } from "vite";
import stylexOptions from "../stylex-options.cjs";

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
      return {
        code: result.code,
        map: result.map && JSON.stringify(result.map),
      };
    },
  };
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [stylexBabel()],
      resolve: {
        alias: {
          "@repo/ui/globals.css": resolve(
            import.meta.dirname,
            "../../../packages/ui/src/globals.css",
          ),
        },
      },
    });
  },
};

export default config;
