import { SearchOperators } from "@aranova/aranova-react-ui";

export const fieldOperators = (value: string): { operator: SearchOperators, value: string } => {
  let operator = SearchOperators.empty;
  if (value.startsWith('<=')) {
    operator = SearchOperators.lte;
    value = value.slice(2).trim();
  } else if (value.startsWith('>=')) {
    operator = SearchOperators.gte;
    value = value.slice(2).trim();
  } else if (value.startsWith('<')) {
    operator = SearchOperators.lt;
    value = value.slice(1).trim();
  } else if (value.startsWith('>')) {
    operator = SearchOperators.gt;
    value = value.slice(1).trim();
  } else if (value.startsWith('=')) {
    operator = SearchOperators.equals;
    value = value.slice(1).trim();
  }
  return { operator, value };
}


export const buildBusquedaExtra = (
  busquedasEncontradas: string[],
  fieldsMapsort: Record<string, string | null>,
  textFields: string[],
  validFields: string[],
  numberOrDateFields: string[],
): string => {
  const sanitizeValue = (value: string): string => value.toLowerCase().trim();
  const isInvalidValue = (value: string): boolean => value.includes("'") || value.includes('"') || value === '';
  const isInvalidField = (field: string): boolean => !validFields.includes(field.toLowerCase());

  const buildCondition = (key: string, valueField: string): string => {
    if (isInvalidField(key)) return '';
    let field = fieldsMapsort[key] ?? key;

    if (key === 'edad') {
      const { operator, value } = fieldOperators(valueField);
      if (isNaN(Number(value)) || isInvalidValue(value)) {
        return '';
      }
      return `DATEDIFF(YEAR, ${field}, GETDATE()) ${operator.toUpperCase() || '='} ${value}`;
    }
    if (isInvalidValue(valueField)) {
      return '';
    }

    let { operator, value } = fieldOperators(valueField);
      
    if (numberOrDateFields.includes(key)) {
      if (value.indexOf('-') > -1) {
        value = `'${value}'`;
      } else {
        value = `${value}`;
      }
    } else {
      field = `LOWER(${field})`;
      if (operator === '' || operator === SearchOperators.like) {
        operator = SearchOperators.like;
        value = `'%${value}%'`;
      } else {
        value = `'${value}'`;
      }
    }
    return `${field} ${operator.toUpperCase()} ${value}`;
  };

  try {
    const todasGenerales = busquedasEncontradas.every((fa: string) => !fa.includes(':'));
    return busquedasEncontradas
      .map((fa: string): string => {

        const aux = fa.split(':').map(sanitizeValue);

        if (aux.length > 2) return '';

        if (aux.length === 1) {

          const val = aux[0];
          if (isInvalidValue(val)) {
            return '';
          }

          const searchSQL = textFields.map(key => {
            const field = fieldsMapsort[key] ?? key;
            const { operator, value } = fieldOperators(val);

            const values = value.split(',').map(v => v.trim()).filter(v => v !== '');
            if (values.length > 1) {
              const inClause = values
                .map(v => {

                  if (operator && value) {
                    return `LOWER(${field}) ${operator.toUpperCase()} '${v}'`;
                  }

                  return `LOWER(${field}) LIKE '%${v}%'`;
                })
                .join(' OR ');


              return `${inClause}`;
            }

            if (operator && value) {
              return `LOWER(${field}) ${operator.toUpperCase()} '${value}'`;
            }
            return `LOWER(${field}) LIKE '%${val}%'`;
          })

            .filter((f: string) => f !== '')
            .join(' OR ');

          return searchSQL ? `(${searchSQL})` : '';
        }

        const [key, value] = aux;

        const values = aux[1].split(',').map(v => v.trim()).filter(v => v !== '');
        if (values.length > 1) {
          let field = fieldsMapsort[key] ?? key;

          // Solo para campos válidos
          if (!field || isInvalidField(key)) return '';

          const inClause = values
            .map(v => {

              let { operator, value: v2 } = fieldOperators(v);
              if (operator && v2) {

                // CASO 2c

                if (numberOrDateFields.includes(key)) {
                  if (v2.indexOf('-') > -1) {
                    v2 = `'${v2}'`;
                  } else {
                    v2 = `${v2}`;
                  }
                } else {
                  field = `LOWER(${field})`;
                  if (operator === SearchOperators.empty as SearchOperators || operator === SearchOperators.like) {
                    operator = SearchOperators.like;
                    v2 = `'%${v2}%'`;
                  } else {
                    v2 = `'${v2}'`;
                  }
                }
                return `${field} ${operator.toUpperCase()} ${v2}`;
              }

              return `LOWER(${field}) LIKE '%${v2}%'`;
            })
            .join(' OR ');


          return `(${inClause})`;
        }

        return buildCondition(key, value);
      })
      .filter((f: string) => f !== '')
      .join(todasGenerales ? ' OR ' : ' AND ');
  } catch (error) {
    console.error('Error building busqueda extra:', error);
    return '';
  }
};