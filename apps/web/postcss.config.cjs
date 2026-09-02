const babelConfig = require("./babel.config");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      // Every dir that can hold a stylex.create call, including the workspace
      // UI package — it ships source, so its styles compile here.
      include: [
        "app/**/*.{ts,tsx}",
        "features/**/*.{ts,tsx}",
        "primitives/**/*.{ts,tsx}",
        "shell/**/*.{ts,tsx}",
        "../../packages/ui/src/**/*.{ts,tsx}",
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: babelConfig.plugins,
      },
      useCSSLayers: true,
    },
  },
};
