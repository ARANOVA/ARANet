// src/schemas/userSchema.ts
import { User } from "@/interfaces";
import { DateTime } from "luxon";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  is_active: z.number(),
  is_super_admin: z.number(),

  profile: z.object({
    id: z.number().optional(),
    user_id: z.number().optional(),
    first_name: z.string().optional().nullable(),
    public_first_name: z.number(),
    last_name: z.string().optional().nullable(),
    public_last_name: z.number(),
    gender: z.number().nullable(),
    public_gender: z.number(),
    email: z.email("El email no es válido").nullable(),
    public_email: z.number(),
    // url: z.string(),
    // public_url: z.number(),
    // openid_url: z.string(),
    street: z.string().nullable(),
    public_street: z.number(),
    city: z.string().nullable(),
    public_city: z.number(),
    state: z.string().nullable(),
    public_state: z.number(),

    //CODE ???
    // code: z.number(),
    // public_code: z.number(),
    country: z.string(),
    public_country: z.number(),
    // timezone: z.number().default((ctx) => {
    //   const country = ctx.parent.country;
    //   return DateTime.now().setZone(country).offset / 60; // offset en horas
    // }),
    // public_timezone: z.number(),
    birthday: z.string().transform((date) => date.split("T")[0]).nullable(),
    public_birthday: z.number(),
    company: z.string().nullable(),
    public_company: z.number(),
    cif: z.string().nullable(),
    public_cif: z.number(),
    phone1: z.string().nullable(),
    public_phone1: z.number(),
    phone2: z.string().nullable(),
    public_phone2: z.number(),
  }),
});

export const userSchemaInsert = z.object({
  id: z.number().optional(),
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  is_active: z.number(),
  is_super_admin: z.number(),

  profile: z.object({
    id: z.number().optional(),
    user_id: z.number().optional(),
    // title: z.string(),
    // public_title: z.number(),
    first_name: z.string().optional(),
    public_first_name: z.number(),
    last_name: z.string().optional(),
    public_last_name: z.number(),
    gender:z.number(),
    public_gender: z.number(),
    email: z.email("El email no es válido"),
    public_email: z.number(),
    // url: z.string(),
    // public_url: z.number(),
    // openid_url: z.string(),
    street: z.string(),
    public_street: z.number(),
    city: z.string(),
    public_city: z.number(),
    state: z.string(),
    public_state: z.number(),

    //CODE ???
    // code: z.number(),
    // public_code: z.number(),
    country: z.string().max(2, "El país debe constar de solamente dos letras"),
    public_country: z.number(),
    // timezone: z.number().default((ctx) => {
    //   const country = ctx.parent.country;
    //   return DateTime.now().setZone(country).offset / 60; // offset en horas
    // }),
    // public_timezone: z.number(),
    birthday: z
    .union([z.string(), z.date()])
    .transform((v) => (typeof v === "string" ? new Date(v) : v)),  
    public_birthday: z.number(),

    company: z.string(),
    public_company: z.number(),

    cif: z.string(),
    public_cif: z.number(),

    phone1: z.string(),
    public_phone1: z.number(),

    phone2: z.string(),
    public_phone2: z.number(),
  }),
});

export type UserFormDataDTO = z.infer<typeof userSchema>;
export type UserInsertFormDataDTO = z.infer<typeof userSchemaInsert>;
