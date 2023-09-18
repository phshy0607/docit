import { Command } from "commander";
import pkg from "../package.json";
import { start } from "@/start";
import { build } from "@/build";
import { init } from "@/init";

const program = new Command();
program.name("docit-cli").description("CLI for docit").version(pkg.version, "-v, --version");

const configOption = program
  .createOption("-c, --config <config>", "specify config file location")
  .default("./docs/.docit/docit.config.js");

program
  .command("start [source]")
  .description("start docit dev server")
  .addOption(configOption)
  .action(start);

program
  .command("build [source]")
  .description("build docit for production")
  .addOption(configOption)
  .action(build);

program.command("init [destination]").description("setup docit").action(init);

program.parse(process.argv);
