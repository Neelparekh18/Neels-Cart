import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const requireSignIn = async (req, res, next) => {
  try {
    // find token
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(401, "Please provide a token");
    }

    // verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Invalid token");
    }

    // Fetch user from database
    const rootUser = await user.findById(decodedToken._id);

    // check if user exists
    if (!rootUser) {
      throw new ApiError(404, "User not found");
    }

    // Attach user and token to request object for further use
    req.rootUser = rootUser;
    req.token = token;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(
        new ApiResponse(
          error.status || 500,
          null,
          error.message || "Authentication failed"
        )
      );
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const resource = await user.findById(req.rootUser._id);
    console.log(resource);
    if (resource.role !== 1) {
      throw new ApiError(401, "UnAuthorized Access");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode, null, error.message));
  }
};
