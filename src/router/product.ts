import Router from "express-promise-router";
import { ProductController } from "../controllers/product.controller";

const router = Router()

const controller = new ProductController();

router.post("/insertproduct", controller.insertProduct);
router.get("/getproduct/:id", controller.getProduct);
router.put("/updateproduct/:id", controller.updateProduct);
router.delete("/deleteproduct/:id", controller.deleteProduct);
router.get("/product-list", controller.productList);

router.post("/product/:id/heart", controller.heart);




module.exports = router;