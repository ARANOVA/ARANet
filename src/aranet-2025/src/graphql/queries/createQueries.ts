export const CREATE_QUERIES = {
  invoice_item: `
    mutation CreateInvoiceItem(
      $data InvoiceItemUpdate!,
    ) {
      createInvoiceItem(data $data) {
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
  
  user: `
  mutation createUser($data: UserUpdate!) {
    createUser(data: $data) {
      error
      statusCode
    }
  }
  
  `,
  vendor: `
  mutation createVendor($data: VendorUpdate!) {
    createVendor(data: $data) {
      error
      statusCode
    }
  }
  
  `,
};
