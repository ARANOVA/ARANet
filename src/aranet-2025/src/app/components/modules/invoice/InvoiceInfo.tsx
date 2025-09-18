'use client';

import { aranet_invoice_join_client } from "@/interfaces"
import { AranetInvoiceJoinClient } from "@/interfaces/dto"
import Link from "next/link"
import { useState } from "react";

interface Props {
  invoice: aranet_invoice_join_client;
  addresses?: any[];
}
export const InvoiceInfo = ({ invoice, addresses }: Props) => {

  const tabsVisibles: string[] = [
    'tab1',
    'tab2',
  ];
  const [tabActiva, setTabActiva] = useState<string>(tabsVisibles[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      <div>
        <div className="flex flex-col gap-2">
          <h2 className='text-lg font-bold'>
            <Link
              title={invoice.aranet_client?.client_company_name}
              href={`/client/show/${invoice.invoice_client_id}`}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500"
            >{invoice.aranet_client?.client_company_name}</Link>
          </h2>
          {addresses && addresses?.length > 0 && (<p className="text-semibold">{addresses[0].objectaddress_name}</p>)}
        </div>
      </div>
      <div className="border md:col-span-3">

        <div className="flex space-x-2 justify-end">
          {tabsVisibles.map(item => {
            return (
              <button
                key={item}
                className={`px-4 py-2 rounded ${
                  tabActiva === item ? 'bg-blue-600 text-white' : 'cursor-pointer bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-500 dark:text-white dark:hover:bg-zinc-600'
                }`}
                onClick={() => {
                  if (tabActiva !== item) setTabActiva(item);
                }}
              >
                {item}
              </button>
            );
          })}
        </div> 

      </div>
    </div>
  )
}