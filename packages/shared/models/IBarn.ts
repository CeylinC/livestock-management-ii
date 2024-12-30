import { Timestamp } from "firebase/firestore";
import { gender } from "../enums/gender";

export interface IBarn {
  id: string;
  name: string;
  type: string;
  gender: gender;
  createdAt?: Timestamp;
}
