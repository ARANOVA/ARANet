// src/schemas/userSchema.ts
import { z } from "zod";

export const vendorSchema = z.object({
  id: z.number(),
  vendor_unique_name: z.string(),
  vendor_company_name: z.string(),
  vendor_cif: z.string(),
  vendor_kind_of_company_id: z.number(),
  vendor_since: z
  .string()
  .transform((date) => date.split("T")[0])
  .nullable(),
  vendor_website: z.string(),
  vendor_comments: z.string(),
  vendor_has_tags: z.number(),
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
  vendor_company_type: z.number(),
});

export const vendorSchemaInsert = z.object({
  id: z.number(),
  vendor_unique_name: z.string(),
  vendor_company_name: z.string(),
  vendor_cif: z.string(),
  vendor_kind_of_company_id: z.number(), //relation
  vendor_since: z
    .union([z.string(), z.date()])
    .transform((v) => {
      if (!v) return null;
      const date = typeof v === "string" ? new Date(v) : v;
      return isNaN(date.getTime()) ? null : date;
    })
    .nullable(),
  vendor_website: z.string(),
  vendor_comments: z.string(),
  vendor_has_tags: z.number(),
  created_at: z.date().optional().nullable(),
  created_by: z.number().optional().nullable(),
  updated_at: z.date().optional().nullable(),
  updated_by: z.number().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  deleted_by: z.number().optional().nullable(),
  vendor_company_type: z.number(),
});

export type VendorFormDataDTO = z.infer<typeof vendorSchema>;
export type VendorInsertFormDataDTO = z.infer<typeof vendorSchemaInsert>;
