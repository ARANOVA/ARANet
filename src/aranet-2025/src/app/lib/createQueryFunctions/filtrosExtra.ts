export function buildFiltrosExtra(
  filtrosEncontrados: string[],
  MAPSORT: Record<string, string | null>
): string {
    return filtrosEncontrados
      .map((fa: string) => {
        const aux = fa.split('|||');
        const key = aux[0].toLowerCase();
        const value = aux[1];
        const field = MAPSORT[key] ?? key;
  
        const multiple = value.split(',');
        if (multiple.length > 1) {
          return `${field} IN (${multiple
            .map(v => (isNaN(Number(v)) ? `'${v}'` : v))
            .join(', ')})`;
        }
  
        return `${field} = ${isNaN(Number(value)) ? `'${value}'` : value}`;
      })
      .join(' AND ');
  }