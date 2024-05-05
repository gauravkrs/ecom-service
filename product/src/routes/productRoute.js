const express = require("express");
const { verifyUser } = require("../middleware/verifyUser");
const productController = require("../controllers/productController");

const router = express.Router();

router.use(verifyUser);

router.post("/registerProduct", productController.createProduct);
router.get("/getProductById/:productId", productController.getProductById);
router.patch(
  "/updateProductById/:productId",
  productController.updateProductById
);
router.delete(
  "/deleteProductById/:productId",
  productController.deleteProductById
);
router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;
