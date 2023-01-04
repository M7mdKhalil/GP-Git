const mongoose = require("mongoose");
const schema = mongoose.Schema;


const userSchema = new schema({
    username: String,
    password: String,
    bio: String,
    email: String,
    cv: {
        collage: { label: String }, department: { label: String }, country: { label: String }, skill: [{ key: Number, label: String }]
    },
    kind: String,
    image: {
        url: { type: String },
        public_id: { type: String, default: 'mwh7sh7cifckjsr3kcvz'}
    },
  location: String,
  phonenumber: String,
  offers:[{
    type:schema.Types.ObjectId,ref:'Offer' 
}],
    createdat: Date,
    notification: [{ msg: String, new: { type: Boolean, default: true }, offerid : String,companyimg:String }],
    acceptedOffers: [{
        type: schema.Types.ObjectId, ref: 'Offer'
    }],
    regectedOffers: [{
        type: schema.Types.ObjectId, ref: 'Offer'
    }]
});

module.exports = mongoose.model("User", userSchema);
