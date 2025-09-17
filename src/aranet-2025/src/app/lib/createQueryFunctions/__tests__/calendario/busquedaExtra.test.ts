import { buildBusquedaExtra } from '../../busquedaExtra';
import { Filters, SearchOperators } from '../../../../../interfaces';

export const calendarioTextFields = [
    'Calendario.Nombre',
];

export const CALENDARIO_MAPSORT: Record<string, string | null> = {
    'nombre': 'Calendario.Nombre',
    'anio': 'Calendario.Anio',
};

//añadir campos de filtros y busquedas
export const calendariosFilters: Filters[] = [
  {
    fieldName: 'Nombre',
    label: 'Buscar por Nombre',
    type: 'search',
    operator: SearchOperators.like,
  },
  {
    fieldName: 'Anio',
    label: 'Buscar por año',
    operator: SearchOperators.like,
    children: [
      {
        label: 'Buscar por año mayor o igual',
        type: 'number',
        operator: SearchOperators.gte
      },
      {
        label: 'Buscar por año menor o igual',
        type: 'number',
        operator: SearchOperators.lte
      },

      // {
      //   label: 'Buscar por fecha de nacimiento',
      //   type: 'equal',
      //   operator: SearchOperators.equals
      // },
    ]
  },
];

//campos validos para la busqueda segun la calendarios
export const CALENDARIO_VALID_FIELDS = calendariosFilters.map(f => f.fieldName.toLowerCase());
    
export const CALENDARIO_NUMBER_AND_DATE_FIELDS = [
    'anio'
];

describe('buildBusquedaExtra - tests elaborados', () => {

  test('Caso 1: Búsqueda general simple', () => {
    const input = ['JJAA'];
    const expected =
      `(LOWER(Calendario.Nombre) LIKE '%jjaa%')`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = ['JJAA,MT'];
    const expected1 =
      `(LOWER(Calendario.Nombre) LIKE '%jjaa%' OR LOWER(Calendario.Nombre) LIKE '%mt%')`;
    expect(buildBusquedaExtra(input1, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);
  });

  test('Caso 1b: Búsqueda general exacta', () => {
    const input = ['=JJAA'];
    const expected =
      `(LOWER(Calendario.Nombre) = 'jjaa')`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2: Búsqueda específica por campo mapeado', () => {
    const input = ['nombre:Carlos'];
    const expected = `LOWER(Calendario.Nombre) LIKE '%carlos%'`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });


  test('Caso 2c: Búsqueda específica por campo mapeado y or', () => {
    const input = ['nombre:Carlos,Pepe'];
    const expected = `(LOWER(Calendario.Nombre) LIKE '%carlos%' OR LOWER(Calendario.Nombre) LIKE '%pepe%')`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });
    test('Caso 2d: Búsqueda específica por campo mapeado y or', () => {
    const input1 = ['nombre:Carlos,=Pepe'];
    const expected1 = `(LOWER(Calendario.Nombre) LIKE '%carlos%' OR LOWER(Calendario.Nombre) = 'pepe')`;
    expect(buildBusquedaExtra(input1, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 2e: Búsqueda específica por campo mapeado y or', () => {
    const input = ['anio:>=2020,<=2024'];
    const expected = `(Calendario.Anio >= 2020 OR Calendario.Anio <= 2024)`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2f: Búsqueda específica por campo mapeado y and', () => {
    const input = ['anio:>=2000', 'anio:<=2024'];
    const expected = `Calendario.Anio >= 2000 AND Calendario.Anio <= 2024`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2g: Búsqueda exacta por campo mapeado', () => {
    const input = ['nombre:=Carlos'];
    const expected = `LOWER(Calendario.Nombre) = 'carlos'`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2h: Búsqueda exacta por campo mapeado numérico', () => {
    const input1 = ['anio:=111111'];
    const expected1 = `Calendario.Anio = 111111`;
    expect(buildBusquedaExtra(input1, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 3: Búsqueda por clave no existente en CALENDARIO_MAPSORT', () => {
    const input = ['telefono:123456789'];
    const expected = '';
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input2 = ['telefono:123456789', 'nombre:Pablo'];
    const expected2 = "LOWER(Calendario.Nombre) LIKE '%pablo%'";
    expect(buildBusquedaExtra(input2, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input1 = ['idplantilla:22'];
    const expected1 = '';
    expect(buildBusquedaExtra(input1, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 6: Valor con comillas simples (SQL escaping)', () => {
    const input = ["nombre:O'Reilly"];
    const expected = ``;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 7: Múltiples criterios combinados con AND', () => {
    const input = ['nombre:Juan', 'anio:>=2000'];
    const expected =
      `LOWER(Calendario.Nombre) LIKE '%juan%' AND Calendario.Anio >= 2000`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 8: Valor con espacios y caracteres especiales', () => {
    const input = ['nombre:Rojo & Azul'];
    const expected = `LOWER(Calendario.Nombre) LIKE '%rojo & azul%'`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 9: Entrada malformateada (doble ":")', () => {
    const input = ['nombre:Ana:Extra'];
    const expected = ``;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 10: Ignora entrada no válidas', () => {
    const input = [''];
    const expected = ``;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = [null];
    const expected1 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input1 as any[], CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

    const input2: string[] = [];
    const expected2 = ``;
    expect(buildBusquedaExtra(input2, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input3 = [undefined];
    const expected3 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input3 as any[], CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected3);

    const input4 = null;
    const expected4 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input4 as any, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected4);
  });

  test('Caso 11: Entrada general con espacios', () => {
    const input = ['  Luis García  '];
    const expected = `(LOWER(Calendario.Nombre) LIKE '%luis garcía%')`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 13: Detección básica de intento de inyección SQL (escapado)', () => {
    const input = [`nombre:' OR 1=1 --'`];
    const expected = '';
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 14: Búsqueda con clave en mayúsculas mezcladas', () => {
    const input = ['NOMBRE:Eva'];
    const expected = `LOWER(Calendario.Nombre) LIKE '%eva%'`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 15: Varias búsquedas generales seguidas', () => {
    const input = ['Carlos', 'Medina'];
    const expected =
      `(LOWER(Calendario.Nombre) LIKE '%carlos%') OR (LOWER(Calendario.Nombre) LIKE '%medina%')`;
    expect(buildBusquedaExtra(input, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = ['Carlos', ''];
    const expected1 =
      `(LOWER(Calendario.Nombre) LIKE '%carlos%')`;
    expect(buildBusquedaExtra(input1, CALENDARIO_MAPSORT, calendarioTextFields, CALENDARIO_VALID_FIELDS, CALENDARIO_NUMBER_AND_DATE_FIELDS)).toBe(expected1);
  });

});

