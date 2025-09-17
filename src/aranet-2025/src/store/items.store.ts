import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ItemDTO{
  type: string;
  id: string | number; 
}

export type ItemsStore = {
  items: ItemDTO[];
  selectedAll: Record<string, boolean>;
  addItem: (id: string | number, type: string) => void;
  removeItem: (id: string | number, type: string) => void;
  setItems: (items: ItemDTO[]) => void;
  getItems: (type?: string) => ItemDTO[];
  resetItems: (type: string, items: ItemDTO[]) => void;
  getSelectedAll: (type: string) => boolean;
  setSelectedAll: (value: boolean, type: string) => void;
}

export const useItemsStore = create<ItemsStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedAll: {},

      addItem: (id, type) => {
        const currentItems = get().items;

        const exists = currentItems.find((item) => item.id === id && item.type === type);

        if (!exists) {
          set({ items: [...currentItems, {"type": type, "id": id}] });
        }
      },

      removeItem: (id, type) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter((item) => !(item.id === id && item.type === type));

        set({ items: updatedItems });
      },

      setItems: (newItems: ItemDTO[]) => {
        set({items: newItems});
      },

      resetItems: (type: string, items: ItemDTO[]) => {
        const cleanItems = get().items.filter((item) => type === undefined || item.type === type);
        set({items: [...cleanItems, ...items]});
      },

      getItems: (type?: string) => get().items.filter((item) => type === undefined || item.type === type),

      getSelectedAll: (type: string) => get().selectedAll[type],

      setSelectedAll: (value: boolean, type: string) => {
        const selectedAll = get().selectedAll;
        if (value) {
          selectedAll[type] = value;
        } else {
          delete selectedAll[type];
        }
        set({selectedAll});
      },

    }),
    {
      name: 'items-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);