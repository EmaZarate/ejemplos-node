export interface TableLayout {
    title: string;
    headerRows: string[];
    data: any[];
    canEdit: boolean;
    canRemove: boolean;
    canUpdateState?: boolean;
    canSeeDetail?: boolean;
    canSeeAction?: boolean;
    functionRemove: Function;
    canLock?: boolean;
    propertyToCheck?: string;
    functionLock?: Function;
    canResetPassword?: boolean;
}
