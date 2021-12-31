const Product = require("../models/productModel");

module.exports.showAll = async (req, res) => {
  const foundProducts = await Product.find();
  res.json(foundProducts);
};

module.exports.create = async (req, res) => {
  const data = req.body.product;
  const newItem = new Product({ ...data });
  console.log("added");
  newItem.save();
  res.send("OK");
};

module.exports.showSingle = async (req, res) => {
  const foundProduct = await Product.findById(req.params.id).populate({
    path: "borrowHistory",
    populate: { path: "user", select: "name" },
  });
  res.json(foundProduct);
};

module.exports.update = async (req, res) => {
  const editedProduct = req.body.product;
  console.log(editedProduct);
  const { id } = req.params;
  await Product.findOneAndUpdate({ _id: id }, editedProduct);
  res.send("ITEM UPDATED SUCCESSFULLY");
};

module.exports.remove = async (req, res) => {
  const { id } = req.params;
  if (id === "undefined") {
    return;
  }
  const result = await Product.findOneAndDelete({ _id: id });
  res.send("ITEM DELETED.");
};
