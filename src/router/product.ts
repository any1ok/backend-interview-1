import Router from "express-promise-router";
import { ProductController } from "../controllers/product.controller";

const router = Router()

const controller = new ProductController();

router.post("/insertproduct", controller.insertProduct);
router.get("/getproduct/:product_no", controller.getProduct);
router.put("/updateproduct/:product_no", controller.updateProduct);
router.delete("/deleteproduct/:product_no", controller.deleteProduct);
router.get("/product-list", controller.productList);

router.post("/product/:product_no/heart", controller.heart);




module.exports = router;