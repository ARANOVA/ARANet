import { aranet_budget, aranet_client, aranet_contact, aranet_invoice, aranet_invoice_item, aranet_kind_of_company, aranet_kind_of_invoice, aranet_objectcontact, aranet_payment_condition, aranet_payment_method, aranet_payment_status, aranet_project, aranet_vendor, sf_guard_user, sf_guard_user_profile } from "@/generated/prisma";

export interface aranet_invoice_join_client extends aranet_invoice {
   client: aranet_client | null;
}

export interface aranet_invoice_join_client_and_payment extends aranet_invoice_join_client {
   payment_status: aranet_payment_status | null;
   payment_condition: aranet_payment_condition | null;
   payment_method: aranet_payment_method | null;
}

export interface aranet_invoice_join_client_and_payment_and_project extends aranet_invoice_join_client_and_payment {
   project: aranet_project | null;
}

export interface aranet_invoice_join_client_and_payment_and_project_and_budget extends aranet_invoice_join_client_and_payment_and_project {
   budget: aranet_budget | null;
}

export interface aranet_invoice_join_all extends aranet_invoice_join_client_and_payment_and_project_and_budget {
   kind_of_invoice: aranet_kind_of_invoice | null;
   invoice_item?: aranet_invoice_item[] | null;
}

export interface aranet_invoice_verifactu extends aranet_invoice_join_all {
   huellaPrev: string | null;
}

/**** sf_guard_user ****/
export interface sf_guard_user_join_profile extends sf_guard_user {
   profile?: sf_guard_user_profile | null;
}

/**** aranet_client ****/
export interface aranet_objectcontact_join_contact extends aranet_objectcontact {
   aranet_contact: aranet_contact;
}

export interface aranet_client_join_contacts extends aranet_client {
   objectcontacts?: aranet_objectcontact_join_contact[];
}

/**** aranet_vendor ****/
export interface aranet_vendor_join_contacts extends aranet_vendor {
   objectcontacts?: aranet_objectcontact_join_contact[];
}