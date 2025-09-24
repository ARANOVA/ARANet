import { aranet_address, aranet_contact, aranet_objectaddress, aranet_objectcontact } from "@/generated/prisma";
import { aranet_invoice_join_client } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  invoice: aranet_invoice_join_client;
  addresses?: (aranet_objectaddress & { aranet_address: aranet_address })[];
  contacts?: (aranet_objectcontact & { aranet_contact: aranet_contact })[];
}

export const ShowAddress = ({ invoice, addresses, contacts }: Props) => {

  const defaultAddress = (addresses || []).find(a => a.objectaddress_is_default);
  const defaultContact = (contacts || []).find(c => c.objectcontact_is_default);

  return (
    <address
      className="max-w-md p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 not-italic"
      itemType="https://schema.org/PostalAddress"
      itemScope
      aria-label="Dirección de contacto"
    >
      {/* Título destacado */}
      <h2 className='font-extrabold mb-2'>
        <Link
          title={invoice.client?.client_company_name}
          href={`/client/show/${invoice.invoice_client_id}`}
          className="flex items-center gap-1 text-gray-900 dark:text-gray-50 hover:text-gray-700 hover:dark:text-gray-500 hover:underline"
          itemProp="name"
        >{invoice.client?.client_company_name}</Link>
      </h2>
    
      {defaultAddress && (
        <>
          <h3 className="text-sm font-bold mb-2 text-gray-600 dark:text-gray-400">
            {defaultAddress.objectaddress_name}
          </h3>

          {/* Líneas de la dirección */}
          <div className="text-sm space-y-1">
            <div>
              <p itemProp="streetAddress">{defaultAddress.aranet_address.address_line1}</p>
              {defaultAddress.aranet_address.address_line2 && <p itemProp="streetAddress">{defaultAddress.aranet_address.address_line2}</p>}
            </div>
            <div>
              <span itemProp="postalCode">{defaultAddress.aranet_address.address_postal_code}</span>
              <span className="mx-1">·</span>
              <span itemProp="addressLocality">{defaultAddress.aranet_address.address_location}</span>
              {defaultAddress.aranet_address.address_location !== defaultAddress.aranet_address.address_state ? ' (' : ''}
              <span
                className={clsx(defaultAddress.aranet_address.address_location === defaultAddress.aranet_address.address_state ? 'hidden' : '')}
                itemProp="addressRegion"
              >{defaultAddress.aranet_address.address_state}</span>
              {defaultAddress.aranet_address.address_location !== defaultAddress.aranet_address.address_state ? ')' : ''}
              <span className="mx-1">·</span>
              <span itemProp="addressCountry">{defaultAddress.aranet_address.address_country}</span>
            </div>
          </div>
        </>
      )}

        {/* Contacto opcional */}
        {defaultContact && (
          <>
          <h3 className="text-sm font-bold mt-4 mb-2 text-gray-600 dark:text-gray-400">
            Contacto principal
          </h3>
          <div className="mb-2 space-y-1">
            <Link
              title={`${defaultContact.aranet_contact.contact_first_name} ${defaultContact.aranet_contact.contact_last_name}`}
              href={`/contact/show/${defaultContact.objectcontact_contact_id}`}
              className="font-bold flex items-center gap-1 text-gray-900 dark:text-gray-50 hover:text-gray-700 hover:dark:text-gray-500 hover:underline"
              itemProp="name"
            >{`${defaultContact.aranet_contact.contact_first_name} ${defaultContact.aranet_contact.contact_last_name}`}</Link>

            <div className="text-sm space-y-1">
              <div className="font-semibold text-gray-900 dark:text-gray-50">
                {defaultContact.objectcontact_rol}
              </div>
              {(defaultContact.aranet_contact.contact_mobile || defaultContact.aranet_contact.contact_phone) && <div>
                Tel:{" "}
                <a
                  href={`tel:{defaultContact.aranet_contact.contact_mobile || defaultContact.aranet_contact.contact_phone}`}
                  className="hover:underline"
                >
                  {defaultContact.aranet_contact.contact_mobile || defaultContact.aranet_contact.contact_phone}
                </a>
              </div>}
              {defaultContact.aranet_contact.contact_email && <div>
                Email:{" "}
                <a
                  href={`mailto:${defaultContact.aranet_contact.contact_email}`}
                  className="hover:underline"
                >
                  {defaultContact.aranet_contact.contact_email}
                </a>
              </div>}
            </div>
          </div>
        </>
        )}
    </address>
  );
}