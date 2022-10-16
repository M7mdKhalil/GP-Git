const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: String,
  password: String,
  email: String,
  cv: String,
  Kind: String,
  image: { url: String, filename: String },
  location: String,
  phonenumber: String,
  createdat: Date,
});

module.exports = mongoose.model("User", userSchema);
