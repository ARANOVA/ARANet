import { aranet_client, aranet_invoice } from "@/generated/prisma";

export interface aranet_invoice_join_client extends aranet_invoice {
   aranet_client: aranet_client | null;
}