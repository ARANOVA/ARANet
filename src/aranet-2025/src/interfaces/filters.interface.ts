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