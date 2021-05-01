//import { passwordHashing } from "../lib/password";
import { uuid } from "uuidv4";

export class UserCreateDto {
    constructor(value: {
        user_id: string;
        pass: string;
        name: string;
        email: string;
        userType: string;
    }) {
        this.name = value.name;
        this.user_id = value.user_id
        this.email = value.email;
        this.userType = value.userType;
        this.uuid = uuid();
        this.pass = value.pass;
        this.joinDt = BigInt(Date.now());
    }

    user_id: string;
    pass: string;
    uuid: string;
    name: string;
    email: string;
    userType: string;
    joinDt: bigint;
}
