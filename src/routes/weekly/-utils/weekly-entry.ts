import { z } from "zod";

export const weeklyEntrySchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    phone: z.string().min(1, "Phone number is required"),
    requiresReceipt: z.boolean(),
    email: z.string(),
    surname: z.string(),
    parentName: z.string(),
    feePaid: z.number().min(0, "Fee is required"),
    numberOfSessions: z.number().int().min(1, "Number of sessions must be at least 1"),
    modalityUsed: z.string().min(1, "Modality is required"),
    rationale: z.string().min(1, "Rationale is required"),
    noShow: z.boolean(),
    cancelled: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (value.requiresReceipt) {
      const email = value.email.trim();
      if (email.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required for receipts",
          path: ["email"],
        });
      } else if (!z.string().email().safeParse(email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email must be valid",
          path: ["email"],
        });
      }

      const surname = value.surname.trim();
      if (surname.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Surname is required for receipts",
          path: ["surname"],
        });
      }

      if (value.feePaid <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fee paid is required for receipts",
          path: ["feePaid"],
        });
      }
    }
  });

export type WeeklyEntry = z.infer<typeof weeklyEntrySchema>;

export const weeklyEntry: WeeklyEntry = {
  firstName: "",
  phone: "",
  requiresReceipt: false,
  email: "",
  surname: "",
  parentName: "",
  feePaid: 0,
  numberOfSessions: 1,
  modalityUsed: "",
  rationale: "",
  noShow: false,
  cancelled: false,
};
