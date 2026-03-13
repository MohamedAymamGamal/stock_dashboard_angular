

export type DialogType = 'default' | 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmOptions {

  title : string;
  message : string;
  type?:  DialogType;
  acceptLabel? : string;
  rejectLabel:string;
  accept?:      () => void;
  reject?:      () => void;
}


