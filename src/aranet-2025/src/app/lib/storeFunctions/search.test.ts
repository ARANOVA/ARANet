import { SearchDTO, FilterDTO, SearchOperators } from '@aranova/aranova-react-ui';
import { addSearch, dumpUrl, getSearchInputValue, removeSearch, setSearchInputValues, setSearches } from './search';

const PLANTILLA_NUMBER_AND_DATE_FIELDS = ['fechanacimiento', 'edad', 'codigoempleado'];

const filter1: FilterDTO = {
  type: "plantilla",
  title: "Buscar por activo",
  field: "activo",
  operator: SearchOperators.equals,
  value: true
};

const input1: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Fecha Nacimiento",
  field: "fechanacimiento",
  operator: SearchOperators.gte,
  value: "2020-01-01"
};


const input1b: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Fecha Nacimiento",
  field: "fechanacimiento",
  operator: SearchOperators['>='],
  value: "2020-01-01"
};

const input1c: SearchDTO = {
  type: "plantilla",
  title: "Buscar por nombre",
  field: "nombre",
  operator: SearchOperators.like,
  value: "pepe"
};

const input2: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Fecha Nacimiento",
  field: "fechanacimiento",
  operator: SearchOperators.lte,
  value: "2025-01-01"
};

const input3: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Fecha Nacimiento",
  field: "fechanacimiento",
  operator: SearchOperators.lte,
  value: "2030-01-01"
};

const buscaLikePorNombre: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Nombre",
  field: "Nombre",
  operator: SearchOperators.like,
  value: "pepe"
};

const buscaEqEnTodos: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Nombre",
  field: "all",
  operator: SearchOperators.equals,
  value: "pedro"
};

const buscaLikePorApellidos: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Apellidos",
  field: "Apellidos",
  operator: SearchOperators.like,
  value: "perez"
};

const buscaLikeEnTodos: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Nombre",
  field: "all",
  operator: SearchOperators.like,
  value: "pedro"
};

const input8: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Nombre",
  field: "Nombre",
  operator: SearchOperators.like,
  value: "carlos"
};


