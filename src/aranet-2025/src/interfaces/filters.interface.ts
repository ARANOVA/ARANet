import { SearchOperators } from "@aranova/aranova-react-ui";

type inputType = 'search' | 'select' | 'checkbox' | 'greater' | 'gte' | 'less' | 'lte' | 'equal';

export interface Filters {

  fieldName: string;
  label: string;
  value?: string | number | boolean | null;
  operator: SearchOperators;
  options?: {
    value: string | number | boolean | null;
    label: string;
  }[];
  children?: {
    label: string;
    type?: 'number' | 'date' | 'datetime' | 'time';
    operator: SearchOperators;
    value?: string | number | boolean | null;
  }[];
  type?: inputType;
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
  not?: string | Date;
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
}
