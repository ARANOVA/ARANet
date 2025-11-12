// src/schemas/userSchema.ts
import { z } from "zod";

export const clientSchema = z.object({
  client_unique_name: z.string(),
  client_company_name: z.string(),
  client_cif: z.string(),
  client_kind_of_company_id:z.number().transform((v) => Number(v)),
  client_since:z.union([z.string(), z.date()])
  .transform((date) => typeof date === 'string' ? date.split("T")[0] : date)
  .nullable(),
  client_website: z.string().optional(),
  client_comments: z.string().optional(),
  client_has_tags: z.number(),
  created_at: z
  .string()
  .nullable()
  .transform((v) => (v ? new Date(v) : null)),
created_by: z.number().optional().nullable(),
updated_at: z
  .string()
  .nullable()
  .transform((v) => (v ? new Date(v) : null)),
updated_by: z.number().optional().nullable(),
deleted_at: z.date().optional().nullable(),
deleted_by: z.number().optional().nullable(),
});

export const clientSchemaInsert = z.object({
  client_unique_name: z.string().min(1, "El nombre del cliente es obligatorio"),
  client_company_name: z.string().min(1, "El nombre de la empresa es obligatorio"),
  client_cif: z.string(),
  client_kind_of_company_id:  z.union([z.string(), z.number()]).transform((v) => Number(v)),
  client_since: z
  .union([z.string(), z.date()])
  .transform((v) => {
    if (!v) return null;
    const date = typeof v === "string" ? new Date(v) : v;
    return isNaN(date.getTime()) ? null : date;
  })
  .nullable(),
  client_website: z.string().optional(),
  client_comments: z.string().optional(),
  client_has_tags: z.union([z.string(), z.number()]).transform((v) => Number(v)),
  created_at: z.date().optional().nullable(),
  created_by: z.number().optional().nullable(),
  updated_at: z.date().optional().nullable(),
  updated_by: z.number().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  deleted_by: z.number().optional().nullable(),
});

export type ClientFormDataDTO = z.infer<typeof clientSchema>;
export type ClientInsertFormDataDTO = z.infer<typeof clientSchemaInsert>;
