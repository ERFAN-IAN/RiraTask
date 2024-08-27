import { z } from "zod";
import type { ObjectId } from "bson";
export const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(1, "Title is required"),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(1, "Description is required"),
  deadline: z.date({
    required_error: "Deadline is required.",
  }),
});
export const formSchemaServer = z.object({
  id: z.string().optional(),
  title: z.string({
    required_error: "Title is required.",
  }),
  description: z.string({
    required_error: "Description is required.",
  }),
  deadline: z.string({
    required_error: "Deadline is required.",
  }),
});

export const dataSchema = z.object({
  _id: z.custom<ObjectId>(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  deadline: z.date(),
});

export const orderSchema = z
  .object({
    order: z.custom<ObjectId>().array(),
  })
  .array();
export type DataType = z.infer<typeof dataSchema>;
export type OrderType = z.infer<typeof orderSchema>;
