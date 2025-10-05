export const LIST_QUERIES = {
  invoice_item: `
    query ListInvoiceItems(
      $sortField: String,
      $sortDir: String,
      $filters: WhereInput,
    ) {
      invoice_items(
        sortField: $sortField,
        sortDir: $sortDir,
        filters: $filters,
      ) {
        statusCode
        data {
          items {
            id
            item_description
            item_tax_rate
            item_quantity
            item_cost
            item_type_id 
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
  budget: `
    query ListBudgets(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      budgets(
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
            budget_prefix
            budget_number
            budget_revision
            budget_title
            budget_date
            budget_status_id
            budget_total_cost
            budget_is_last
            budget_total_amount
            created_at
            updated_at
            client {
              client_company_name
              client_unique_name
            }
            project {
              project_prefix
              project_number
              project_name
            }
            status {
              budget_status_title
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
  project: `
    query ListProjects(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      projects(
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
            project_prefix
            project_number
            project_name
            project_url
            project_comments
            project_start_date
            created_at
            updated_at
            client {
              id
              client_company_name
              client_unique_name
              client_website
            }
            status {
              id
              project_status_title
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
  contact: `
    query ListContacts(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      contacts(
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
            contact_first_name
            contact_last_name
            contact_birthday
            contact_phone
            contact_mobile
            contact_email
            contact_fax
            created_at
            updated_at
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
  vendor: `
    query ListVendors(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      vendors(
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
            vendor_company_name
            vendor_unique_name
            vendor_cif
            vendor_since
            created_at
            updated_at
            vendor_website
            objectcontacts {
              objectcontact_contact_id
              objectcontact_object_id
              objectcontact_object_class
              objectcontact_rol
              objectcontact_is_default
              aranet_contact {
                contact_first_name
                contact_last_name
                contact_email
              }
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
  client: `
    query ListClients(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      clients(
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
            client_company_name
            client_unique_name
            client_cif
            client_since
            created_at
            updated_at
            client_website
            objectcontacts {
              objectcontact_contact_id
              objectcontact_object_id
              objectcontact_object_class
              objectcontact_rol
              objectcontact_is_default
              aranet_contact {
                contact_first_name
                contact_last_name
                contact_email
              }
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
  user: `
    query ListUsers(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
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
            profile {
              id
              first_name
              last_name
              email
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
  invoice: `
    query ListInvoices(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
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
            client {
              client_company_name
              client_unique_name
              client_website
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
  expense: `
    query ListExpenses(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      expenses(
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
  income: `
    query ListIncomes(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      incomes(
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
            income_date
            income_item_name
            income_item_vendor_id
            income_item_amount
            income_item_base
            income_item_irpf
            income_item_tax_rate
            income_item_category_id
            vendor {
              vendor_company_name
              vendor_unique_name
              vendor_website
            }
            category {
              category_title
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
  cash: `
    query ListCashes(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: WhereInput
    ) {
      cashes(
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
            cash_item_date
            cash_item_name
            cash_item_comments
            cash_item_amount
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
