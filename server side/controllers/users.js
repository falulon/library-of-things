const User = require("../models/userModel");
const Product = require("../models/productModel");

module.exports.showAll = async (req, res) => {
  const foundUsers = await User.find();
  res.json(foundUsers);
};

module.exports.showSingle = async (req, res) => {
  const foundUser = await User.findById(req.params.id).populate(
    "reservedItems"
  );
  res.json(foundUser);
};

//assign the products to user and vica versa
module.exports.reserveProduct = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const cart = req.body;
  const productsIds = cart.map((item) => item.id);

  // remove 1 from stock and reserve to user
  const products = await Product.find({ _id: { $in: productsIds } });
  products.forEach(async (product) => {
    const newStock = product.stock - 1;
    await Product.updateOne(
      { _id: product._id },
      { $set: { stock: newStock }, $addToSet: { reservedTo: user } }
    );
  });

  user.reservedItems.push(...products);
  await user.save();
  res.send(products);
};

module.exports.showAllReserved = async (req, res) => {
  const products = await Product.find({
    reservedTo: { $exists: true },
  }).populate("reservedTo");
  res.send(products);
};

module.exports.showAllReservedByUsers = async (req, res) => {
  const products = await User.find({
    reservedItems: { $exists: true, $ne: [] },
  }).populate({ path: "reservedItems", populate: { path: "reservedTo" } });
  res.send(products);
};

module.exports.removeAllReserved = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const productsIds = user.reservedItems;
  const products = await Product.find({ productsIds });
  products.forEach(async (product) => {
    await Product.updateOne(
      { _id: product._id },
      { $inc: { stock: +1 }, $pullAll: { reservedTo: [user] } }
    );
  });
  user.reservedItems = [];
  await user.save();
  res.send("0 reserved items for this user");
};

module.exports.showUserFromEmail = async (req, res) => {
  const foundUser = await User.findOne({
    email: req.params.emailaddress,
  }).populate("reservedItems");
  res.json(foundUser);
};
