const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  email: String,
  authLevel: Number,
  password: String,
  reservedItems: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  borrowHistory: String,
  imgUrl: String,
  description: String,
  currentlyBorrowing: [
    {
      date: {
        type: Date,
        default: Date(),
      },
      items: { type: Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
