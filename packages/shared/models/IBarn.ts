import { gender } from "../enums/gender";

export interface IBarn{
    id: string;
    name: string;
    type: string;
    gender: gender;
}