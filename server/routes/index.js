const express = require("express")
const UserRouter = require("./user")
const ProductRouter = require("./product")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.use("/users", UserRouter)
router.use(authentication)
router.use("/products", ProductRouter)

module.exports = router