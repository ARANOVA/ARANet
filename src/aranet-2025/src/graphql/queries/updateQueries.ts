export const UPDATE_QUERIES = {
  invoice_item: `
    mutation UpdateInvoiceItem(
      $id: Int!,
      $data: InvoiceItemUpdate!,
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
}