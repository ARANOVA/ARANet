'use client';

import { sf_tag } from "@/generated/prisma";
import { aranet_invoice_join_all } from "@/interfaces";
import { formatDate, formatDatetime, getModelState, toShortDate } from "@/utils";
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
    project, 
    payment_condition,
    payment_method,
    payment_status,
    budget: budget,
  } = invoice;

  const payment_date = toShortDate(invoice.invoice_payment_date);
  const invoice_date = toShortDate(invoice.invoice_date);
  const freezeInfo = invoice.freeze_at ? (
    <>
      <br />
      Fecha &quot;congelación&quot;: {formatDatetime(invoice.freeze_at)}
    </>
  ) : null;
  const signedInfo = invoice.signed_at ? (
    <>
      <br />
      Fecha firma: {formatDatetime(invoice.signed_at)}
    </>
  ) : null;
  const sentInfo = invoice.sent_at ? (
    <>
      <br />
      Fecha registro: {formatDatetime(invoice.sent_at)}
    </>
  ) : null;

  const state = getModelState(invoice);

  return (
    <DescriptionList>
      <DescriptionTerm className="!pt-0.5">Estado<br /><span className="text.xm">{state?.title}</span></DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">
        Fecha factura: {invoice_date}
        {freezeInfo}
        {signedInfo}
        {sentInfo}
      </DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">{payment_status?.payment_status_title}</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{payment_date}</DescriptionDetails>

      {(project || budget)&& (
        <>
        <DescriptionTerm className="!pt-0.5">Proyecto</DescriptionTerm>
        <DescriptionDetails className="!pt-0.5 !pb-1">
          {project && (
            <>
              <Link href={`/project/show/${project.id}`} className="text-sky-600 dark:text-sky-400 hover:underline">
                {project.project_prefix}{project.project_number} - {project.project_name}
              </Link>
              <br/>
            </>
          )}
          {budget && <Link href={`/budget/show/${budget.id}`} className="text-sky-600 dark:text-sky-400 hover:underline">
            {budget.budget_prefix}{budget.budget_number}-R{budget?.budget_revision} - {budget.budget_title}
          </Link>}
        </DescriptionDetails>
        </>
      )}

      <DescriptionTerm className="!pt-0.5">Título</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{title}</DescriptionDetails>

      {!!service_from && !!service_to && (
        <>
          <DescriptionTerm className="!pt-0.5">Fechas de servicio</DescriptionTerm>
          <DescriptionDetails className="!pt-0.5 !pb-1">{toShortDate(service_from)} - {toShortDate(service_to)}</DescriptionDetails>
        </>
      )}

      {!!invoice.invoice_periodic && (
        <>
          <DescriptionTerm className="!pt-0.5">Periodicidad</DescriptionTerm>
          <DescriptionDetails className="!pt-0.5 !pb-1">{invoice.invoice_periodic_current} / {invoice.invoice_periodic}</DescriptionDetails>
        </>
      )}

      <DescriptionTerm className="!pt-0.5">Comentarios</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{comments}</DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Impuestos y Transporte</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">Impuestos: {tax}%; Portes: {freight ? freight : "No"}</DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Forma de pago</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">
        {payment_method?.payment_method_title} - {payment_condition?.payment_condition_title}
        {(payment_condition?.payment_condition_payment_day || 0) > 0 &&
          `Pago el día: ${payment_condition?.payment_condition_payment_day}`
        }
      </DescriptionDetails>

      <DescriptionTerm className="!pt-0.5">Etiquetas</DescriptionTerm>
      <DescriptionDetails className="!pt-0.5 !pb-1">{(tags || []).map(t => t.name).join(", ")}</DescriptionDetails>
    </DescriptionList>
  );
}