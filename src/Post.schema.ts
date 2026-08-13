import { z } from "zod";

const PostSchema = z.object({
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export { PostSchema };
