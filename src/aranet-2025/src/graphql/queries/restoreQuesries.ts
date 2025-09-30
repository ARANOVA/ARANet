export const RESTORE_QUERIES = {
  restore: `
    mutation RestoreRegister(
      $model: String!,
      $ids: [Int!]!,
    ) {
      restoreRegister(model: $model, ids: $ids) {
        error
        statusCode
      }
    }
  `
}