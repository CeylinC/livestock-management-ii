import { Dayjs } from "dayjs";
import { gender } from "../enums";
import { Timestamp } from "firebase/firestore";

export interface IAnimal{
    id: string;
    name: string;
    earring: string;
    type: string;
    genus: string;
    gender: gender;
    birthday: Dayjs;
    barnName: string;
    createdAt?: Timestamp;
}