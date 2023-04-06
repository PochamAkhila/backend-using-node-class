var express = require('express');
var router = express.Router();

var ProductsController = require("../controllers/products")

/* GET users listing. */
router.get('/', ProductsController.getProducts);

router.get("/:id", ProductsController.getProduct)

router.post("/", ProductsController.createProduct)

router.put("/:id", ProductsController.updateProduct)

router.delete("/:id", ProductsController.deleteProduct)


module.exports = router;  