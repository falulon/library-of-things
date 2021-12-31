const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");

router.route("/").get(catchAsync(users.showAll));

router.route("/:id").get(catchAsync(users.showSingle));
router.route("/email/:emailaddress").get(catchAsync(users.showUserFromEmail));

router.route("/reserve/:id").post(catchAsync(users.reserveProduct));

router.route("/reserve/all").get(catchAsync(users.showAllReserved));

router
  .route("/reserve/all-by-users")
  .get(catchAsync(users.showAllReservedByUsers));

router.route("/reserve/:id").delete(catchAsync(users.removeAllReserved));

module.exports = router;
