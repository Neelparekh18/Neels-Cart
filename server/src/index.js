import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "./db/conn.js";
dotenv.config();
import cors from "cors";
const port = process.env.PORT || 8080;

//database
connectDb();

const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(cors());

//routes
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product",productRoutes);

app.listen(port, () => {
  console.log(`server running on port number ${port}`);
});
