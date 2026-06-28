import z from "zod";


export const registerSchema = z.object({
  username: z.string().min(3),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  profile: z.string().optional(),

  address: z.object({
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    road: z.string(),
    linkAddress: z.string().optional(),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

  export type RegisterFormType = z.infer<typeof registerSchema>;