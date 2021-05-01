
import * as jwt from "jsonwebtoken";


export function getToken(user_id = "dddd", privateKey = "asdf", expiresIn = 1000 * 60 * 60) {

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