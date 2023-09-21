import type { z } from "zod";
import { zDocitConfig } from "./docit-config";
import { zSiteConfig } from "./site-config";

const zScaffoldOptions = zSiteConfig
  .pick({ title: true, description: true })
  .merge(zDocitConfig.pick({ root: true }))
  .partial()
  .strict();

export { zScaffoldOptions };
export type ScaffoldOptions = z.infer<typeof zScaffoldOptions>;
export const defineScaffoldOptions = (config: ScaffoldOptions): ScaffoldOptions => {
  return zScaffoldOptions.parse(config);
};