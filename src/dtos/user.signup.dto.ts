
import { uuid } from "uuidv4";

export class UserCreateDto {
    constructor(value: {
        user_id: string;
        pass: string;
        name: string;
        email: string;
        user_type: string;
    }) {
        this.name = value.name;
        this.user_id = value.user_id
        this.email = value.email;
        this.user_type = value.user_type;
        this.uuid = uuid();
        this.pass = value.pass;
        this.join_dt = BigInt(Date.now());
    }

    user_id: string;
    pass: string;
    uuid: string;
    name: string;
    email: string;
    user_type: string;
    join_dt: bigint;
}
