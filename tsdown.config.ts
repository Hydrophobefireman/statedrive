import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "react-index": "src/react-index.ts",
  },
  format: "esm",
  dts: true,
  clean: true,
  treeshake: true,
  target: "esnext",
  external: ["@hydrophobefireman/ui-lib", "react"],
});
