import { User } from "../types";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};


const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false},
  },
  
});

const SecureDashModel = mongoose.model<User>("SecureDash", UserSchema);

export { connectDB, SecureDashModel };