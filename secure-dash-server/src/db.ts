import { SecureDash } from "./types";
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


const secureDashSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const SecureDashModel = mongoose.model<SecureDash>("SecureDash", secureDashSchema);

export { connectDB, SecureDashModel };