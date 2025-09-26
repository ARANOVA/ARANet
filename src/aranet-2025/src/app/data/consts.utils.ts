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

export const amountMeta130 = amountMeta(130);
export const amountMeta60 = amountMeta(60);
export const amountMeta110 = amountMeta(110);
export const dateCenterMeta130 = dateMeta(130);

export const textLeftMeta170: ColumnMeta<AranovaColumnMeta, unknown> | undefined = {
  className: clsx("text-left", noOverflow, maxWidth(170)),
};