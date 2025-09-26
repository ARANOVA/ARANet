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

const maxWidth = (w: number) => `min-w-[${w}px] max-w-[${w}px] w-[${w}px]`;

const amountMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-right", noSpacing, noOverflow, maxWidth(w)),
  headerClass: clsx("text-center", noSpacing, noOverflow, maxWidth(w)),
  footerClass: clsx("text-right", noSpacing, maxWidth(w))
});

const dateMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-center", noOverflow, maxWidth(130)),
  headerClass: clsx("text-center", noOverflow, maxWidth(130)),
});

const textMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-left", noOverflow, maxWidth(w)),
  headerClass: clsx("text-left", noOverflow, maxWidth(w)),
});

const checkMeta = (w: number): ColumnMeta<AranovaColumnMeta, unknown> | undefined => ({
  cellClass: clsx("text-center", flexCenter, noOverflow, maxWidth(w)),
  headerClass: clsx("text-center", flexCenter, noOverflow, maxWidth(w)),
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