import { Dayjs } from "dayjs";
import { saleCategory } from "../enums";
import { ISale } from "../models";
import dayjs = require("dayjs");

export class Sale implements ISale {
  id: string;
  name: string;
  type: string;
  category: saleCategory;
  amount: string;
  price: string;
  saleDate: Dayjs;
  recipientName: string;
  contact: string;
  paymentState: string;
  paymentDate: Dayjs;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.type = data?.type;
    this.category = data?.category;
    this.amount = data?.amount;
    this.price = data?.price;
    this.saleDate = dayjs(data?.saleDate);
    this.recipientName = data?.recipientName;
    this.contact = data?.contact;
    this.paymentState = data?.paymentState;
    this.paymentDate = dayjs(data?.paymentDate);
  }
}
