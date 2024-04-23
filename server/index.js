const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConnection");
const productRoutes = require("./routes/productRoute");
const authRoutes = require("./routes/authRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// ROUTES
app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
