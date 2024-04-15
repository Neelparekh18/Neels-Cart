import { product } from "../models/product.model.js";
import { category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import slugify from "slugify";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name) throw new ApiError(401, "Name is required");
    if (!description) throw new ApiError(401, "description is required");
    if (!price) throw new ApiError(401, "price is required");
    if (!category) throw new ApiError(401, "category is required");
    if (!quantity) throw new ApiError(401, "quantity is required");
    // if(!photo) throw new ApiError(401, "photo is required");
    if (photo && photo.size > 1000000)
      throw new ApiError(401, "photo should be less than 1mb");

    const productData = new product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      productData.photo.data = fs.readFileSync(photo.path);
      productData.photo.contentType = photo.type;
    }
    await productData.save();
    res
      .status(201)
      .json(new ApiResponse(200, productData, "Product Created Successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while creating Product"
        )
      );
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const productData = await product
      .find()
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          productData,
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
          error.message || "Something went wrong while getting Products"
        )
      );
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const productData = await product
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res
      .status(200)
      .json(
        new ApiResponse(200, productData, "Successfully retrieved Product")
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while getting Product"
        )
      );
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = await product.findById(pid).select("photo");
    if (productData.photo.data) {
      res.set("Content-type", productData.photo.contentType);
      // return res.status(200).json(
      //   new ApiResponse(200,productData.photo.data,"Successfully got the photo of this product.")
      // )
      return res.status(200).send(productData.photo.data);
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while fetching Product image"
        )
      );
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res
      .status(201)
      .json(new ApiResponse(200, products, "product updated successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while updating Product"
        )
      );
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = await product.findByIdAndDelete(pid).select("-photo");
    res
      .status(200)
      .json(
        new ApiResponse(200, null, "The product has been deleted successfully")
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while deleting Product"
        )
      );
  }
};

export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await product.find(args);
    return res
      .status(200)
      .json(new ApiResponse(200, products, "Products Filtered Successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong"
        )
      );
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const productData = await product
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    return res
      .status(200)
      .json(
        new ApiResponse(200, productData, "products are searched successfully")
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while searching Products"
        )
      );
  }
};

export const relatedProduct = async (req, res) => {
  try {
    const { pId, cId } = req.params;

    const productData = await product
      .find({ category: cId, _id: { $ne: pId } })
      .select("-photo")
      .limit(3)
      .populate("category");
    console.log(productData);
    if (!productData) {
      throw new ApiError(404, "No Related products found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          productData,
          "Related products fetched Successfully"
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
          error.message ||
            "Something went wrong while fetching related Products"
        )
      );
  }
};

export const productCategory = async (req, res) => {
  try {
    const categoryData = await category.findOne({ slug: req.params.slug });
    const productData = await product.find({ category:categoryData }).populate('category').select("-photo");

    // return res.status(200).json(
    //   ApiResponse(200,productData, "products category fetch successfully" )
    // )
    res.status(200).send({
      success: true,
      categoryData,
      productData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong while fetching Products"
        )
      );
  }
};
