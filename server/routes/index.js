const express = require("express")
const UserRouter = require("./user")
const router = express.Router()

router.use("/users", UserRouter)

module.exports = router