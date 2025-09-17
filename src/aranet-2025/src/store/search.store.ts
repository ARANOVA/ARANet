import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SearchDTO, SearchOperators } from '@aranova/aranova-react-ui';
import { addSearch, dumpUrl, getSearchInputValue, removeSearch, setSearchInputValues } from '@/app/lib/storeFunctions';

export type SearchStore = {
  searches: SearchDTO[];
  addSearch: (search: SearchDTO) => void;
  removeSearch: (search: SearchDTO) => void;
  setSearches: (filters: SearchDTO[]) => void;
  getSearches: () => SearchDTO[];
  getSearchesForType: (type: string) => SearchDTO[];
  getSearchInputValue: (type: string, andFields?: string[]) => string;
  setSearchInputValue: (type: string, searchTerm: string, andFields?: string[]) => string;
  dumpUrl: (type: string, andFields?: string[]) => string;
  getValueForTypeFieldAndOperator(type: string, field: string, operator: SearchOperators): string | number | boolean | null;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({

      //Busquedas actuales
      searches: [],

      // Añadir una nueva búsqueda
      addSearch: (search: SearchDTO) => {
        const prevSearches = get().searches;
        set({ searches: addSearch(prevSearches, search) });
      },

      // Eliminar una búsqueda existente
      removeSearch: (search: SearchDTO) => {
        set({ searches: removeSearch(get().searches, search) });
      },
      // Setear las busquedas
      setSearches: (newSearched: SearchDTO[]) => {
        set({ searches: newSearched });
      },
      // Obtener las busquedas actuales
      getSearches: () => get().searches,

      // Obtener las busquedas actuales para un tipo
      getSearchesForType: (type: string) => get().searches.filter((search) => search.type === type),

      // Obtener el valor de búsqueda para un tipo específico
      getSearchInputValue: (type: string, andFields: string[] = []): string => {
        const filtered = get().searches.filter((search) => search.type === type);
        return getSearchInputValue(filtered, andFields);
      },

      // Establecer el valor de búsqueda para un tipo específico
      setSearchInputValue: (type: string, searchTerm: string, andFields: string[] = []) => {

        if (!searchTerm) {
          get().setSearches([]);
          return get().dumpUrl(type, andFields);
        }

        const others = get().searches.filter((s) => s.type !== type);
        const parsed = setSearchInputValues(type, searchTerm);

        if (parsed.length > 0) {
          set({ searches: [...others, ...parsed] });
        } else {
          set({ searches: others });
        }

        return get().dumpUrl(type, andFields);
      },


      // Generar la URL de búsqueda para un tipo específico
      dumpUrl: (type: string, andFields: string[] = []) => {
        const filtered = get().searches.filter((search) => search.type === type);
        return dumpUrl(filtered, andFields);
      },

      // Obtener el valor de búsqueda para un tipo, campo y operador específicos
      getValueForTypeFieldAndOperator: (type: string, field: string, operator: SearchOperators) => {
        const searches = get().searches;
        const match = searches.find(
          (search) => search.type === type && search.field === field && search.operator === operator);
        return match ? match.value : null;
      },

    }),
    {
      name: 'searches-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
