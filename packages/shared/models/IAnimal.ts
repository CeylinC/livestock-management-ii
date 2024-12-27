import { Dayjs } from "dayjs";
import { gender } from "../enums";

export interface IAnimal{
    id: string;
    name: string;
    earring: string;
    type: string;
    genus: string;
    gender: gender;
    birthday: Dayjs;
    barnName: string;
}