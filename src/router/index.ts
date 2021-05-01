import Router from 'express-promise-router'

const router = Router()



router.use("/user", require("./user"));
router.use("/product", require("./product"));
//router.use("/heart", require("./heart"));

module.exports = router;
