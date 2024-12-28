import { ISale } from "@packages/shared/models";

export interface IProp{
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    data?: ISale;
}