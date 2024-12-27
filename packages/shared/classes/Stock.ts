import { saleCategory } from "../enums";
import { IStock } from "../models";

export class Stock implements IStock {
  id: string;
  name: string;
  category: saleCategory;
  amount: string;
  dealer: string;
  storage: string;

  constructor(data?: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.category = data?.category;
    this.amount = data?.amount;
    this.dealer = data?.dealer;
    this.storage = data?.storage;
  }
}
