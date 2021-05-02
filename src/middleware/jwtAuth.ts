import * as jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import * as _ from 'lodash';
const getToken = (user_id = "dddd", privateKey = "asdf", expiresIn = 1000 * 60 * 60) => {

    return jwt.sign(
        {
            iat: Date.now(), audience: "myaud", issuer: "myissuer", jwtid: Date.now().toString(), sub: user_id,
        },
        privateKey
        ,
        {
            expiresIn
        }
    );
};




const isAuthenticated = async function (
    req: Request,
    res: Response,
    next: NextFunction) {

    console.log('>>>>>>>>>>>>>>>>>>> req.path : ' + req.path);

    const exclude1 = () => {
        return req.method == "GET" && req.path == "/";
    };

    const excludeAuthCheck = () => {
        console.log(">>>>>>>>>>>>>>>>>>> excludeAuthCheck");
        return req.path.indexOf("NA-") != -1;
    };


    const excludeRefresh = () => {
        console.log(">>>>>>>>>>>>>>>>>>> excludeRefresh");
        return req.path == "/v1/AUTH_REFRESH";
    };


    let decoded;

    if (excludeRefresh()) {

        let userRefreshToken = req.body.refreshToken;

        decoded = jwt.verify(getToken(), "asdf");

        console.log(decoded);

        const user_id = decoded.sub;

        console.log(Date.now());
        console.log(decoded.exp);

        if (Date.now() > decoded.exp) {
            res.status(401).send({ msg: "expired", code: "REFRESH_TOKEN_EXPIRED" });
            return;
        }
        //dynamo
        /*
        const pk = user_id;
        const sk = "USER_INFO";

        let params = {
            TableName: "PK-S-SK-S",
            Key: {
                "PK": pk,
                "SK": sk
            }
        }

        let userInfo = await docClient.get(params).promise();
        console.log(userInfo);
        */

        console.log("uuidrefersh", user_id)
        let accessToken = getToken(user_id, 'asdf', 60 * 60 * 1000);

        res.json(
            { accessToken }
        );

        return;
    }

    if (exclude1() || excludeAuthCheck()) {
        next();
        console.log(">>>>>>>>>>>>>>>>>>> next");
        return;
    }

    console.log(">>>>>>>>>>>>>>>>> pass ");

    try {

        console.log(
            ">>>>>>>>>>>>>>>>> authorization : " + req.headers.authorization
        );


        if (!req.headers.authorization) {
            res.status(401).send({ msg: "jwt expired", code: "TOKEN_INVALID" });
            return;
        }


        decoded = jwt.verify(req.headers.authorization, "asdf");


        console.log("decoded", decoded);


        const user_id = decoded.sub;

        if (Date.now() > decoded.exp) {
            res.status(401).send({ msg: "expired", code: "ACCESS_TOKEN_EXPIRED" });
            return;
        }
        /* dynamo
        const pk = user_id;
        const sk = "USER_INFO";

        let params = {
            TableName: "PK-S-SK-S",
            Key: {
                "PK": pk,
                "SK": sk
            }
        }

        let userInfo = await docClient.get(params).promise();

        if (decodedHeader.kid !== userInfo.Item.TOKEN_KEY) {
            res.status(401).send({ msg: "expired", code: "ACCESS_TOKEN_EXPIRED" });
            return;
        }

        // console.log(userInfo);
        console.log(userInfo.Item);
        */
        const userService = new UserService();
        const userInfo = await userService.findUserDataByUUID(user_id);

        req.userItem = userInfo;


    } catch (err) {
        console.log(err);
        if (err !== undefined && err !== null) {
            if ("jwt expired" == err.message) {
                res.status(401).send({ msg: "jwt expired" });
                return;
            } else {
                res.status(401).send({ msg: "잘못된 토큰 정보" });
                return;
            }
        } else {
            res.status(401).send({ msg: "잘못된 토큰 정보" });
            return;
        }
    }


    next();
};

var auth = async function (req, res, next) {
    req.getToken = getToken;
    //req.tokenRefresh = tokenRefresh;
    isAuthenticated(req, res, next);
};

module.exports = auth;
