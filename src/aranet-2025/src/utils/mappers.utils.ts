import { FilterDTO, FilterField, SearchDTO, SearchOperators } from "@aranova/aranova-react-ui";

export const mapSearchAndFilterValuesToFilters = (
  defFilters: FilterField[],
  model: string,
  searches: SearchDTO[],
  filters: FilterDTO[],
): FilterField[] => {
  defFilters.forEach((defFilter) => {
    // Rellenar primer nivel
    let search = searches.find(s => (
      s.field.toLowerCase() === defFilter.fieldName.toLowerCase() &&
      s.type === model &&
      s.operator.toLowerCase() === defFilter.operator.toLowerCase()
    ));
    if (!search) {
      search = filters.find(s => (
        s.field.toLowerCase() === defFilter.fieldName.toLowerCase() &&
        s.type === model &&
        s.operator.toLowerCase() === defFilter.operator.toLowerCase()
      ));
    }
    console.log({search});
    if (search) {
      defFilter.value = search.value;
    }

    // if (filter.children && filter.children.length > 0) {
    //   const child = filter.children.find((child) => {
    //     const isSameField = filter.fieldName.toLowerCase() === search.field.toLowerCase();
    //     const isSameOperator = child.operator.toLowerCase() === search.operator.toLowerCase();
    //     const childOperatorIsLikeAndSearchModelOperatorIsEmpty = child.operator.toLowerCase() === 'like' && search.operator.toLowerCase() === 'like';

    //     return isSameField && (isSameOperator || childOperatorIsLikeAndSearchModelOperatorIsEmpty);
    //   });

    //   if (child) {
    //     child.value = search.value;
    //     childFound = true;
    //   }
    // }

    // if (!childFound) {
    //   const isSameField = filter.fieldName.toLowerCase() === search.field.toLowerCase();
    //   const isSameOperator = filter.operator.toLowerCase() === search.operator.toLowerCase() || (filter.operator === SearchOperators.like && search.operator === SearchOperators.empty);
    //   const filterOperatorIsLikeAndSearchModelOperatorIsEmpty = filter.operator === SearchOperators.like && search.operator === SearchOperators.like;
    //   if (isSameField && (isSameOperator || filterOperatorIsLikeAndSearchModelOperatorIsEmpty)) {
    //     filter.value = search.value;
    //   }
    // }
  });
  console.log({defFilters});
  return defFilters;
};
