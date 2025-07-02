import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import cookieParser from "cookie-parser";
import connectMongoDB from "./db/connectMongoDB.js";
import userRoutes from "./routes/user.routes.js";
import { v2 as cloudinary } from "cloudinary";
import postRoutes from "./routes/post.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <-- Move this above routes
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});