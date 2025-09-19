'use client';

import { aranet_address, aranet_objectaddress, aranet_objectcontact, aranet_contact } from "@/generated/prisma";
import { aranet_invoice_join_all, Tab } from "@/interfaces"
import { ShowAddress } from "../address";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import clsx from "clsx";
import { useState } from "react";
import { ShowInvoiceInfoTab } from "./ShowInvoiceInfoTab";

interface Props {
  invoice: aranet_invoice_join_all;
  addresses?: (aranet_objectaddress & { aranet_address: aranet_address })[];
  contacts?: (aranet_objectcontact & { aranet_contact: aranet_contact })[];
}
export const InvoiceInfo = ({ invoice, addresses, contacts }: Props) => {

  const [ tabs, setTabs ] = useState<Tab[]>([
    { name: 'Información de factura', href: '#', current: true },
    // { name: 'Company', href: '#', current: false },
  ]);

  const setActiveTab = (tab: Tab): void => {
    setTabs(prev =>
      prev.map(t => ({
        ...t,
        current: t.name === tab.name,
      }))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <div className="flex flex-col gap-2">
          <p className="border-b-2 border-transparent px-1 py-4 text-sm">&nbsp;</p>
          <ShowAddress invoice={invoice} addresses={addresses} contacts={contacts} />
        </div>
      </div>
      <div className="md:col-span-3">

        <div>
          <div className="grid grid-cols-1 sm:hidden">
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              defaultValue={(tabs.find((tab) => tab.current) || tabs[0]).name}
              aria-label="Select a tab"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-sky-500"
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
            />
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200 dark:border-white/10">
              <nav aria-label="Tabs" className="-mb-px flex">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    onClick={() => setActiveTab(tab)}
                    aria-current={tab.current ? 'page' : undefined}
                    className={clsx(
                      tab.current
                        ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300',
                      'cursor-pointer w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium',
                    )}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          {tabs.map((tab) => (
            <div key={tab.name} className={clsx('py-4', tab.current ? '' : 'hidden')}>
              <ShowInvoiceInfoTab invoice={invoice} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}