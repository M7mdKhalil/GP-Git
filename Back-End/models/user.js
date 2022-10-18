const mongoose = require("mongoose");
const schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const userSchema = new schema({
  username: String,
  password: String,
  email: String,
  cv: String,
  kind: String,
  image: { url: String, filename: String },
  location: String,
  phonenumber: String,
  offers:{
    type:schema.Types.ObjectId,ref:'Offer' 
},
  createdat: Date,
});
userSchema.plugin(deepPopulate,{});
module.exports = mongoose.model("User", userSchema);
