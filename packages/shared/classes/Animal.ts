import { Dayjs } from "dayjs";
import { gender } from "../enums";
import { IAnimal } from "../models";
import dayjs from "dayjs";

export class Animal implements IAnimal {
  id: string;
  name: string;
  earring: string;
  type: string;
  genus: string;
  gender: gender;
  birthday: Dayjs;
  barnName: string;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.name = data?.name || "";
    this.earring = data?.earring || "";
    this.type = data?.type || "";
    this.genus = data?.genus || "";
    this.gender = data?.gender || gender.male;
    this.birthday = dayjs(data?.birthday);
    this.barnName = data?.barnName || "";
  }
}
