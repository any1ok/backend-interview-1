import { UserCreateDto } from "../dtos/user.signup.dto";
import { User } from "../models/model.user";

export class UserService {

    async signup(value: UserCreateDto) {
        const user = new User({ ...value });
        return await user.save();
    }

    async deleteUserByUserNo(user_no: bigint) {
        return await User.update({ userStatus: user_no }, { where: { user_no } });
    }

    async getUserDataByUserNo(user_no: bigint) {
        return await User.findOne({ where: { user_no, userStatus: 0 } });
    }
    async getUserAll() {
        return await User.findAll({ where: { userStatus: 0 } });
    }

    async findUserDataByUUID(uuid: string) {
        return await User.findOne({ where: { uuid, userStatus: 0 } });
    }

    async existUser(user_id: string) {
        return await User.findAll({ where: { user_id } });

    }
    async login(user_id: string, pass: string) {
        return await User.findOne({ where: { user_id, pass } });

    }
}