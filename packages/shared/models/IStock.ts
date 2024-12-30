import { Timestamp } from "firebase/firestore";
import { saleCategory } from "../enums";

export interface IStock {
  id: string;
  name: string;
  category: saleCategory;
  amount: string;
  dealer: string;
  storage: string;
  createdAt?: Timestamp;
}
