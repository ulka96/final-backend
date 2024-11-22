import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path"
import connectToDatabase from "./config/connect.js";

import { fileURLToPath } from 'url';

// Routes
import UserRoute from "./routes/user.routes.js";
import AuthRoute from "./routes/auth.routes.js"
import ProductRouter from "./routes/product.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import NewArrivalsRouterAll from "./routes/newArrivals.routes.js"
import FaqRouter from "./routes/faq.routes.js"
import BlogRouter from "./routes/blog.routes.js"
import RateRoute from "./routes/rating.routes.js"
import CartRouter from "./routes/cart.routes.js"
import ReviewRoute from "./routes/review.routes.js"

// import ContactRouter from "./routes/contact.routes.js";
// import CommonRouter from "./routes/commonPage.routes.js"
// import ColorRouter from "./routes/color.routes.js"

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }))   //For form data
dotenv.config();
server.use(cookieParser());
server.use(express.static("./"))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use('./ProfilePictures', express.static(path.join(__dirname, './ProfilePictures')));
server.use('./ProductPictures', express.static(path.join(__dirname, './ProductPictures')));
server.use('./CategoryPictures', express.static(path.join(__dirname, './CategoryPictures')));

// Storages
const productPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ProductPictures')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const profilePictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ProfilePictures');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const categoryPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './CategoryPictures')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

// Uploads
const productPictureUpload = multer({ storage: productPictureStorage })
const profilePictureUpload = multer({ storage: profilePictureStorage });
const categoryPictureUpload = multer({ storage: categoryPictureStorage });
const textUpload = multer();

const PORT = process.env.PORT;

server.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true 
})
);

// Routes
server.use("/api/users", UserRoute);
server.use("/api/auth", profilePictureUpload.single("profilePic"), AuthRoute)
server.use("/api/products",productPictureUpload.single("productPic"), ProductRouter);
server.use("/api/categories", categoryPictureUpload.single("categoryPic"), CategoryRouter);
server.use("/api/new-arrivals", NewArrivalsRouterAll)
server.use("/api/faqs", textUpload.none(), FaqRouter)
server.use("/api/blogs",textUpload.none(), BlogRouter)
server.use("/api/rate",textUpload.none(), RateRoute)
server.use("/api/cart", CartRouter)
server.use("/api/reviews", ReviewRoute);


// server.use("/api/colors", ColorRouter)
// server.use("/api/contact", ContactRouter);
// server.use("/api/common-page", CommonRouter)



server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

connectToDatabase();