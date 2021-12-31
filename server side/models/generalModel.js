const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generalSchema = new Schema({
  name: String,
  description: String,
});

const General = mongoose.model("General", generalSchema);
module.exports = General;
