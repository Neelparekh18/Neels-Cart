import express from "express";
import {
  forgotPasswordController,
  loginUser,
  registerUser,
  testController,
} from "../controllers/user.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/authentication.js";

//router object
const router = express.Router();

//register route
router.route("/register").post(registerUser);

//login route
router.route("/login").post(loginUser);

//forgot-password route
router.route("/forgot-password").post(forgotPasswordController);

//user-auth
router.route("/user-auth").get(requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin-auth
router.route("/admin-auth").get(requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//test route
router.route("/authtest").get(requireSignIn, isAdmin, testController);
export default router;
