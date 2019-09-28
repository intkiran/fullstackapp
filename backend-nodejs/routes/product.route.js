const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require("../controllers/product.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/test", product_controller.test);
router.post("/create", product_controller.createProduct);
router.get("/:id", product_controller.getProductById);
router.put("/:id/update", product_controller.updateProduct);
router.delete("/:id/delete", product_controller.deleteProduct);

module.exports = router;
