import { buildBusquedaExtra } from '../../busquedaExtra';
import { Filters, SearchOperators } from '../../../../../interfaces';

const plantillaTextFields = [
  'Plantilla.Nombre',
  'Plantilla.Apellidos',
  'Equipo.Nombre',
  'Plantilla.NIF'
];

const PLANTILLA_MAPSORT: Record<string, string | null> = {
  // 'tipoplantilla': 'plantilla.tipoplantilla',
  'nombre': 'Plantilla.Nombre',
  'apellidos': 'Plantilla.Apellidos',
  'nombreequipo': 'Equipo.Nombre',
  'edad': 'Plantilla.FechaNacimiento',
  // 'codigoempleado': 'plantilla.codigoempleado',
  // 'nif': 'plantilla.nif',
  // 'sexo': 'plantilla.sexo',
  // 'activo': 'equipo.activo',
  'turno': 'plantilla.turno',
  // 'reduccionjornada': 'plantilla.reduccionjornada',
  // 'reduccionguardalegal': 'plantilla.reduccionguardalegal',
  // 'fechanacimiento': 'plantilla.fechanacimiento',
};


const TURNOS = {
  0: "Sin turno",
  1: "Mañana",
  2: "Tarde",
  3: "Noche",
  4: "Cuarto Turno",
  5: "Central"
};

const turnos = Object.entries(TURNOS).map(([value, label]) => ({
  value,
  label,
}));

export const plantillaFilters: Filters[] = [
    {
      fieldName: 'Nombre',
      label: 'Buscar por Nombre',
      type: 'search',
      operator: SearchOperators.like,
    },
    {
      fieldName: 'Apellidos',
      label: 'Buscar por Apellidos',
      type: 'search',
      operator: SearchOperators.like
    },
    {
      fieldName: 'NombreEquipo',
      label: 'Buscar por Equipo',
      type: 'search',
      operator: SearchOperators.like
    },
    {
      fieldName: 'Nif',
      label: 'Buscar por NIF',
      type: 'search',
      operator: SearchOperators.like
    },
    {
      fieldName: 'CodigoEmpleado',
      label: 'Buscar por Numero de Empleado',
      type: 'search',
      operator: SearchOperators.like
    },
    {
      fieldName: 'Edad',
      label: 'Buscar por Edad',
      type: 'search',
      operator: SearchOperators.like
    },
     {
      fieldName: 'FechaNacimiento',
      label: 'Buscar por fecha de nacimiento',
      operator: SearchOperators.like,
      children: [
        {
          label: 'Buscar por fecha >= de nacimiento',
          type: 'date',
          operator: SearchOperators.gte
        },
        {
          label: 'Buscar por fecha <= de nacimiento',
          type: 'date',
          operator: SearchOperators.lte
        },
      
    //     // {
    //     //   label: 'Buscar por Año = de nacimiento',
    //     //   type: 'equal',
    //     // }
      ]
    },
    
    {
      fieldName: 'Turno',
      label: 'Turnos',
      operator: SearchOperators.equals,
      options: turnos
    },
   
    {
      fieldName: 'TipoPlantilla',
      label: 'Indefinido',
      operator: SearchOperators.equals,
      options: [
        { value: 1, label: 'Sí' },
        { value: 2, label: 'No' },
      ],
    },
    {
      fieldName: 'ReduccionJornada',
      label: 'Reducción',
      operator: SearchOperators.equals,
      options: [
        { value: 1, label: 'Sí' },
        { value: 0, label: 'No' },
      ],
    },
    {
      fieldName: 'ReduccionGuardaLegal',
      label: 'Guarda legal',
      operator: SearchOperators.equals,
      options: [
        { value: 1, label: 'Sí' },
        { value: 0, label: 'No' },
      ],
    },
    {
      fieldName: 'Sexo',
      label: 'Sexo',
      operator: SearchOperators.equals,
      options: [
        { value: 1, label: 'Varón' },
        { value: 2, label: 'Mujer' },
      ],
    },
  ];

const PLANTILLA_VALID_FIELDS = plantillaFilters
  .map(f => f.fieldName.toLowerCase());

const PLANTILLA_NUMBER_AND_DATE_FIELDS = ['fechanacimiento', 'edad', 'codigoempleado'];

