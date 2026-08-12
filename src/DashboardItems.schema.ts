import { z } from "zod";

const TodoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  //   completed: z.boolean(),
});

const TodosSchema = z.array(TodoSchema);
export { TodoSchema, TodosSchema };
