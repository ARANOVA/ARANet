import { z } from "zod";
import { AranetClientBase } from './client.dto';

export const AranetInvoiceBase = z.object({
  id: z.number().int().optional(), // en patch puede venir o no

  invoice_prefix: z.string().max(8).nullable().optional(),
  invoice_number: z.string().max(11).min(2),
  invoice_date: z.date(),

  invoice_client_id: z.number().int().nullable().optional(),
  invoice_project_id: z.number().int().nullable().optional(),
  invoice_budget_id: z.number().int().nullable().optional(),
  invoice_category_id: z.number().int().nullable().optional(),
  invoice_kind_of_invoice_id: z.number().int().default(1).optional(),

  invoice_title: z.string().max(255).nullable().optional(),
  invoice_comments: z.string().nullable().optional(),
  invoice_print_comments: z.number().int().default(0).optional(),
  invoice_tax_rate: z.number().default(0).optional(),
  invoice_freight_charge: z.number().default(0).optional(),

  invoice_payment_condition_id: z.number().int().nullable().optional(),
  invoice_payment_method_id: z.number().int().nullable().optional(),
  invoice_payment_check: z.string().max(64).nullable().optional(),
  invoice_payment_date: z.date().nullable().optional(),
  invoice_payment_status_id: z.number().int().nullable().optional(),

  invoice_late_fee_percent: z.number().default(0).optional(),
  invoice_total_amount: z.number().default(0).optional(),

  created_at: z.date().nullable().optional(),
  created_by: z.number().int().nullable().optional(),
  updated_at: z.date().nullable().optional(),
  updated_by: z.number().int().nullable().optional(),
  deleted_at: z.date().nullable().optional(),
  deleted_by: z.number().int().nullable().optional(),

  invoice_periodic: z.number().int().default(0).optional(),
  invoice_periodic_current: z.number().int().default(0).optional(),
  invoice_service_from: z.date().nullable().optional(),
  invoice_service_to: z.date().nullable().optional(),
});

// ✅ DTOs específicos
export type AranetInvoiceDtoType = z.infer<typeof AranetInvoiceBase>;

// ✅ DTO para actualización completa (PUT)
// - igual que base pero sin campos inmutables
export const CreateAranetInvoiceDto = AranetInvoiceBase.omit({
  id: true,
  created_at: true,
  created_by: true,
  deleted_at: true,
  deleted_by: true,
});

export type CreateAranetInvoiceDtoType = z.infer<typeof CreateAranetInvoiceDto>;

export const UpdateAranetInvoiceDto = AranetInvoiceBase.omit({
  // invoice_number: true, // 👈 no se puede modificar
}).partial();
export type UpdateAranetInvoiceDtoType = z.infer<typeof UpdateAranetInvoiceDto>;

export const AranetInvoiceJoinClient = AranetInvoiceBase.extend({
  aranet_client: AranetClientBase,
});