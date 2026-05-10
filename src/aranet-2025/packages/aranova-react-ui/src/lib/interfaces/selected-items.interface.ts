import { SearchOperators } from ".";

export interface ItemDTO {
    type: string;
    id: string | number; 
}

export interface FilterDTO {
  type: string;
  field: string;
  title?: string;
  value: string | number | boolean | null;
  value_title?: string;
  operator: SearchOperators;
}

export interface SelectedItem {
  id: number | string;
  [key: string]: unknown;
}

export interface SearchDTO {
  type: string;
  field: string;
  title?: string;
  value: string | number | boolean | null;
  value_title?: string;
  operator: SearchOperators;
}

export interface IntFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export interface FloatFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number;
}

export interface DateTimeFilter {
  equals?: string | Date;
  not?: string | Date | null;
  in?: (string | Date)[];
  notIn?: (string | Date)[];
  lt?: string | Date;
  lte?: string | Date;
  gt?: string | Date;
  gte?: string | Date;
}

export interface StringFilter {
  equals?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  in?: string[];
  notIn?: string[];
  not?: string;
}

export interface WhereInput {
  AND?: WhereInput[];
  OR?: WhereInput[];
  NOT?: WhereInput[];
  id?: IntFilter;
  sent_at?: DateTimeFilter;
  item_invoice_id?: IntFilter;
  invoice_prefix?: StringFilter;
}
