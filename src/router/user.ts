import Router from "express-promise-router";
import { UserController } from "../controllers/user.controller";

const router = Router()

const controller = new UserController();

router.post("/NA-signup", controller.signup);
router.post("/NA-signin", controller.signin);
router.delete("/withdrawal", controller.withdrawal);
router.get("/userInfo", controller.userinfo);
router.get("/userlist", controller.userlist);

module.exports = router;