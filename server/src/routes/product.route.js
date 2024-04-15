import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  productCategory,
  productFilter,
  relatedProduct,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/authentication.js";
import formidable from "express-formidable";

const router = express.Router();

//crate-product route
router
  .route("/create-product")
  .post(requireSignIn, isAdmin, formidable(), createProduct);

//get all products route
router.route("/get-products").get(getAllProducts);

//get Single product route
router.route("/get-product/:slug").get(getSingleProduct);

//get photo route
router.route("/product-photo/:pid").get(getProductPhoto);

//update product route
router
  .route("/update-product/:pid")
  .put(requireSignIn, isAdmin, formidable(), updateProduct);

//delete product route
router
  .route("/delete-product/:pid")
  .delete(requireSignIn, isAdmin, deleteProduct);

//filter product route
router.route("/product-filter").post(productFilter);

//search product route
router.route("/search-product/:keyword").get(searchProducts);

//similar product route
router.route("/related-product/:pId/:cId").get(relatedProduct);

//category wise route
router.route("/product-category/:slug").get(productCategory);
export default router;
