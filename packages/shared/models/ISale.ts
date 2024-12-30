import { Dayjs } from "dayjs";
import { paymentState, saleCategory } from "../enums";

export interface ISale{
    id: string;
    name: string;
    type: string;
    category: saleCategory;
    amount: string;
    price: string;
    saleDate: Dayjs;
    recipientName: string;
    contact: string;
    paymentState: paymentState;
    paymentDate: Dayjs;
}