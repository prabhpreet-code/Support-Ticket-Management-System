import * as z from "zod";
export const ticketValidation = z.object({
  topic: z
    .string()
    .max(30, {
      message: "Topic should not exceed 50 characters.",
    })
    .nonempty({
      message: "Topic cannot be empty.",
    }),
  description: z
    .string()
    .max(50, {
      message: "Description should not exceed 50 characters.",
    })
    .nonempty({
      message: "Description cannot be empty.",
    }),
  type: z.string().nonempty({
    message: "Topic cannot be empty.",
  }),
  severity: z.string().nonempty({
    message: "Topic cannot be empty.",
  }),
});
