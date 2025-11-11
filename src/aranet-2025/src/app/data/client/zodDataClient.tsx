// src/schemas/userSchema.ts
import { z } from "zod";

export const clientSchema = z.object({
  id: z.number(),
  client_unique_name: z.string(),
  client_company_name: z.string(),
  client_cif: z.string().length(9),
  client_kind_of_company_id: z.number().int(),
  client_since: z.date().optional(),
  client_website: z.string().url().optional(),
  client_comments: z.string().optional(),
  client_has_tags: z.number().int().optional(),
  created_at: z.date().optional(),
  created_by: z.number().int(),
  updated_at: z.date().optional(),
  updated_by: z.number().int(),
  deleted_at: z.date().nullable().optional(),
  deleted_by: z.number().int().nullable().optional(),
});

export const clientSchemaInsert = z.object({

  id: z.number(),
  client_unique_name: z.string(),
  client_company_name: z.string(),
  client_cif: z.string().length(9),
  client_kind_of_company_id: z.number().int(),
  client_since: z.date().optional(),
  client_website: z.string().url().optional(),
  client_comments: z.string().optional(),
  client_has_tags: z.number().int().optional(),
  created_at: z.date().optional(),
  created_by: z.number().int(),
  updated_at: z.date().optional(),
  updated_by: z.number().int(),
  deleted_at: z.date().nullable().optional(),
  deleted_by: z.number().int().nullable().optional(),
});

export type ClientFormDataDTO = z.infer<typeof clientSchema>;
export type ClientInsertFormDataDTO = z.infer<typeof clientSchemaInsert>;
