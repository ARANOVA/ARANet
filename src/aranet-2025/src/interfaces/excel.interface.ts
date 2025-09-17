export interface XlsCell {
  value: unknown;
  formatCode?: string;
}

export interface XlsDoc {
  worksheets: {
    name: string;
    data: XlsCell[],
  }[];
}

export interface ExportData {
  file: string;
  remove?: boolean;
  filename: string;
}

export interface ImportData {
  background: boolean;
  total: number;
  failed: number;
  succeded: number;
}

/** Duplicate node-xlsx interface */
export interface DBFField {
    /** Original Field Name */
    name?: string;

    /** Field Type */
    type?: string;

    /** Field Length */
    len?: number;

    /** Field Decimal Count */
    dec?: number;
}

export interface ColInfo {
    /* --- visibility --- */

    /** if true, the column is hidden */
    hidden?: boolean;

    /* --- column width --- */

    /** width in Excel's "Max Digit Width", width*256 is integral */
    width?: number;

    /** width in screen pixels */
    wpx?: number;

    /** width in "characters" */
    wch?: number;

    /** outline / group level */
    level?: number;

    /** Excel's "Max Digit Width" unit, always integral */
    MDW?: number;

    /** DBF Field Header */
    DBF?: DBFField;
}

/** Row Properties Object */
export interface RowInfo {
    /* --- visibility --- */

    /** if true, the column is hidden */
    hidden?: boolean;

    /* --- row height --- */

    /** height in screen pixels */
    hpx?: number;

    /** height in points */
    hpt?: number;

    /** outline / group level */
    level?: number;
}

/**
 * Write sheet protection properties.
 */
export interface ProtectInfo {
    /**
     * The password for formats that support password-protected sheets
     * (XLSX/XLSB/XLS). The writer uses the XOR obfuscation method.
     */
    password?: string;
    /**
     * Select locked cells
     * @default: true
     */
    selectLockedCells?: boolean;
    /**
     * Select unlocked cells
     * @default: true
     */
    selectUnlockedCells?: boolean;
    /**
     * Format cells
     * @default: false
     */
    formatCells?: boolean;
    /**
     * Format columns
     * @default: false
     */
    formatColumns?: boolean;
    /**
     * Format rows
     * @default: false
     */
    formatRows?: boolean;
    /**
     * Insert columns
     * @default: false
     */
    insertColumns?: boolean;
    /**
     * Insert rows
     * @default: false
     */
    insertRows?: boolean;
    /**
     * Insert hyperlinks
     * @default: false
     */
    insertHyperlinks?: boolean;
    /**
     * Delete columns
     * @default: false
     */
    deleteColumns?: boolean;
    /**
     * Delete rows
     * @default: false
     */
    deleteRows?: boolean;
    /**
     * Sort
     * @default: false
     */
    sort?: boolean;
    /**
     * Filter
     * @default: false
     */
    autoFilter?: boolean;
    /**
     * Use PivotTable reports
     * @default: false
     */
    pivotTables?: boolean;
    /**
     * Edit objects
     * @default: true
     */
    objects?: boolean;
    /**
     * Edit scenarios
     * @default: true
     */
    scenarios?: boolean;
}

/** Page Margins -- see Excel Page Setup .. Margins diagram for explanation */
export interface MarginInfo {
    /** Left side margin (inches) */
    left?: number;
    /** Right side margin (inches) */
    right?: number;
    /** Top side margin (inches) */
    top?: number;
    /** Bottom side margin (inches) */
    bottom?: number;
    /** Header top margin (inches) */
    header?: number;
    /** Footer bottom height (inches) */
    footer?: number;
}

export interface AutoFilterInfo {
    /** Range of the AutoFilter table */
    ref: string;
}

type WorkSheetOptions = {
    /** Column Info */
    "!cols"?: ColInfo[];
    /** Row Info */
    "!rows"?: RowInfo[];
    /** Merge Ranges */
    "!merges"?: Range[];
    /** Worksheet Protection info */
    "!protect"?: ProtectInfo;
    /** AutoFilter info */
    "!autofilter"?: AutoFilterInfo;
};

export type WorkSheet<T = unknown> = {
    name: string;
    data: T[][];
    options: WorkSheetOptions;
};