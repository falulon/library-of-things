const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  id: String,
  name: String,
  category: String,
  stock: Number,
  price: Number,
  amount: Number,
  numOfUse: Number,
  value: Number,
  location: String,
  asDesk: String,
  oldBorrowHistory: String,
  comments: String,
  reservedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  currentlyBorrowedTo: [
    {
      date: { type: Date },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  borrowHistory: [
    {
      date: { type: Date },
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
  returnDate: Date,
  donatedFrom: String,
  image: String,
  description: String,
});

productsSchema.virtual("borrowHistoryNames").get(
  function () {
    const names = this.borrowHistory.map((item) => item.user);

    return names;
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
