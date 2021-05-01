import Router from "express-promise-router";
import { UserController } from "../controllers/user.controller";

const router = Router()

const controller = new UserController();
/*
router.post("/insertproduct", controller.insertporduct);
router.get("/product/:id", controller.getproduct);
router.put("/product/:id", controller.updateproduct);
router.delete("/product/:id", controller.deleteproduct);
router.get("/product-list", controller.findList);

router.post("/product/:id/heart", controller.heart);

*/


module.exports = router;