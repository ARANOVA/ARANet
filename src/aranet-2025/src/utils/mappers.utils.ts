import { FilterDTO, FilterField, SearchDTO, SearchOperators } from "@aranova/aranova-react-ui";

export const mapSearchModelToFilters = (searches: SearchDTO[], filters: FilterDTO[], defFilters: FilterField[]): FilterField[] => {
  searches.forEach((search) => {
    defFilters.forEach((filter) => {
      let childFound = false;

      if (filter.children && filter.children.length > 0) {
        const child = filter.children.find((child) => {
          const isSameField = filter.fieldName.toLowerCase() === search.field.toLowerCase();
          const isSameOperator = child.operator.toLowerCase() === search.operator.toLowerCase();
          const childOperatorIsLikeAndSearchModelOperatorIsEmpty = child.operator.toLowerCase() === 'like' && search.operator.toLowerCase() === 'like';

          return isSameField && (isSameOperator || childOperatorIsLikeAndSearchModelOperatorIsEmpty);
        });

        if (child) {
          child.value = search.value;
          childFound = true;
        }
      }

      if (!childFound) {
        const isSameField = filter.fieldName.toLowerCase() === search.field.toLowerCase();
        const isSameOperator = filter.operator.toLowerCase() === search.operator.toLowerCase() || (filter.operator === SearchOperators.like && search.operator === SearchOperators.empty);
        const filterOperatorIsLikeAndSearchModelOperatorIsEmpty = filter.operator === SearchOperators.like && search.operator === SearchOperators.like;
        if (isSameField && (isSameOperator || filterOperatorIsLikeAndSearchModelOperatorIsEmpty)) {
          filter.value = search.value;
        }
      }
    });
  });
  return filters;
};