// search[]=Apellidos:=Sánchez
const input14: SearchDTO = {
  type: "plantilla",
  title: "Buscar por Apellidos",
  field: "Apellidos",
  operator: SearchOperators.equals,
  value: "Sánchez"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toLowerFiltername = (inputs: any[]) => {
  return inputs.map(input => {
    const input1Lowercase = JSON.parse(JSON.stringify(input));
    input1Lowercase.field = input1Lowercase.field.toLowerCase();
    return input1Lowercase
  });
}

describe('allSearchFunctions', () => {

  describe('addSearch', () => {

    test('Caso 1: Añadir a un array vacio', () => {
      const expected = [input1];
      expect(addSearch([], input1)).toStrictEqual(toLowerFiltername(expected));
      expect(addSearch([], input1b)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 1b: Añadir a un array con algo', () => {
      const expected = [input1, input2];
      expect(addSearch([input1], input2)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 1c: Añadir a un registro con nombre', () => {
      const expected = [input2, input1c];
      expect(addSearch([input2], input1c)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 2: Añadir a un array que ya existe', () => {
      const expected = [input1];
      expect(addSearch([input1], input1)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 3: Añadir a un array que ya existe el campo, pero añado uno nuevo con distinto valor', () => {
      const input1b = JSON.parse(JSON.stringify(input1));
      input1b.value = '2021-01-01';
      const expected = [input1b];
      expect(addSearch([input1], input1b)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 3b: Mismo caso 3, pero cambiando el orden', () => {
      const input1b = JSON.parse(JSON.stringify(input1));
      input1b.value = '2021-01-01';
      const expected = [input2, input1b];
      expect(addSearch([input1, input2], input1b)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 4: Añadir una 2ª condicion para un mismo campo', () => {
      const expected1 = [input1, input2];
      expect(addSearch([input1], input2)).toStrictEqual(toLowerFiltername(expected1));
    });

  });

  describe('removeSearch', () => {

    //casos eliminación
    test('Caso 1: eliminar a un array vacio', () => {
      const expected = [];
      expect(removeSearch([], input1)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 2: eliminar un search del array', () => {
      const expected = [input2];
      expect(removeSearch([input1, input2], input1)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 3: eliminar un array vacio', () => {
      const expected = [input2];
      expect(removeSearch([input2], [])).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 4: eliminar un search que no existe en el array', () => {
      const expected = [input2];
      expect(removeSearch([input2], input1)).toStrictEqual(toLowerFiltername(expected));
    });

    test('Caso 5: eliminar vacio de array vacio', () => {
      const expected = [];
      expect(removeSearch([], [])).toStrictEqual(expected);
    });

  });

  describe('setSearches', () => {
    //casos de actualización
    test('Caso 1: actualizar de un array vacio', () => {
      const expected = [input1];
      expect(setSearches([], [input1])).toEqual(toLowerFiltername(expected));
    });

    test('Caso 2: actualizar con un array vacio', () => {
      const expected = [input1];
      expect(setSearches([input1], [])).toEqual(toLowerFiltername(expected));
    });

    test('Caso 3: actualizar con otro array', () => {
      const expected = [input2, input1];
      expect(setSearches([input2], [input1])).toEqual(toLowerFiltername(expected));
    });

    test('Caso 3: actualizar con otro array igual pero otro valor', () => {
      const expected = [input3];
      expect(setSearches([input2], [input3])).toEqual(toLowerFiltername(expected));
    });

  });

  describe('dumpUrl', () => {

    test('Caso 1: CASOS INVÁLIDOS', () => {
      const input: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: ""
      };

      const expected = '';
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
      input.value = '   ';
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.value = null as any;
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.value = 'hola;';
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.field = '   ';
      input.value = 'hola';
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.operator = 'hola' as SearchOperators;
      expect(dumpUrl([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
    });


    test('Caso 2: casos básicos busqueda en todos', () => {
      let expected = 'search[]=pedro';
      expect(dumpUrl([buscaLikeEnTodos], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      expected = 'search[]==pedro';
      expect(dumpUrl([buscaEqEnTodos], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

    });

    test('Caso 3: casos básicos', () => {
      const expected = 'search[]=Nombre:pepe&search[]=Apellidos:perez';
      expect(dumpUrl([buscaLikePorNombre, buscaLikePorApellidos], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

    });

    test('Caso 3: crear url valores del mismo campo + valores de campo all + valores de un solo campo ', () => {
      const input7 = JSON.parse(JSON.stringify(buscaLikePorNombre));
      input7.value = 'carlos';
      const expected = 'search[]=Nombre:carlos,pepe&search[]=pedro&search[]=Apellidos:perez';
      expect(dumpUrl([input7, buscaLikePorNombre, buscaLikeEnTodos, buscaLikePorApellidos], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
    });



    test('Caso 5: crear url con campo vacio + campo ', () => {
      const input8: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: "carlos"
      };
      const input9: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: ""
      };
      const expected = 'search[]=Nombre:carlos';
      expect(dumpUrl([input8, input9], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
    });

    test('Caso 7: operador inválido', () => {
      const input11: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        operator: "all" as SearchOperators,
        field: "   Nombre   ",
        value: "CARLOS "
      };
      const expected = '';
      expect(dumpUrl([input11], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
    });

    test('Caso 8: mismo campo con espacios, distintos operadores (debe combinar igual)', () => {
      const inputModified: SearchDTO = {
        ...input8,
        field: "   Nombre  ",
        operator: SearchOperators.like,
        value: "laura"
      };

      const result = dumpUrl([input8, inputModified], PLANTILLA_NUMBER_AND_DATE_FIELDS);
      expect(result).toBe('search[]=Nombre:carlos,laura');
    });

    test('Caso 9: nombres con acento (UTF-8 seguro)', () => {
      const result = dumpUrl([input14], PLANTILLA_NUMBER_AND_DATE_FIELDS);
      expect(result).toBe('search[]=Apellidos:=Sánchez');
    });

    test('Caso 10: input sin operador → inválido', () => {
      const broken: SearchDTO = {
        type: "plantilla",
        title: "Sin operador",
        field: "Nombre",
        operator: "all" as SearchOperators,
        value: "ana"
      };

      const result = dumpUrl([broken], PLANTILLA_NUMBER_AND_DATE_FIELDS);
      expect(result).toBe(''); // No debería incluirse porque no tiene operador válido
    });

    test('Caso 11: mezcla de búsquedas globales y campos específicos', () => {
      const input8: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: "carlos"
      };
      const input12: SearchDTO = {
        type: "plantilla",
        title: "Buscar en todo",
        field: "all",
        operator: SearchOperators.like,
        value: "libro"
      };

      const input13: SearchDTO = {
        type: "plantilla",
        title: "Buscar en todo",
        field: "all",
        operator: SearchOperators.like,
        value: "documento, informe"
      };
      let result = dumpUrl([input8, input12, input13,], PLANTILLA_NUMBER_AND_DATE_FIELDS);
      expect(result).toBe('search[]=Nombre:carlos&search[]=libro');

      input13.value = 'documento';

      result = dumpUrl([input8, input12, input13,], PLANTILLA_NUMBER_AND_DATE_FIELDS);
      expect(result).toBe('search[]=Nombre:carlos&search[]=libro,documento');
    });

    test('Caso 12: incluir SearchDTO y FilterDTO', () => {
      const input8: SearchDTO = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: "carlos"
      };
      const filter1: FilterDTO = {
        type: "plantilla",
        title: "Buscar por activo",
        field: "activo",
        operator: SearchOperators.equals,
        value: true
      };
      const input12: SearchDTO = {
        type: "plantilla",
        title: "Buscar en todo",
        field: "all",
        operator: SearchOperators.like,
        value: "libro"
      };
      let result = dumpUrl([input8], [], [filter1]);
      expect(result).toBe('search[]=Nombre:carlos&search[]=activo:=true');

      result = dumpUrl([input8, input12], [], [filter1]);
      expect(result).toBe('search[]=Nombre:carlos&search[]=libro&search[]=activo:=true');
    });

  });

  describe('getSearchInputValue', () => {
    test('Caso 1: CASOS INVÁLIDOS', () => {
      const input = {
        type: "plantilla",
        title: "Buscar por Nombre",
        field: "Nombre",
        operator: SearchOperators.like,
        value: ""
      };

      const expected = '';
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
      input.value = '   ';
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.value = null as any;
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.value = 'hola;';
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.field = '   ';
      input.value = 'hola';
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);

      input.operator = 'hola' as SearchOperators;
      expect(getSearchInputValue([input], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);
    });

    test('Caso 2: Búsqueda global', () => {
      const input1 = {
        type: "plantilla",
        title: "Buscar empleado...",
        field: "all",
        operator: SearchOperators.like,
        value: "pablo"
      };

      const expected = 'pablo';
      expect(getSearchInputValue([input1], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);


      const input2 = {
        type: "plantilla",
        title: "Buscar empleado...",
        field: "all",
        operator: SearchOperators.like,
        value: "juan"
      };

      const expected1 = 'pablo,juan';
      expect(getSearchInputValue([input1, input2], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected1);
    });

    test('Caso 3: Búsqueda por varios criterios', () => {
      const input1 = {
        type: "plantilla",
        title: "Buscar empleado...",
        field: "nombre",
        operator: SearchOperators.like,
        value: "pablo"
      };

      const expected = 'nombre:pablo';
      expect(getSearchInputValue([input1], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected);


      const input2 = {
        type: "plantilla",
        title: "Buscar empleado...",
        field: "Apellidos",
        operator: SearchOperators.like,
        value: "juan"
      };

      const expected1 = 'nombre:pablo; Apellidos:juan';
      expect(getSearchInputValue([input1, input2], PLANTILLA_NUMBER_AND_DATE_FIELDS)).toEqual(expected1);
    });

  });

  describe('setSearchInputValue', () => {

    test('Caso 1: mandar una busqueda', () => {

      const expected = [
        {

          field: 'nombre',
          operator: 'like',
          type: 'plantilla',
          value: 'ainara',
        },
        {

          field: 'apellidos',
          operator: 'like',
          type: 'plantilla',
          value: 'rodilla',
        }
      ];
      expect(setSearchInputValues('plantilla', 'nombre:ainara; apellidos:rodilla')).toEqual(expected);

    });

    // controlar las minusculas
    test('Caso 2: mandar una busqueda controlar las minusculas de los campos', () => {

      const expected = [
        {

          field: 'nombre',
          operator: 'like',
          type: 'plantilla',
          value: 'ainara',
        },
        {

          field: 'apellidos',
          operator: 'like',
          type: 'plantilla',
          value: 'rodilla',
        }
      ];
      expect(setSearchInputValues('plantilla', 'NOmbre:ainara; Apellidos:rodilla')).toEqual(expected);

    });

    test('Caso 3: mandar varias busquedas de un solo campo', () => {

      const expected = [
        {

          field: 'nombre',
          operator: 'like',
          type: 'plantilla',
          value: 'ainara',
        },
        {

          field: 'apellidos',
          operator: 'like',
          type: 'plantilla',
          value: 'rodilla',
        }
      ];
      expect(setSearchInputValues('plantilla', 'nombre:ainara,pepe; apellidos:rodilla,alvarez')).toEqual(expected);

    });

    test('Caso 4: mandar un value vacio', () => {

      const expected = [
        {

          field: 'apellidos',
          operator: 'like',
          type: 'plantilla',
          value: 'rodilla',
        }
      ];
      expect(setSearchInputValues('plantilla', 'nombre: ; apellidos:rodilla,alvarez')).toEqual(expected);

    });

    test('Caso 5: mandar un value sin campo', () => {

      const expected = [
        {

          field: 'all',
          operator: 'like',
          type: 'plantilla',
          value: 'rodilla',
        }
      ];
      expect(setSearchInputValues('plantilla', 'rodilla')).toEqual(expected);

    });

    //falta controlar caracteres extraños como las comillas
    // por posible inyección SQL
    test('Caso 6: mandar un value con comas caracteres extraños', () => {

      const expected = [];
      expect(setSearchInputValues('plantilla', "apellidos: r.odílla' ")).toEqual(expected);

    });

  });



});