import { PassThrough } from "stream";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm"],
      });
    }
  });

export default schema;
