import { ColumnMeta } from "@tanstack/react-table";
import clsx from "clsx";

interface AranovaColumnMeta {
  className?: string;
  cellClass?: string;
  headerClass?: string;
  footerClass?: string;
}

const noOverflow = 'overflow-hidden whitespace-nowrap text-ellipsis';
const noSpacing = '!pl-0 !pr-0 !mr-0 !ml-0';
const flexCenter = "mx-auto !pr-0 !pl-0 !px-0";
const validWidths: Record<number, string> = {
  60: 'min-w-[60px] max-w-[60px] w-[60px]',
  110: 'min-w-[110px] max-w-[110px] w-[110px]',
  130: 'min-w-[130px] max-w-[130px] w-[130px]',
  170: 'min-w-[170px] max-w-[170px] w-[170px]',
  240: 'min-w-[240px] max-w-[240px] w-[240px]'
} as const;

const amountMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-right", noSpacing, noOverflow, validWidths[w]),
  headerClass: clsx("text-center", noSpacing, noOverflow, validWidths[w]),
  footerClass: clsx("text-right", noSpacing, validWidths[w])
});

const dateMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-center", noOverflow, validWidths[130]),
  headerClass: clsx("text-center", noOverflow, validWidths[130]),
});

const textMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-left", noOverflow, validWidths[w]),
  headerClass: clsx("text-left", noOverflow, validWidths[w]),
});

const checkMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-center", flexCenter, noOverflow, validWidths[w]),
  headerClass: clsx("text-center", flexCenter, noOverflow, validWidths[w]),
});

export const tableLinkClassname = "flex items-center gap-1 text-sm font-normal text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-500";

export const amountMeta130 = amountMeta(130);
export const amountMeta60 = amountMeta(60);
export const amountMeta110 = amountMeta(110);
export const dateCenterMeta130 = dateMeta(130);
export const textLeftMeta130 = textMeta(130);
export const textLeftMeta170 = textMeta(170);
export const textLeftMeta240 = textMeta(240);
export const checkCenterMeta60 = checkMeta(60)