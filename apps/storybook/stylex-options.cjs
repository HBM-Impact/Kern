const path = require("node:path");

// Must match apps/web/babel.config.js — StyleX hashes variable names against
// rootDir, so a different root here would emit class names that do not line up
// with the ones packages/ui was compiled with.
const rootDir = path.join(__dirname, "..", "..");

module.exports = {
  dev: process.env.NODE_ENV !== "production",
  runtimeInjection: false,
  enableInlinedConditionalMerge: true,
  treeshakeCompensation: true,
  propertyValidationMode: "throw",
  unstable_moduleResolution: { type: "commonJS", rootDir },
};
