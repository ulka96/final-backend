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

// import NewArrivalsRouter from "./routes/newArrivals.routes.js";
// import TopSellersRouter from "./routes/topSellers.routes.js";
// import CategoryRouter from "./routes/category.routes.js";
// import ContactRouter from "./routes/contact.routes.js";
// import CommonRouter from "./routes/commonPage.routes.js"
// import FaqRouter from "./routes/faq.routes.js"
// import NewArrivalsRouterAll from "./routes/newArrivalsAll.routes.js"
// import TopSellerRouterAll from "./routes/topSellersAll.routes.js"
// import SizeRouter from "./routes/size.routes.js"
// import ColorRouter from "./routes/color.routes.js"

const server = express();
server.use(express.json());
dotenv.config();
server.use(cookieParser());
server.use(express.static("./"))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use('./ProfilePictures', express.static(path.join(__dirname, './ProfilePictures')));

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

// Uploads
const productPictureUpload = multer({ storage: productPictureStorage })

const PORT = process.env.PORT;

server.use(cors({
  origin: ["http://localhost:5173"], 
  credentials: true 
})
);


// Routes
server.use("/api/users", UserRoute);
server.use("/api/auth", AuthRoute)
server.use("/api/products",productPictureUpload.single("productPic"), ProductRouter);
// server.use("/api/new-arrivals", NewArrivalsRouter);
// server.use("/api/top-sellers", TopSellersRouter);
// server.use("/api/categories", CategoryRouter);
// server.use("/api/contact", ContactRouter);
// server.use("/api/faq", FaqRouter)
// server.use("/api/common-page", CommonRouter)
// server.use("/api/new-arrivals-all", NewArrivalsRouterAll)
// server.use("/api/top-sellers-all", TopSellerRouterAll)

// server.use("/api/sizes", SizeRouter)
// server.use("/api/colors", ColorRouter)

server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

connectToDatabase();