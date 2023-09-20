import type { ProxyOptions } from "vite";
import { z } from "zod";

const zDocitServerConfig = z.object({
  port: z.number().default(3000),
  host: z.string().optional(),
  https: z.boolean().default(false),
  open: z.boolean().default(false),
  cors: z.boolean().default(false),
  proxy: z.any().optional() as z.ZodOptional<z.ZodType<Record<string, string | ProxyOptions>>>,
});

export { zDocitServerConfig };
export type DocitServerConfig = Partial<z.infer<typeof zDocitServerConfig>>;
