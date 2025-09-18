import { datePipe } from "@/app/lib/helpers";
import { sf_tag } from "@/generated/prisma";
import { aranet_invoice_join_client_and_payment_and_project } from "@/interfaces";
import { DescriptionDetails, DescriptionList, DescriptionTerm, Link } from "@aranova/aranova-react-ui";

interface Props {
  invoice: aranet_invoice_join_client_and_payment_and_project;
  tags?: sf_tag[];
}

export const ShowInvoiceInfoTab = ({ invoice, tags }: Props) => {

  const {
    invoice_title: title,
    invoice_comments: comments,
    invoice_tax_rate: tax,
    invoice_freight_charge: freight,
    invoice_service_from: service_from,
    invoice_service_to: service_to,
    aranet_project: project, 
    aranet_payment_condition,
    aranet_payment_method,
    aranet_payment_status: status,
    invoice_payment_date
  } = invoice;

  const payment_date = invoice_payment_date ? datePipe(invoice_payment_date) : '';

  return (
    <DescriptionList>
      <DescriptionTerm>Estado</DescriptionTerm>
      <DescriptionDetails>
        {status?.payment_status_title}: {payment_date} <br />
      </DescriptionDetails>

      {project && (
        <>
        <DescriptionTerm>Proyecto</DescriptionTerm>
        <DescriptionDetails>
          <Link href={`/project/show/${project.id}`} className="text-sky-600 hover:underline">
            {project.project_name}
          </Link>
        </DescriptionDetails>
        </>
      )}

      <DescriptionTerm>Título</DescriptionTerm>
      <DescriptionDetails>{title}</DescriptionDetails>

      {service_from && service_to && (
        <>
          <DescriptionTerm>Fechas de servicio</DescriptionTerm>
          <DescriptionDetails>{datePipe(service_from)} - {datePipe(service_to)}</DescriptionDetails>
        </>
      )}

      {invoice.invoice_periodic && invoice.invoice_periodic_current && (
        <>
          <DescriptionTerm>Periodicidad</DescriptionTerm>
          <DescriptionDetails>{invoice.invoice_periodic_current} / {invoice.invoice_periodic}</DescriptionDetails>
        </>
      )}

      <DescriptionTerm>Comentarios</DescriptionTerm>
      <DescriptionDetails>{comments}</DescriptionDetails>

      <DescriptionTerm>Impuestos y Transporte</DescriptionTerm>
      <DescriptionDetails>Impuestos: {tax}% Portes: {freight}</DescriptionDetails>

      <DescriptionTerm>Forma de pago</DescriptionTerm>
      <DescriptionDetails>{aranet_payment_method?.payment_method_title} - {aranet_payment_condition?.payment_condition_title}</DescriptionDetails>

      <DescriptionTerm>Etiquetas</DescriptionTerm>
      <DescriptionDetails>{(tags || []).map(t => t.name).join(", ")}</DescriptionDetails>
    </DescriptionList>
  );
}