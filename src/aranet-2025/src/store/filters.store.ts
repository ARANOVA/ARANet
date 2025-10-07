import { FilterDTO } from '@aranova/aranova-react-ui';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type FiltersStore = {
  filters: FilterDTO[];
  addFilter: (filter: FilterDTO) => void;
  removeFilter: (filter: FilterDTO) => void;
  setFilters: (filters: FilterDTO[]) => void;
  getFilters: () => FilterDTO[];
  setFiltersByModel: (model: string, filters: FilterDTO[]) => void;
  getFiltersByModel: (model: string) => FilterDTO[];
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => ({
      filters: [],

      addFilter: ({ type, title, value_title, value, field, operator }: FilterDTO ) => {
        const currentFilters = get().filters;

        const exists = currentFilters.find(
          (filter) => filter.value === value && filter.field === field && filter.type === type
        );

        if (!exists) {
          const newFilter: FilterDTO = {
            type,
            title,
            value_title,
            field,
            value,
            operator,
          };

          set({ filters: [...currentFilters, newFilter] });
        }
      },

      removeFilter: ({ type, title, value_title, value, field }: FilterDTO) => {
        const currentFilters = get().filters;
        const updatedFilters = currentFilters.filter(
          (filter) =>
            !(filter.type === type && filter.title === title, filter.value_title === value_title && filter.value === value && filter.field === field)
        );

        set({ filters: updatedFilters });
      },

      setFilters: (newFilters: FilterDTO[]) => {
        set({ filters: newFilters });
      },

      getFilters: () => get().filters,

      setFiltersByModel: (model: string, filters: FilterDTO[]) => {
        const currentFilters = get().filters;
        const filtered = currentFilters.filter(f => f.type !== model);
        set({ filters: [...filtered, ...filters] });
      },

      getFiltersByModel: (model: string) => get().filters.filter(f => f.type === model),
    }),
    {
      name: 'filters-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
