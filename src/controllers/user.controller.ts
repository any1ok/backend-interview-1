import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { getToken } from "../lib/getToken"
import * as _ from 'lodash';

export class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        const name = _.defaultTo(req.body.name, null);
        const user_id = _.defaultTo(req.body.user_id, null);
        const email = _.defaultTo(req.body.email, null);
        const pass = _.defaultTo(req.body.pass, null);

        if (name == null) {
            res.status(406).send({ success_yn: false, msg: "닉네임을 입력해주세요" });
            return;
        }
        if (user_id == null) {
            res.status(406).send({ success_yn: false, msg: "아이디를 입력해주세요" });
            return;
        }
        if (pass == null) {
            res.status(406).send({ success_yn: false, msg: "비밀번호를 입력해주세요" });
            return;
        }
        if (email == null) {
            res.status(406).send({ success_yn: false, msg: "이메일을 입력해주세요" });
            return;
        }

        try {
            const userService = new UserService();
            const data_AlreadyUser = await userService.existUser(user_id);

            /*const asdf = await userService.getUserAll();
            console.log(asdf);
            console.log(asdf[0]);
            console.log(_.get(asdf, 'dataValues'));*/
            if (data_AlreadyUser.length > 0) {
                res.status(406).send({ success_yn: false, msg: "exist user" });
                return;
            }


            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        const user_id = _.defaultTo(req.body.user_id, null);
        const pass = _.defaultTo(req.body.pass, null);

        if (user_id == null) {
            res.status(406).send({ success_yn: false, msg: "아이디를 입력해주세요" });
            return;
        }
        if (pass == null) {
            res.status(406).send({ success_yn: false, msg: "비밀번호를 입력해주세요" });
            return;
        }


        try {
            const userService = new UserService();
            const data_AlreadyUser = await userService.existUser(user_id);
            console.log()
            if (data_AlreadyUser.length == 0) {
                res.status(406).send({ success_yn: false, msg: "nonexist user" });
                return;
            }
            var uuid = _.get(data_AlreadyUser, 'dataValues.uuid')

            var accessToken = getToken(uuid, "asdf", 1000 * 60 * 60 * 2);

            res.json({ success_yn: true, msg: "success", accessToken });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async userinfo(req: Request, res: Response, next: NextFunction) {
        const user_no = _.defaultTo(req.body.user_no, null);

        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "bad param" });
            return;
        }



        try {
            const userService = new UserService();
            const query_data = await userService.getUserDataByUserNo(user_no);
            console.log()
            if (query_data.length == 0) {
                res.status(406).send({ success_yn: false, msg: "nonexist user" });
                return;
            }


            console.log(_.get(query_data[0], 'dataValues'));
            var data = _.get(query_data[0], 'dataValues')
            res.json({ success_yn: true, msg: "success", data });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async userlist(req: Request, res: Response, next: NextFunction) {
        const user_no = _.defaultTo(req.body.user_no, null);

        if (user_no == null) {
            res.status(403).send({ success_yn: false, msg: "bad param" });
            return;
        }



        try {
            const userService = new UserService();
            const query_data = await userService.getUserAll();

            var data = query_data;
            res.json({ success_yn: true, msg: "success", data });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }

    async withdrawal(req: Request, res: Response, next: NextFunction) {
        const user_no = _.defaultTo(req.body.user_no, null);


        try {
            const userService = new UserService();
            await userService.deleteUserByUserNo(user_no);

            res.json({ success_yn: true, msg: "success" });
        } catch (error) {
            res.status(403).send({ success_yn: false, error: error });
            console.log("query: error", error);
            return;
        }
    }


}
