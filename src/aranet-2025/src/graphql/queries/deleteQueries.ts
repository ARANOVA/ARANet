export const DELETE_QUERIES = {
  expense: `
    mutation DeleteExpense(
      $ids: [Int!]!,
    ) {
      deleteExpense(ids: $ids) {
        error
        statusCode
      }
    }
  `
}