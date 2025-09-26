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
  `
}