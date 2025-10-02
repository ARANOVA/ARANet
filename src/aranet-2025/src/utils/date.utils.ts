import { DateTime } from 'luxon';

export const toShortDate = (date: string | Date): string => {
  return DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_SHORT);
};

export const toISODate = (date: string | Date): string => {
  return DateTime.fromJSDate(new Date(date)).toISODate() || '';
};