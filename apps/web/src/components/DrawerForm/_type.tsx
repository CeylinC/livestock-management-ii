import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export interface IProp {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  formItems: FormItemsType[];
  form: FormInstance;
  handleSave: () => void;
  handleDelete?: () => void
}

export type FormItemsType =
  | {
    type: 'text';
    name: string;
    label: string;
    placeholder: string;
  }
  | {
    type: 'text';
    name: string;
    label: string;
    defaultValue: string;
    placeholder: string;
  }
  | {
    type: 'datetime';
    name: string;
    label: string;
  }
  | {
    type: 'datetime';
    name: string;
    label: string;
    defaultValue: Dayjs;
  }
  | {
    type: 'select';
    name: string;
    label: string;
    defaultOption: string;
    options: { value: string; label: string }[];
  };
