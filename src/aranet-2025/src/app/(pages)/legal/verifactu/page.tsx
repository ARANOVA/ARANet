import { ListResponse, MenuItem, NotAuthorized, TopBreadcrumb } from "@aranova/aranova-react-ui";
import ServerDataPlain from "@/app/data/ServerDataPlain";
import { getSession } from "@/app/lib/session";
import { DropdownSelectButton, PageStoreHeader, SimpleTable, ToastStoreAlert } from "@/app/components";
import { Metadata } from "next";
import { verifactuConsulta } from "@/utils/server/verifactu.utils";
import { invoiceVerifactuColumns } from "@/app/data/invoice";
import { ColumnDef } from "@tanstack/react-table";
import { toDateFromShort } from "@/utils/date.utils";
import { VerifactuInvoice } from "@/interfaces";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Comprobación Verifactu - Fiscal',
};

export default async function CheckVerifactuPage() {
  const session = await getSession();
  if (!session) {
    return <NotAuthorized />;
  }

  const dataPlain = ServerDataPlain.getInstance();
  const me = await dataPlain.useMe(session.id);
  if (!me.data?.id) {
    return <NotAuthorized />;
  }
  
  const links: MenuItem[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Fiscal', href: null },
    { name: 'Comprobación Verifactu', href: '' },
  ];

  const currentYear = new Date().getFullYear();
  const options = Array.from({ length: 3 }, (_, i) => {
    const year = currentYear - (2 - i); // genera [currentYear-2, currentYear-1, currentYear]
    return {
      label: String(year),
      value: year,
      selected: year === currentYear,
    };
  });

  // Ejecutar la consulta a Verifactu para todos los meses hasta el actual
  const list: ListResponse<VerifactuInvoice> = {
    statusCode: 200,
    data: {
      items: [],
      metadata: {
        page: 1,
        last: 1,
        quantity: 0,
        total: 0,
      }
    },
  };
  // for (let month = 1; month <= new Date().getMonth() + 1; month++) {
  for (let month = 1; month <= 1; month++) {
    const result = await verifactuConsulta(currentYear, month);
    if (result instanceof Error) {
      console.log(`Error en verifactuConsulta para ${currentYear}-${month}:`, result);
    } else {
      try {
        if (result.ResultadoConsulta !== 'SinDatos') {
          console.log(`Procesando resultados de Verifactu para ${currentYear}-${month}...`);
          result.RegistroRespuestaConsultaFactuSistemaFacturacion.forEach((inv) => {
            const aux = (inv.IDFactura.NumSerieFactura || '').split(`F-${currentYear}-`);
            const d = toDateFromShort(inv.IDFactura.FechaExpedicionFactura);
            const cuota = parseFloat(inv.DatosRegistroFacturacion.CuotaTotal) || 0;
            const total = parseFloat(inv.DatosRegistroFacturacion.ImporteTotal) || 0;
            const tax_rate = total > 0 ? Math.round((cuota / (total - cuota) * 100) * 100) / 100 : 0;
            const base = total - cuota; 
            list.data!.items.push({
              id: -1 * list.data!.items.length,
              invoice_prefix: aux[0] || '',
              invoice_number: aux[1] || '',
              invoice_date: d || new Date(),
              invoice_title: inv.DatosRegistroFacturacion.DescripcionOperacion || null,
              client: {
                client_unique_name: inv.DatosRegistroFacturacion.Destinatarios.IDDestinatario[0].NombreRazon || '',
                client_company_name: inv.DatosRegistroFacturacion.Destinatarios.IDDestinatario[0].NombreRazon || '',
                client_cif: inv.DatosRegistroFacturacion.Destinatarios.IDDestinatario[0].NIF || '',
              },
              created_at: new Date(inv.DatosRegistroFacturacion.FechaHoraHusoGenRegistro) || null,
              updated_at: new Date(inv.EstadoRegistro.TimestampUltimaModificacion) || null,
              sent_at: new Date(inv.DatosPresentacion.TimestampPresentacion) || null,
              sent_hash: inv.DatosRegistroFacturacion.Huella,
              sent_response_data: inv.EstadoRegistro.EstadoRegistro || '',
              sent_response_code: inv.EstadoRegistro.CodigoErrorRegistro || '',
              sent_response_message: inv.EstadoRegistro.DescripcionErrorRegistro,
              invoice_tax_rate: tax_rate,
              invoice_total_amount: base,
            });
            console.log(list.data!.items);
          });
        } else {
          console.log(`No hay datos de Verifactu para ${currentYear}-${month}.`);
        }
      } catch (e) {
        console.log(`Error procesando resultados de Verifactu para ${currentYear}-${month}:`, e);
      }
    }
  }

  // Actualizar propiedades de paginación y ordenar registros
  list.data!.metadata.quantity = list.data!.items.length;
  list.data!.metadata.total = list.data!.items.length;
  list.data!.items.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

    // Si quieres los null al final:
    if (!a.created_at) return 1;
    if (!b.created_at) return -1;

    return dateA - dateB;
  });


  return (
    <>
      <TopBreadcrumb links={links} />
      <div className="flex flex-col flex-1">
        <PageStoreHeader
          title="Comprobación Verifactu"
          subtitle="Listado de facturas emitidas y recibidas a través de Verifactu"
          model=""
          main_button={<DropdownSelectButton options={options}/>}
        />
        <ToastStoreAlert />
        <SimpleTable<VerifactuInvoice>
          editMode={false}
          sortField="created_at"
          sortDir='asc'
          columns={invoiceVerifactuColumns as ColumnDef<VerifactuInvoice, any>[]}
          data={list}
        >
        </SimpleTable>
      </div>
    </>
  )

}