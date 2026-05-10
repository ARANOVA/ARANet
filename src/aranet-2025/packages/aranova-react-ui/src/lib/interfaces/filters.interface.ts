import { SearchOperators } from "./search.enum";

type inputType = 'search' | 'select' | 'checkbox' | 'greater' | 'gte' | 'less' | 'lte' | 'equal';

export interface FilterChild {
  label: string;
  type?: 'number' | 'date' | 'datetime' | 'time';
  operator: SearchOperators;
  value?: string | number | boolean | null;
};

export interface FilterField {
  fieldName: string;
  fieldTitle: string;
  label: string;
  value?: string | number | boolean | null;
  operator: SearchOperators;
  options?: {
    value: string | number | boolean | null;
    label: string;
  }[];
  children?: FilterChild[];
  type?: inputType;
};
