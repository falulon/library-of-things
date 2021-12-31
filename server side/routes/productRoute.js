const express = require("express");
const router = express.Router();
const products = require("../controllers/products");
const catchAsync = require("../utils/catchAsync");
const { validateProduct } = require("../middleware");

router.route("/").get(catchAsync(products.showAll));

router.route("/edit/create").post(validateProduct, catchAsync(products.create));

router.route("/:id").get(catchAsync(products.showSingle));

router.route("/edit/:id").put(validateProduct, catchAsync(products.update));

router.route("/edit/:id").delete(catchAsync(products.remove));

module.exports = router;
