if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  console.log("ENV LOADED ");
}

const express = require("express");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const ExpressError = require("./utils/ExpressError");

const app = express();

// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const mongoose = require("mongoose");
const productsPage = require("./routes/productRoute");
const usersPage = require("./routes/usersRoute");
const generalPage = require("./routes/generalRoute");
const borrowPage = require("./routes/borrowRoute");

app.use(cors());

app.use(bodyParser.json());
const dbUrl = process.env.DB_URL;

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// connect to mongoose
mongoose.connect(dbUrl);
// require route
app.use("/products", productsPage);
app.use("/users", usersPage);
app.use("/info", generalPage);
app.use("/borrow", borrowPage);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found 404", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong! ";
  if (err.name) err.message += ` - ${err.name}`;
  res.status(statusCode).send({ msg: err.message });
});

app.listen(3001, function () {
  console.log("express server is running. port 3001");
});
