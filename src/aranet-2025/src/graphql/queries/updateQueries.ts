export const UPDATE_QUERIES = {
  invoice_item: `
    mutation UpdateInvoiceItem(
      $id: Int!,
      $data: InvoiceItemUpdate!
    ) {
      updateInvoiceItem(id: $id, data: $data) {
        error
        statusCode
        data {
          id
          item_type_id
          item_description
          item_quantity
          item_cost
          item_tax_rate
          item_invoice_id
        }
      }
    }
  `,
  invoice: `
    mutation UpdateInvoice(
      $id: Int!,
      $data: InvoiceUpdate!
    ) {
      updateInvoice(id: $id, data: $data) {
        error
        statusCode
        data {
          id
        }
      }
    }
  `,
  user: `
  mutation UpdateUser(
    $id: Int!,
    $data: UserUpdate!
  ) {
    updateUser(id: $id, data: $data) {
      error
      statusCode
      data {
        id
      }
    }
  }
  `,
  vendor: `
  mutation UpdateVendor(
    $id: Int!,
    $data: VendorUpdate!
  ) {
    updateVendor(id: $id, data: $data) {
      error
      statusCode
      data {
        id
      }
    }
  }
  `,
  client: `
  mutation UpdateClient(
    $id: Int!,
    $data: ClientUpdate!
  ) {
    updateClient(id: $id, data: $data) {
      error
      statusCode
      data {
        id
      }
    }
  }
  `,
  contact: `
  mutation UpdateContact(
    $id: Int!,
    $data: ContactUpdate!
  ) {
    updateContact(id: $id, data: $data) {
      error
      statusCode
      data {
        id
      }
    }
  }
  `,
};
