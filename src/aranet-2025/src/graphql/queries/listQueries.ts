export const LIST_QUERIES = {
  contact: `
    query ListContacts(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: [String!]
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
      $filters: [String!]
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
      $filters: [String!]
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
  vendor: `
    query ListVendors(
      $page: Int,
      $size: Int,
      $sortField: String,
      $sortDir: String,
      $search: [SearchInput!],
      $filters: [String!]
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
            client {
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
