import path from "node:path";
import { colors, coreLogger, getDirname } from "@blizzbolts/docit-shared/node";
import fsx from "fs-extra";
import { build as viteBuild } from "vite";
import { createDocitPlugin } from "@blizzbolts/vite-plugin-docit";

const buildForSSR = async (root: string) => {
  const r = (p: string = "") => path.resolve(getDirname(import.meta.url), "../", p);
  const ENTRY_CLIENT = r("./client/entry-client.js");
  const ENTRY_SERVER = r("./client/entry-server.js");

  const template = await fsx.readFile(r("./client/index.html"), { encoding: "utf-8" });
  const html = template.replace(`<!--entry-point-->`, `/@fs${ENTRY_CLIENT}`);

  await fsx.writeFile(r("./client/index.html"), html);

  coreLogger.log("");
  coreLogger.info(colors.cyan("Building Docit SSR assets..."));
  await viteBuild({
    root: r("./client"),
    plugins: [createDocitPlugin()],
    build: {
      emptyOutDir: true,
      outDir: path.resolve(process.cwd(), "./.docit", "./build/client"),
    },
  });

  await viteBuild({
    root: r("./client"),
    plugins: [createDocitPlugin()],
    build: {
      emptyOutDir: true,
      ssr: ENTRY_SERVER,
      outDir: path.resolve(process.cwd(), "./.docit", "./build/node"),
    },
  });
};

const generateStatics = async () => {
  const r = (p: string) => path.resolve(process.cwd(), "./.docit/build", p);

  const template = await fsx.readFile(r("./client/index.html"), "utf-8");
  const { render } = await import(r("./node/entry-server.js"));

  console.log(render);
};

export const build = async (root: string) => {
  await buildForSSR(root);

  await generateStatics();

  // const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
  // const { render } = await import("./dist/server/entry-server.js");

  // const docs = await glob("./**/*.(mdx|md)", {
  //   cwd: path.resolve(process.cwd(), root),
  // });
  // const routesToPrerender = docs.map((path) => {
  //   const name = path.match(/\/(.*)\.mdx?$/)![1];
  //   return `/${name}`;
  // });
  // for (const url of routesToPrerender) {
  //   const context = {};
  //   const appHtml = await render(url, context);
  //   const html = template.replace(`<!--app-html-->`, appHtml);
  //   const filePath = `./.docit/static${url === "/" ? "/index" : url}.html`;
  //   await fsx.outputFile(path.resolve(process.cwd(), filePath), html);
  // }
};
