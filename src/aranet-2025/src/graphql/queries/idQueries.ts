export const ID_QUERIES = {
  expense: `
    query GetExpense(
      $id: Int!,
    ) {
      expense(
        id: $id
      ) {
        statusCode
        data {
          id
          expense_item_invoice_number
          expense_purchase_date
          expense_item_name
          expense_item_vendor_id
          expense_item_amount
          expense_item_tax_rate
          expense_item_base
          expense_item_irpf
          expense_item_periodic
          expense_item_category_id
          vendor {
            vendor_company_name
            vendor_unique_name
            vendor_website
          }
          category {
            category_title
            category_meta_concept
            category_show
          }
        }
      }
    }
  `,
  invoice: `
    query GetInvoice(
      $id: Int!,
    ) {
      invoice(
        id: $id
      ) {
        statusCode
        data {
          id
          invoice_prefix
          invoice_number
          invoice_date
          invoice_title
          invoice_client_id
          invoice_payment_status_id
          invoice_payment_date
          invoice_total_amount
          invoice_tax_rate
          invoice_periodic
          invoice_periodic_current
          invoice_service_from
          invoice_service_to
          payment_status {
            payment_status_title
          }
          payment_condition {
            payment_condition_days
            payment_condition_payment_day
            payment_condition_title
          }
          payment_method {
            payment_method_title
          }
          kind_of_invoice {
            kind_of_invoice_title
          }
          project {
            id
            project_prefix
            project_number
            project_name
          }
          budget {
            id
            budget_revision
            budget_number
            budget_prefix
            budget_title
          }
          project {
            id
          }
          client {
            client_company_name
            client_unique_name
            client_website
          }
        }
      }
    }
  `,
}