import { aranet_client, aranet_invoice, aranet_payment_condition, aranet_payment_method, aranet_payment_status, aranet_project } from "@/generated/prisma";

export interface aranet_invoice_join_client extends aranet_invoice {
   aranet_client: aranet_client | null;
}

export interface aranet_invoice_join_client_and_payment extends aranet_invoice_join_client {
   aranet_payment_status: aranet_payment_status | null;
   aranet_payment_condition: aranet_payment_condition | null;
   aranet_payment_method: aranet_payment_method | null;
}

export interface aranet_invoice_join_client_and_payment_and_project extends aranet_invoice_join_client_and_payment {
   aranet_project: aranet_project | null;
}