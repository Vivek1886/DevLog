// backend/config/db.js
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default connectDB;