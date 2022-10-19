const mongoose = require("mongoose");
const schema = mongoose.Schema;

const companySchema = new schema({
  username: String,
  password: String,
  email: String,
  kind: String,
  image: { url: String, filename: String },
  location: String,
  phonenumber: String,
  offers:[{
    type:schema.Types.ObjectId,ref:'Offer' 
}],
  createdat: Date,
});
module.exports = mongoose.model("Company", companySchema);