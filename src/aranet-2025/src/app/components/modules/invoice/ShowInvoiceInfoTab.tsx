import { datePipe } from "@/app/lib/helpers";
import { sf_tag } from "@/generated/prisma";
import { aranet_invoice_join_all } from "@/interfaces";
import { DescriptionDetails, DescriptionList, DescriptionTerm, Link } from "@aranova/aranova-react-ui";

interface Props {
  invoice: aranet_invoice_join_all;
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
    invoice_payment_date,
    invoice_date: invoice_date_raw,
    aranet_budget: budget,
  } = invoice;

  const payment_date = invoice_payment_date ? datePipe(invoice_payment_date) : '';
  const invoice_date = invoice_date_raw ? datePipe(invoice_date_raw) : '';

  return (
    <DescriptionList>
      <DescriptionTerm className="!pt-0.5">Estado</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">
        Abierto: {invoice_date}<br/>
        {status?.payment_status_title}{payment_date ? `: ${payment_date}` : ''} <br />
      </DescriptionDetails>

      {project && (
        <>
        <DescriptionTerm className="!pt-0.5">Proyecto</DescriptionTerm>
        <DescriptionDetails className="!pt-0.5 !pb-1">
          <Link href={`/project/show/${project.id}`} className="text-sky-600 dark:text-sky-400 hover:underline">
            {project.project_prefix}{project.project_number} - {project.project_name}
          </Link><br/>
          {budget && <Link href={`/budget/show/${budget.id}`} className="text-sky-600 dark:text-sky-400 hover:underline">
            {budget.budget_prefix}{budget.budget_number}-R{budget?.budget_revision} - {budget.budget_title}
          </Link>}
        </DescriptionDetails>
        </>
      )}

      <DescriptionTerm className="!pt-0.5">Título</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{title}</DescriptionDetails>

      {service_from && service_to && (
        <>
          <DescriptionTerm className="!pt-0.5">Fechas de servicio</DescriptionTerm>
          <DescriptionDetails className="!pt-0.5 !pb-1">{datePipe(service_from)} - {datePipe(service_to)}</DescriptionDetails>
        </>
      )}

      {invoice.invoice_periodic && (
        <>
          <DescriptionTerm className="!pt-0.5">Periodicidad</DescriptionTerm>
          <DescriptionDetails className="!pt-0.5 !pb-1">{invoice.invoice_periodic_current} / {invoice.invoice_periodic}</DescriptionDetails>
        </>
      )}

      <DescriptionTerm className="!pt-0.5">Comentarios</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{comments}</DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Impuestos y Transporte</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">Impuestos: {tax}% Portes: {freight ? freight : "No"}</DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Forma de pago</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{aranet_payment_method?.payment_method_title} - {aranet_payment_condition?.payment_condition_title}</DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Etiquetas</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{(tags || []).map(t => t.name).join(", ")}</DescriptionDetails>
    </DescriptionList>
  );
}