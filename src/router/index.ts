import Router from 'express-promise-router'

const router = Router()

router.use("/user", require("./user"));
router.use("/product", require("./product"));

module.exports = router;
