const { z } = require("zod");

export const createTodoSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
  progress: z.number().min(0).max(100).optional(),
});
