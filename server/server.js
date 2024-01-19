const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./config/database/db");
const authJwt = require("./middleware/authJwt");
const errorHandler = require("./middleware/Error");
const productRouter = require("./routes/productsRoute");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

//env config
dotenv.config({ path: path.join(__dirname, ".", "config", "config.env") });

//cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//db config
connectDatabase();

//router
app.use(
  process.env.API_URL,
  productRouter,
  categoryRouter,
  userRouter,
  orderRouter
);

//server listen
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
