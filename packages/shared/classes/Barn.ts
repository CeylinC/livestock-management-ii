import { gender } from "../enums/gender";
import { IBarn } from "../models/IBarn";

export class Barn implements IBarn {
  id: string;
  name: string;
  type: string;
  gender: gender;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.name = data?.name || "";
    this.type = data?.type || "";
    this.gender = data?.gender || gender.karma;
  }
}
