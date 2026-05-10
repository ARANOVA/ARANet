import { SearchOperators } from "../interfaces";

export const getSearchOperator = (op: string): SearchOperators => {
  switch (op.toLowerCase()) {
    case 'equals':
    case '=':
      return SearchOperators.equals;
    case 'not':
    case '!=':
      return SearchOperators.not;
    case 'lt':
    case '<':
      return SearchOperators.lt;
    case 'lte':
    case '<=':
      return SearchOperators.lte;
    case 'gt':
    case '>':
      return SearchOperators.gt;
    case 'gte':
    case '>=':
      return SearchOperators.gte;
    case 'in':
      return SearchOperators.in;
    case 'notin':
    case 'not_in':
      return SearchOperators.not_in;
    case 'like':
    case 'contains':
      return SearchOperators.like;
    case 'empty':
    case 'isnull':
      return SearchOperators.empty;
    case 'notempty':
    case 'isnotnull':
      return SearchOperators.notEmpty;
    default:
      return SearchOperators.equals;
  }
}