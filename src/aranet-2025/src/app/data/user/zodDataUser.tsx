// src/schemas/userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),

  password: z.string().optional(),
  is_active: z.number(),
  is_super_admin: z.number(),
  created_at: z.date().optional(),
  deleted_at: z.date().optional(),
  deleted_by: z.number().optional(),

  profile: z
    .object({
      id: z.number().optional(),
      user_id: z.number().optional(),
      title: z.string().max(4, 'no puede superar los 4 caracteres').nullable(),
      public_title: z.number(),
      first_name: z.string().optional().nullable(),
      public_first_name: z.number(),
      last_name: z.string().optional().nullable(),
      public_last_name: z.number(),
      gender: z.number().nullable(),
      public_gender: z.number(),
      email: z.email("El email no es válido").nullable(),
      public_email: z.number(),
      url: z.string().nullable(),
      public_url: z.number(),
      openid_url: z.string().nullable(),
      street: z.string().nullable(),
      public_street: z.number(),
      city: z.string().nullable(),
      public_city: z.number(),
      state: z.string().nullable(),
      public_state: z.number(),
      fax: z.string().nullable(),
      public_fax: z.number(),
      notes: z.string().nullable(),
      code: z
        .number()
        .transform((v) => v.toString())
        .nullable(),
      public_code: z.number(),
      country: z.string(),
      public_country: z.number(),
      // timezone: z.number().default((ctx) => {
      //   const country = ctx.parent.country;
      //   return DateTime.now().setZone(country).offset / 60; // offset en horas
      // }),
      // public_timezone: z.number(),
      birthday: z
        .string()
        .transform((date) => date.split("T")[0])
        .nullable(),
      public_birthday: z.number(),
      company: z.string().nullable(),
      public_company: z.number(),
      cif: z.string().nullable(),
      public_cif: z.number(),
      phone1: z.string().nullable(),
      public_phone1: z.number(),
      phone2: z.string().nullable(),
      public_phone2: z.number(),
      created_at: z.date().optional(),
      created_by: z.number().optional(),
      updated_at: z.date().optional(),
      updated_by: z.number().optional(),
      deleted_at: z.date().optional(),
      deleted_by: z.number().optional(),
    })
    .nullable(),
});

const regexModerate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/;

export const userSchemaInsert = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  algorithm: z.string().optional(),
  salt: z.string().optional(),
  password: z
    .string()
    .regex(regexModerate, {
      message: `La contraseña debe tener al menos:
    • 8 caracteres
    • 1 letra mayúscula
    • 1 letra minúscula
    • 1 número
    `,
    })
    .optional(),
  is_active: z.number(),
  is_super_admin: z.number(),
  created_at: z.date().optional(),
  deleted_at: z.date().optional(),
  deleted_by: z.number().optional(),

  profile: z
    .object({
      id: z.number().optional(),
      user_id: z.number().optional(),
      title: z.string().max(4, 'no puede superar los 4 caracteres').nullable(),
      public_title: z.number(),
      first_name: z.string().nullable(),
      public_first_name: z.number(),
      last_name: z.string().nullable(),
      public_last_name: z.number(),
      gender: z.number().nullable(),
      public_gender: z.number(),
      email: z.email("El email no es válido"),
      public_email: z.number(),
      url: z.string().nullable(),
      public_url: z.number(),
      openid_url: z.string().nullable(),
      street: z.string().nullable(),
      public_street: z.number(),
      city: z.string().nullable(),
      public_city: z.number(),
      state: z.string().nullable(),
      public_state: z.number(),
      fax: z.string().nullable(),
      public_fax: z.number(),
      notes: z.string().nullable(),
      code: z.union([z.string(), z.number(), z.null()]).transform((v) => {
        if (v === null || v === "") return null;
        return typeof v === "string" ? parseInt(v) : v;
      }),

      public_code: z.number(),
      country: z
        .string()
        .max(2, "El país debe constar de solamente dos letras")
        .nullable(),
      public_country: z.number(),
      // timezone: z.number().default((ctx) => {
      //   const country = ctx.parent.country;
      //   return DateTime.now().setZone(country).offset / 60; // offset en horas
      // }),
      //public_timezone: z.number(),
      birthday: z
        .union([z.string(), z.date()])
        .transform((v) => {
          if (!v) return null;
          const date = typeof v === "string" ? new Date(v) : v;
          return isNaN(date.getTime()) ? null : date;
        })
        .nullable(),

      public_birthday: z.number(),

      company: z.string().nullable(),
      public_company: z.number(),

      cif: z.string().nullable(),
      public_cif: z.number(),

      phone1: z.string().nullable(),
      public_phone1: z.number(),

      phone2: z.string().nullable(),
      public_phone2: z.number(),
      created_at: z.date().optional(),
      created_by: z.number().optional(),
      updated_at: z.date().optional(),
      updated_by: z.number().optional(),
      deleted_at: z.date().optional(),
      deleted_by: z.number().optional(),
    })
    .optional(),
});

export type UserFormDataDTO = z.infer<typeof userSchema>;
export type UserInsertFormDataDTO = z.infer<typeof userSchemaInsert>;
