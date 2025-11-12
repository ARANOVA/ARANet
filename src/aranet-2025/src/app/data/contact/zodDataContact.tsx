// src/schemas/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().optional(), // puede ser undefined en el formulario nuevo
  contact_salutation: z.string().optional(),
  contact_first_name: z.string().min(1, "El nombre es obligatorio"),
  contact_last_name: z.string().min(1, "El apellido es obligatorio"),
  contact_email: z.string().email("Email inválido"),
  contact_phone: z.string().optional(),
  contact_fax: z.string().optional(),
  contact_mobile: z.string().optional(),
  contact_birthday: z
  .string()
  .transform((date) => date.split("T")[0])
  .nullable(),
  contact_org_unit: z.string().optional(),
  created_at: z
    .union([z.string(), z.date()])
    .optional()
    .nullable()
    .transform((v) => (v ? new Date(v) : null)),
  created_by: z.number().optional().nullable(),
  updated_at: z
    .union([z.string(), z.date()])
    .optional()
    .nullable()
    .transform((v) => (v ? new Date(v) : null)),
  updated_by: z.number().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  deleted_by: z.number().optional().nullable(),
});

export const contactSchemaInsert = z.object({
  contact_salutation: z.string().optional(),
  contact_first_name: z.string().min(1, "El nombre es obligatorio"),
  contact_last_name: z.string().min(1, "El apellido es obligatorio"),
  contact_email: z.string().email("Email inválido"),
  contact_phone: z.string().optional(),
  contact_fax: z.string().optional(),
  contact_mobile: z.string().optional(),
  contact_birthday:  z
  .union([z.string(), z.date()])
  .transform((v) => {
    if (!v) return null;
    const date = typeof v === "string" ? new Date(v) : v;
    return isNaN(date.getTime()) ? null : date;
  })
  .nullable(),
  contact_org_unit: z.string().optional(),
  created_at: z.date().optional().nullable(),
  created_by: z.number().optional().nullable(),
  updated_at: z.date().optional().nullable(),
  updated_by: z.number().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  deleted_by: z.number().optional().nullable(),
});

// Tipos TypeScript
export type ContactFormDataDTO = z.infer<typeof contactSchema>;
export type ContactInsertFormDataDTO = z.infer<typeof contactSchemaInsert>;
