const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./config/database/db");
const productRouter = require("./routes/productsRoute");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const authJwt = require("./middleware/authJwt");
const errorHandler = require("./middleware/Error");

//env config
dotenv.config({ path: path.join(__dirname, ".", "config", "config.env") });

//cors
app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//db config
connectDatabase();

//router
app.use("/api/v1/", productRouter, categoryRouter, userRouter);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
