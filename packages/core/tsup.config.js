import { defineConfig } from "tsup";

// https://modyqyw.top/blogs/2022/12/why-tsup.html
export default defineConfig({
  entry: ["./node/index.ts"],
  dts: true,
  splitting: false,
  shims: true,
  outDir: "build/node",
  format: ["cjs", "esm"],
  banner: ({ format }) => {
    if (format === "esm") {
      return {
        js: `import {createRequire as __createRequire} from 'module';var require=__createRequire(import.meta.url);`,
      };
    }
  },
  // eslint-disable-next-line no-undef
  sourcemap: process.env.NODE_ENV === "development",
  watch:
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === "development" && [
      "./node",
      "./client",
      "../shared/build",
      "../plugin-docit/build",
    ],
});