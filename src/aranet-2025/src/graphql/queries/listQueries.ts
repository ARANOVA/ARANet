export const LIST_QUERIES = {
  invoice: `
    query ListInvoices($page: Int, $size: Int, $sortField: String, $sortDir: String) {
      invoices(page: $page, size: $size, sortField: $sortField, sortDir: $sortDir) {
        statusCode
        data {
          items {
            id
            invoice_prefix
            invoice_number
            invoice_date
            invoice_title
            invoice_client_id
            aranet_client {
              id
              client_company_name
            }
          }
          metadata {
            total
            page
            quantity
            last
          }
        }
      }
    }
  `,
};
