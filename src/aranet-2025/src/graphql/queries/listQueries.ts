export const LIST_QUERIES = {
  user: `
    query ListUsers(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: [String!]
    ) {
      users(
        page: $page,
        size: $size,
        sortField: $sortField,
        sortDir: $sortDir,
        search: $search,
        filters: $filters
      ) {
        statusCode
        data {
          items {
            id
            username
            last_login
            created_at
            is_super_admin
            is_active
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
  invoice: `
    query ListInvoices(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: [String!]
    ) {
      invoices(
        page: $page,
        size: $size,
        sortField: $sortField,
        sortDir: $sortDir,
        search: $search,
        filters: $filters
      ) {
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
