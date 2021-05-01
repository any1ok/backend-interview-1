// ./src/customType/express.d.ts
import { User } from "./models/model.user";

declare global {
    namespace Express {
        interface Request {
            userItem?: User;
        }
    }
}
