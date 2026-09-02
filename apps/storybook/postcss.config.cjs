const stylexOptions = require("./stylex-options.cjs");

module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      // Storybook renders @repo/ui straight from source, so that is the only
      // place StyleX calls live.
      include: ["../../packages/ui/src/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [["@stylexjs/babel-plugin", stylexOptions]],
      },
      useCSSLayers: true,
    },
  },
};
