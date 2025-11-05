// src/schemas/userSchema.ts
import { User } from "@/interfaces";
import { z } from "zod";

export const userSchema = z.object({
    
    id: z.number(),
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    is_active: z.number(),
    is_super_admin: z.number(),

    profile: z.object({
        first_name: z.string(),
        email: z.email("El email no es válido"),
        last_name:z.string(),
        birthday: z.string().transform((v) => new Date(v)),
        public_birthday: z.number().optional(),
    }),
});

export type UserFormData = z.infer<typeof userSchema>;