describe('buildBusquedaExtra - tests elaborados', () => {

  test('Caso 1: Búsqueda general simple', () => {
    const input = ['Ana'];
    const expected =
      `(LOWER(Plantilla.Nombre) LIKE '%ana%' OR LOWER(Plantilla.Apellidos) LIKE '%ana%' OR LOWER(Equipo.Nombre) LIKE '%ana%' OR LOWER(Plantilla.NIF) LIKE '%ana%')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = ['Ana,Carlos'];
    const expected1 =
      `(LOWER(Plantilla.Nombre) LIKE '%ana%' OR LOWER(Plantilla.Nombre) LIKE '%carlos%' OR ` +
      `LOWER(Plantilla.Apellidos) LIKE '%ana%' OR LOWER(Plantilla.Apellidos) LIKE '%carlos%' OR ` +
      `LOWER(Equipo.Nombre) LIKE '%ana%' OR LOWER(Equipo.Nombre) LIKE '%carlos%' OR ` +
      `LOWER(Plantilla.NIF) LIKE '%ana%' OR LOWER(Plantilla.NIF) LIKE '%carlos%')`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);
  });

  test('Caso 1b: Búsqueda general exacta', () => {
    const input = ['=Ana'];
    const expected =
      `(LOWER(Plantilla.Nombre) = 'ana' OR LOWER(Plantilla.Apellidos) = 'ana' OR LOWER(Equipo.Nombre) = 'ana' OR LOWER(Plantilla.NIF) = 'ana')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2: Búsqueda específica por campo mapeado', () => {
    const input = ['nombre:Carlos'];
    const expected = `LOWER(Plantilla.Nombre) LIKE '%carlos%'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });


  test('Caso 2c: Búsqueda específica por campo mapeado y or', () => {
    const input = ['nombre:Carlos,Pepe'];
    const expected = `(LOWER(Plantilla.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.Nombre) LIKE '%pepe%')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });
    test('Caso 2d: Búsqueda específica por campo mapeado y or', () => {
    const input1 = ['nombre:Carlos,=Pepe'];
    const expected1 = `(LOWER(Plantilla.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.Nombre) = 'pepe')`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 2e: Búsqueda específica por campo mapeado y or', () => {
    const input = ['fechanacimiento:>=2025-05-27,<=2025-06-13'];
    const expected = `(fechanacimiento >= '2025-05-27' OR fechanacimiento <= '2025-06-13')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2f: Búsqueda específica por campo mapeado y and', () => {
    const input = ['fechanacimiento:>=2025-05-27', 'fechanacimiento:<=2025-06-13'];
    const expected = `fechanacimiento >= '2025-05-27' AND fechanacimiento <= '2025-06-13'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 2g: Búsqueda exacta por campo mapeado', () => {
    const input = ['nombre:=Carlos'];
    const expected = `LOWER(Plantilla.Nombre) = 'carlos'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    // const input1 = ['FechaAlta:=2013-07-23'];
    // const expected1 = `LOWER(FechaAlta) = 'carlos'`;
    // expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

  });

  test('Caso 2h: Búsqueda exacta por campo mapeado numérico', () => {
    const input1 = ['codigoempleado:=111111'];
    const expected1 = `codigoempleado = 111111`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 3: Búsqueda por clave no existente en PLANTILLA_MAPSORT', () => {
    const input = ['telefono:123456789'];
    const expected = '';
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input2 = ['telefono:123456789', 'nombre:Pablo'];
    const expected2 = "LOWER(Plantilla.Nombre) LIKE '%pablo%'";
    expect(buildBusquedaExtra(input2, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input1 = ['idplantilla:22'];
    const expected1 = '';
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

  });

  test('Caso 4: Búsqueda por edad numérica', () => {
    const input = ['edad:35'];
    const expected = `DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) = 35`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input2 = ['edad:>35'];
    const expected2 = `DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) > 35`;
    expect(buildBusquedaExtra(input2, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input3 = ['edad:>=35'];
    const expected3 = `DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) >= 35`;
    expect(buildBusquedaExtra(input3, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected3);

    // search[]=edad:>=52&search[]=edad:<=65
    const input4 = ['edad:>=52', 'edad:<=65'];
    const expected4 = `DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) >= 52 AND DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) <= 65`;
    expect(buildBusquedaExtra(input4, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected4);

    const input5 = ['edad:     >=    52     '];
    const expected5 = `DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) >= 52`;
    expect(buildBusquedaExtra(input5, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected5);

    const input6 = ['edad:     >=    52a     '];
    const expected6 = ``;
    expect(buildBusquedaExtra(input6, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected6);

  });

  test('Caso 5: Búsqueda por edad no numérica', () => {
    const input = ['edad:treinta'];
    const expected = ``;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 6: Valor con comillas simples (SQL escaping)', () => {
    const input = ["nombre:O'Reilly"];
    const expected = ``;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 7: Múltiples criterios combinados con AND', () => {
    const input = ['nombre:Juan', 'edad:30', 'nombreequipo:Azul'];
    const expected =
      `LOWER(Plantilla.Nombre) LIKE '%juan%' AND DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) = 30 AND LOWER(Equipo.Nombre) LIKE '%azul%'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = ['nombre:Juan', 'edad:30', 'NombreEquipo:Azul'];
    const expected1 =
      `LOWER(Plantilla.Nombre) LIKE '%juan%' AND DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) = 30 AND LOWER(Equipo.Nombre) LIKE '%azul%'`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

    const input2 = ['nombre:Juan', 'edad:30', '    NombreEquipo    :Azul'];
    const expected2 =
      `LOWER(Plantilla.Nombre) LIKE '%juan%' AND DATEDIFF(YEAR, Plantilla.FechaNacimiento, GETDATE()) = 30 AND LOWER(Equipo.Nombre) LIKE '%azul%'`;
    expect(buildBusquedaExtra(input2, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected2);
  });

  test('Caso 8: Valor con espacios y caracteres especiales', () => {
    const input = ['nombreequipo:Rojo & Azul'];
    const expected = `LOWER(Equipo.Nombre) LIKE '%rojo & azul%'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 9: Entrada malformateada (doble ":")', () => {
    const input = ['nombre:Ana:Extra'];
    const expected = ``;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 10: Ignora entrada no válidas', () => {
    const input = [''];
    const expected = ``;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = [null];
    const expected1 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input1 as any[], PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);

    const input2: string[] = [];
    const expected2 = ``;
    expect(buildBusquedaExtra(input2, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input3 = [undefined];
    const expected3 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input3 as any[], PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected3);

    const input4 = null;
    const expected4 = ``;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(buildBusquedaExtra(input4 as any, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected4);
  });

  test('Caso 11: Entrada general con espacios', () => {
    const input = ['  Luis García  '];
    const expected = `(LOWER(Plantilla.Nombre) LIKE '%luis garcía%' OR LOWER(Plantilla.Apellidos) LIKE '%luis garcía%' OR LOWER(Equipo.Nombre) LIKE '%luis garcía%' OR LOWER(Plantilla.NIF) LIKE '%luis garcía%')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 13: Detección básica de intento de inyección SQL (escapado)', () => {
    const input = [`nombre:' OR 1=1 --'`];
    const expected = '';
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 14: Búsqueda con clave en mayúsculas mezcladas', () => {
    const input = ['NOMBRE:Eva'];
    const expected = `LOWER(Plantilla.Nombre) LIKE '%eva%'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);
  });

  test('Caso 15: Varias búsquedas generales seguidas', () => {
    const input = ['Carlos', 'Medina'];
    const expected =
      `(LOWER(Plantilla.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.Apellidos) LIKE '%carlos%' OR LOWER(Equipo.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.NIF) LIKE '%carlos%') OR ` +
      `(LOWER(Plantilla.Nombre) LIKE '%medina%' OR LOWER(Plantilla.Apellidos) LIKE '%medina%' OR LOWER(Equipo.Nombre) LIKE '%medina%' OR LOWER(Plantilla.NIF) LIKE '%medina%')`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input1 = ['Carlos', ''];
    const expected1 =
      `(LOWER(Plantilla.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.Apellidos) LIKE '%carlos%' OR LOWER(Equipo.Nombre) LIKE '%carlos%' OR LOWER(Plantilla.NIF) LIKE '%carlos%')`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);
  });


  test('Caso 16: Búsqueda de fechas', () => {
    const input = ['FechaNacimiento:>2020-01-01'];
    const expected = `fechanacimiento > '2020-01-01'`;
    expect(buildBusquedaExtra(input, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected);

    const input2 = ['FechaNacimiento:=2020-01-01'];
    const expected2 = `fechanacimiento = '2020-01-01'`;
    expect(buildBusquedaExtra(input2, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected2);

    const input1 = ['FechaNacimiento:>2020-01-01', 'FechaNacimiento:<=2025-10-01'];
    const expected1 = `fechanacimiento > '2020-01-01' AND fechanacimiento <= '2025-10-01'`;
    expect(buildBusquedaExtra(input1, PLANTILLA_MAPSORT, plantillaTextFields, PLANTILLA_VALID_FIELDS, PLANTILLA_NUMBER_AND_DATE_FIELDS)).toBe(expected1);
  });
});

