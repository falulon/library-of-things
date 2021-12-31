const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const General = require("../models/generalModel");

router.route("/").get(
  catchAsync(async (req, res) => {
    const generalInfo = await General.find();
    res.json(generalInfo);
  })
);

router.route("/create").post(
  catchAsync(async (req, res) => {
    const data = req.body;
    const newItem = new General({ ...data });
    console.log(data);
    newItem.save();
    res.send(newItem);
  })
);

module.exports = router;
