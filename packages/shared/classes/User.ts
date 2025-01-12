import { IUser } from "../models/IUser";

export class User implements IUser {
    fullName: string;
    id: string;
    email: string;

    constructor(data?: any) {
        this.fullName = data?.fullName ?? '';
        this.email = data?.email ?? '';
        this.id = data?.id ?? '';
    }
}