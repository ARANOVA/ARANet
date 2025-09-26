export const DELETE_QUERIES = {
  expense: `
    mutation DeleteExpenses(
      $ids: [Int!]!,
    ) {
      deleteExpenses(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  client: `
    mutation DeleteClients(
      $ids: [Int!]!,
    ) {
      deleteClients(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  vendor: `
    mutation DeleteVendors(
      $ids: [Int!]!,
    ) {
      deleteVendors(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  contact: `
    mutation DeleteContacts(
      $ids: [Int!]!,
    ) {
      deleteContacts(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  project: `
    mutation DeleteProjects(
      $ids: [Int!]!,
    ) {
      deleteProjects(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  budget: `
    mutation DeleteBudgets(
      $ids: [Int!]!,
    ) {
      deleteBudgets(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  timesheet: `
    mutation DeleteTimeheets(
      $ids: [Int!]!,
    ) {
      deleteTimeheets(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  invoice: `
    mutation DeleteInvoices(
      $ids: [Int!]!,
    ) {
      deleteInvoices(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  income: `
    mutation DeleteIncomes(
      $ids: [Int!]!,
    ) {
      deleteIncomes(ids: $ids) {
        error
        statusCode
      }
    }
  `,
  cash: `
    mutation DeleteCashes(
      $ids: [Int!]!,
    ) {
      deleteCashes(ids: $ids) {
        error
        statusCode
      }
    }
  `
}