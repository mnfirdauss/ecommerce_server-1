const express = require("express")
const ProductController = require("../controllers/product")
const authorization = require("../middlewares/authorization")
const router = express.Router()

router.get("/", ProductController.read)
router.post("/", authorization, ProductController.create)
router.put("/:id", authorization, ProductController.update)
router.delete("/:id", authorization, ProductController.delete)

module.exports = router