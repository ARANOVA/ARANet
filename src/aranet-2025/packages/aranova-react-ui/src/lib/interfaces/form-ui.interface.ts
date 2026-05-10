import { FilterDTO, ItemDTO, SearchDTO } from ".";

interface ToastProps {
  title: string;
  subtitle?: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

export interface FormUi {
  user: any;
  setUser: (item: any | any[]) => void;
  selectedItem: any | any[];
  setSelectedItem: (item: any | any[]) => void;
  pageDataSelectedForm: number;
  setPageDataSelectedForm: (item: number) => void;
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
  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getSearchesForType: (type: string) => SearchDTO[];

  // Store selected items
  items: ItemDTO[];
  setItems: (items: ItemDTO[]) => void;
  resetItems: (type: string, items: ItemDTO[]) => void;
  getItems: (type: string) => ItemDTO[];
  getSelectedAll: (type: string) => boolean;
  setSelectedAll: (value: boolean, type: string) => void;

  // Store selected FilterField
  filters: FilterDTO[];
  setFilters: (FilterField: FilterDTO[]) => void;
  getFiltersByModel: (modeo: string) => FilterDTO[];

  // Export
  exportData?: Record<string, unknown>;
  setExportData?: (data: Record<string, unknown>) => void;

  //state
  state:number
  setState:(s:number) => void
}