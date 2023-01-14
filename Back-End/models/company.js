const mongoose = require("mongoose");
const schema = mongoose.Schema;

const companySchema = new schema({
  username: String,
  password: String,
  bio: String,
  email: String,
  kind: String,
  image: { url: String, public_id: String },
  location: String,
  phonenumber: String,
  offers: [
    {
      type: schema.Types.ObjectId,
      ref: "Offer",
    },
  ],
  createdat: Date,
  notification: [
    {
      msg: String,
      new: { type: Boolean, default: true },
      applierimg: String,
      offerid: String,
    },
  ],
});
module.exports = mongoose.model("Company", companySchema);
