const express = require("express");
const router = express.Router();
const borrow = require("../controllers/borrow");
const catchAsync = require("../utils/catchAsync");

//assign the products to user and vica versa
// Product:
// 1. add user to currently borrowoedTo list
// 2. remove user from reservedTo list
// 2.2 add +1 to item stock
// User:
// 3. add product to currentlyBorrowing list
// 4. remove product from reservedItems list

// show a list of all borrowrd items to be returned
router.route("/all-by-users").get(catchAsync(borrow.showAll));

//assign the products to user and vica versa
router.route("/:uid").post(catchAsync(borrow.borrowItem));

//remove the products from user and add user to borrowHistory of the product
router.route("/return/:uid").post(catchAsync(borrow.returnItem));

module.exports = router;
