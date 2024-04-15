import { category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new ApiError(401, "Name is required");
    }
    const existingCategory = await category.findOne({ name });
    if (existingCategory) {
      throw new ApiError(409, "Category already exists.");
    }
    const createdCategoryData = await category.create({
      name,
      slug: slugify(name),
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          200,
          createdCategoryData,
          "Category created successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while creating category!"
        )
      );
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      throw new ApiError(401, "Name is required");
    }
    const updatedCategoryData = await category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedCategoryData,
          "Category updated successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while updating category!"
        )
      );
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await category.find();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          categories,
          "Successfully retrieved all Categories"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while retrieving categories!"
        )
      );
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const categoryData = await category.findOne({ slug: slug });
    res
      .status(200)
      .json(
        new ApiResponse(200, categoryData, "Successfully Retrieved Category")
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while fetching the category!"
        )
      );
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = await category.findByIdAndDelete(id);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Category Deleted Successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while fetching the category!"
        )
      );
  }
};
