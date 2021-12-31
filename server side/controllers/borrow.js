const Product = require("../models/productModel");
const User = require("../models/userModel");

module.exports.showAll = async (req, res) => {
  const products = await User.find({
    currentlyBorrowing: { $exists: true, $ne: [] },
  }).populate({
    path: "currentlyBorrowing",
    populate: { path: "items" },
  });
  res.send(products);
};

module.exports.borrowItem = async (req, res) => {
  const userId = req.params.uid;
  const user = await User.findById(userId);
  const itemId = req.body.productId;
  const currentDate = new Date();

  // add user to product.currentlyBorrowedTo
  const product = await Product.findOneAndUpdate(
    { _id: itemId },
    {
      $addToSet: { currentlyBorrowedTo: { user: user, date: currentDate } },
      $pull: { reservedTo: { $in: [user] } },
      $inc: { stock: +1 },
    }
  );

  // add item to user.currentlyBorrowing
  const productId = product._id;
  await User.updateOne(
    { _id: user._id },
    {
      $addToSet: {
        currentlyBorrowing: { items: product, date: currentDate },
      },
      $pull: {
        reservedItems: { $in: [productId] },
      },
    }
  );
  res.send("ITEM + USER UPDATED");
};

//remove the products from user and add user to borrowHistory of the product
module.exports.returnItem = async (req, res) => {
  const userId = req.params.uid;
  const user = await User.findById(userId);
  const itemId = req.body.productId;
  // remove user from product.currentlyBorrowedTo
  const product = await Product.findOneAndUpdate(
    { _id: itemId },
    { $pull: { currentlyBorrowedTo: { user } } },
    {
      projection: {
        currentlyBorrowedTo: { $elemMatch: { user } },
      },
      _id: 0,
    }
  );

  const borrowDate = new Date(product.currentlyBorrowedTo[0].date);
  const isTenHoursPassed = (new Date() - borrowDate) / 60 / 60 / 1000 > 10;
  // add user to product's borrow-history only if borrowed for more than 10 hrs.
  if (isTenHoursPassed) {
    const borrowEvent = product.currentlyBorrowedTo || "";
    await Product.findOneAndUpdate(
      { _id: itemId },
      { $push: { borrowHistory: borrowEvent }, $inc: { numOfUse: +1 } }
    );
  }

  // remove item from user.currentlyBorrowing
  await User.updateOne(
    { _id: userId },
    {
      $pull: { currentlyBorrowing: { items: { $in: [itemId] } } },
    }
  );

  res.send("ITEM + USER UPDATED");
};

// module.exports.removeItemFromUser = async (userId, itemId) => {
//   await User.updateOne(
//     { _id: userId },
//     {
//       $pull: {
//         currentlyBorrowing: { items: { $in: [itemId] } },
//         $pull: { reservedTo: { $in: [userId] } },
//       },
//     }
//   );
// };
