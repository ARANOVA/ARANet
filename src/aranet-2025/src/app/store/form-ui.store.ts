/* eslint-disable @typescript-eslint/no-explicit-any */
// store/useStore.ts
import { create } from 'zustand';

interface ToastProps {
  title: string;
  subtitle?: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

type Store = {
  user: any;
  setUser:  (item: any) => void;
  selectedItem: any;
  setSelectedItem: (item: any | any[]) => void;
  pageDataSelectedForm: number;
  setPageDataSelectedForm: (item:number) => void;
  openedDrawer: boolean;
  openedLeftDrawer: boolean;
  modeForm: 'show' | 'edit';
  setModeForm: (mode: 'show' | 'edit') => void;
  closeDrawer: () => void;
  openDrawer: (item: any | any[]) => void;
  closeLeftDrawer: () => void;
  openLeftDrawer: () => void;
  toastProps: ToastProps | null
  setToastProps: (props: ToastProps) => void;
  showedToast: boolean;
  showToast: (duration: number) => void;
  hideToast: () => void;
  // Alert
  openedAlert: boolean;
  openAlert: (item: any) => void;
  closeAlert: () => void;
  // Modal
  openedModal: boolean;
  openModal: () => void;
  closeModal: () => void;

  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Export
  exportData: Record<string, unknown>;
  setExportData: (data: Record<string, unknown>) => void;

  //state
  state:number
  setState:(s:number) => void
};

export const useFormUiStore = create<Store>((set) => ({
  user:{},
  setUser:  (item) => set({ user: item }),

  selectedItem: {},
  setSelectedItem: (item) => set({ selectedItem: item }),

  pageDataSelectedForm: 0,
  setPageDataSelectedForm: (item: number) => set({ pageDataSelectedForm: item }), // Added missing property

  openedDrawer: false,
  openedLeftDrawer: false,
  modeForm: 'edit',
  setModeForm: (mode: 'show' | 'edit') => {
    set({ modeForm: mode });
  },
  openDrawer: (item: any | any[]) => {
    set({ openedDrawer: true });
    set({ selectedItem: item });
  },
  closeDrawer: () => {
    set({ openedDrawer: false });
    set({ modeForm: 'edit' });
    //set({ pageDataSelectedForm:0});
 
  },
  openLeftDrawer: () => {
    set({ openedLeftDrawer: true });
  },
  closeLeftDrawer: () => {
    set({ openedLeftDrawer: false });
  },
  toastProps: null,
  setToastProps: (toastProps: ToastProps) => {
    set({ toastProps: toastProps });
  },
  showedToast: false,
  showToast: (duration: number) => {
    set({ showedToast: true });
    setTimeout(() => {
      set({ showedToast: false });
    }, duration)
  },
  hideToast: () => {
    set({ showedToast: false });
  },
  // Alert
  openedAlert: false,
  openAlert: (item: any) => {
    set({ selectedItem: item });
    set({ openedAlert: true });
  },
  closeAlert: () => {
    set({ openedAlert: false });
  },

  // Import (modal)
  openedModal: false,
  openModal: () => {
    set({ openedModal: true });
  },
  closeModal: () => {
    set({ openedModal: false });
  },

  // Searches
  searchTerm: '',
  setSearchTerm: (term: string) => {
    set({ searchTerm: term })
  },

  // Export
  exportData: {},
  setExportData: (data: Record<string, unknown>) => {
    set({ exportData: data});
  },

  state: 0,
  setState: (s:number) => { set({state: s})},

}));