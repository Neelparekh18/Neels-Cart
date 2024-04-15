import { user } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { comparePassword, hashPassword } from "../utils/bcryptPassword.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exist or not
  //create user object
  //remove password from response
  // return response

  try {
    const { name, email, password, mobile, address, answer } = req.body;

    if (
      [name, email, password, mobile, address, answer].some(
        (field) => typeof field === "string" && field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required!");
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User Already exists");
    }

    const hashedpassword = await hashPassword(password);

    const createdUser = await user.create({
      name,
      email,
      password: hashedpassword,
      mobile,
      address,
      answer,
    });

    const userData = await user.findOne(createdUser._id).select("-password");

    return res
      .status(201)
      .json(new ApiResponse(200, userData, "User Registered Successfully!"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong!"
        )
      );
  }
};

export const loginUser = async (req, res) => {
  // get user details from frontend (email)
  // check email is existing or not in database
  // if email exist check password is correct or incorrect
  // if password correct generate token for user
  // send cookie

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const findUser = await user.findOne({ email });
    //  console.log(findUser)
    if (!findUser) {
      throw new ApiError(403, "Email does not exists!");
    }

    const comparedpassword = await comparePassword(password, findUser.password);

    if (comparedpassword == false) {
      throw new ApiError(401, "Incorrect Password!");
    }

    const userData = await user.findOne(findUser._id).select("-password -__v");
    const token = jwt.sign(
      { _id: findUser._id, email: findUser.email },
      process.env.JWT_SECRET
    );
    //  console.log(token);

    return res.status(200).json(
      // new ApiResponse(200, userData, "User Login successfully!")
      {
        message: "User Login successfully!",
        statusCode: 200,
        data: userData,
        success: true,
        token: token,
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong!"
        )
      );
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      throw new ApiError(400, "All fields are required");
    }
   const findUser = await user.findOne({email,answer})
    if (!findUser) {
      throw new ApiError(404, "user not exists check email and try again");
    }

    const hashPass = await hashPassword(newPassword);

    const updatedUser = await user.findByIdAndUpdate(findUser._id, {
      password: hashPass,
    });
   
    const userData = await user.findOne(updatedUser._id).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, userData, "password reset successfully"));
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json(
        new ApiResponse(
          error.statusCode,
          null,
          error.message || "Something went wrong!"
        )
      );
  }
};
export const testController = (req, res) => {
  res.send("protected route");
};
