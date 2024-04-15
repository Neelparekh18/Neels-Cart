import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected! ${conn.connection.host}`);
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED : `,error);
  }
};

export default connectDb;
