import express from "express";
// import { isAdmin, requireSignIn } from "../middlewares/authentication";
import { isAdmin, requireSignIn } from "../middlewares/authentication.js";
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

//create category route
router.route("/create-category").post(requireSignIn, isAdmin, createCategory);

//update category route
router.route("/update-category/:id").put(requireSignIn,isAdmin,updateCategory);

// get All categories
router.route("/getAll-categories").get(getAllCategories);

//get single category
router.route("/getSingle-category/:slug").get(getSingleCategory);

//delete category
router.route("/delete-category/:id").delete(requireSignIn,isAdmin,deleteCategory);


export default router;
