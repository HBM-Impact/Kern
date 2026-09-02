const path = require("node:path");

const dev = process.env.NODE_ENV !== "production";

// StyleX hashes variable names against rootDir, so it must be the monorepo
// root — otherwise tokens defined in packages/ui hash differently than the
// apps/web call sites that consume them.
const rootDir = path.join(__dirname, "..", "..");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        dev,
        runtimeInjection: false,
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
        aliases: { "@/*": [path.join(__dirname, "*")] },
        propertyValidationMode: "throw",
        unstable_moduleResolution: { type: "commonJS", rootDir },
      },
    ],
  ],
};
