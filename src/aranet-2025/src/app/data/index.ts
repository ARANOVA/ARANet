import { BUDGET_TEXT_FIELDS, BUDGET_VALID_FIELDS } from "./budget";
import { CASH_TEXT_FIELDS, CASH_VALID_FIELDS } from "./cash";
import { CLIENT_TEXT_FIELDS, CLIENT_VALID_FIELDS } from "./client";
import { CONTACT_TEXT_FIELDS, CONTACT_VALID_FIELDS } from "./contact";
import { EXPENSE_TEXT_FIELDS, EXPENSE_VALID_FIELDS } from "./expense";
import { INCOME_TEXT_FIELDS, INCOME_VALID_FIELDS } from "./income";
import { INVOICE_TEXT_FIELDS, INVOICE_VALID_FIELDS } from "./invoice";
import { PROJECT_TEXT_FIELDS, PROJECT_VALID_FIELDS } from "./project";
import { USER_TEXT_FIELDS, USER_VALID_FIELDS } from "./user";
import { VENDOR_TEXT_FIELDS, VENDOR_VALID_FIELDS } from "./vendor";

export type enumListModel =
  'client' |
  'vendor' |
  'expense' |
  'income' |
  'invoice' |
  'contact' |
  'project' |
  'timesheet' |
  'budget' |
  'cash' |
  'user'
;

export const getTextFields = (model: enumListModel): string[] => {
  switch (model) {
    case 'client':
      return CLIENT_TEXT_FIELDS;
    case 'budget':
      return BUDGET_TEXT_FIELDS;
    case 'expense':
      return EXPENSE_TEXT_FIELDS;
    case 'income':
      return INCOME_TEXT_FIELDS;
    case 'contact':
      return CONTACT_TEXT_FIELDS;
    case 'project':
      return PROJECT_TEXT_FIELDS;
    case 'vendor':
      return VENDOR_TEXT_FIELDS;
    case 'cash':
      return CASH_TEXT_FIELDS;
    case 'invoice':
      return INVOICE_TEXT_FIELDS;
    case 'user':
      return USER_TEXT_FIELDS;
    // case 'timesheet':
    //   return TIMES
  }
  return [];
}


export const getValidFields = (model: enumListModel): string[] => {
  switch (model) {
    case 'client':
      return CLIENT_VALID_FIELDS;
    case 'budget':
      return BUDGET_VALID_FIELDS;
    case 'expense':
      return EXPENSE_VALID_FIELDS;
    case 'income':
      return INCOME_VALID_FIELDS;
    case 'contact':
      return CONTACT_VALID_FIELDS;
    case 'project':
      return PROJECT_VALID_FIELDS;
    case 'vendor':
      return VENDOR_VALID_FIELDS;
    case 'cash':
      return CASH_VALID_FIELDS;
    case 'invoice':
      return INVOICE_VALID_FIELDS;
    case 'user':
      return USER_VALID_FIELDS;
    // case 'timesheet':
    //   return TIMES
  }
  return [];
}