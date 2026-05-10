import { FilterDTO, SearchDTO } from "./selected-items.interface";

export interface ListVariables {
  page?: number;
  size?: number;
  sortField?: string;
  sortDir?: 'asc' | 'desc';
  search?: SearchDTO[];
  filters?: FilterDTO[];
}