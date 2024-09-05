import z, { string } from "zod";

const createAdminSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    profilePhoto: z.string().optional(),
    coverPhoto: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const adminValidationSchema = {
  createAdminSchema,
};
