import { z } from "zod";

export const AranetClientBase = z.object({
  id: z.number().int(),
  client_unique_name: z.string().max(128),
  client_company_name: z.string().max(255),
  client_cif: z.string().max(20).nullable(),
  client_kind_of_company_id: z.number().int().nullable(),
  client_since: z.date().nullable(),
  client_website: z.string().max(255).nullable(),
  client_comments: z.string().nullable(),
  client_has_tags: z.number().int().default(0).nullable(),
  created_at: z.date().nullable(),
  created_by: z.number().int().nullable(),
  updated_at: z.date().nullable(),
  updated_by: z.number().int().nullable(),
  deleted_at: z.date().nullable(),
  deleted_by: z.number().int().nullable(),
});

// ✅ DTOs específicos
export type AranetClientDtoType = z.infer<typeof AranetClientBase>;

// ✅ DTO para creación (POST)
// - excluimos campos autogenerados (`id`, fechas, deleted_*, updated_*)
// - mantenemos requeridos los necesarios
export const CreateAranetClientDto = AranetClientBase.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  deleted_by: true,
}).extend({
  created_by: z.number().int(), // requerido en create
});

// ✅ DTO para actualización completa (PUT)
// - igual que base pero sin campos inmutables
export const PutAranetClientDto = AranetClientBase.omit({
  id: true,
  created_at: true,
  created_by: true,
  deleted_at: true,
  deleted_by: true,
});

// ✅ DTO para actualización parcial (PATCH)
// - como PUT, pero todo opcional
export const PatchAranetClientDto = PutAranetClientDto.partial();
