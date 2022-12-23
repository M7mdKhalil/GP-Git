const mongoose = require("mongoose");
const schema = mongoose.Schema;


const userSchema = new schema({
    username: String,
    password: String,
    email: String,
    cv: String,
    kind: String,
    image: {
        url: { type: String, default: 'https://res.cloudinary.com/dar969tda/image/upload/v1671655008/HireHup/mwh7sh7cifckjsr3kcvz.png' },
        public_id: { type: String, default: 'mwh7sh7cifckjsr3kcvz'}
    },
  location: String,
  phonenumber: String,
  offers:[{
    type:schema.Types.ObjectId,ref:'Offer' 
}],
    createdat: Date,
    notification: [{ msg: String, new: { type: Boolean, default: true } }],
    acceptedOffers: [{
        type: schema.Types.ObjectId, ref: 'Offer'
    }],
    regectedOffers: [{
        type: schema.Types.ObjectId, ref: 'Offer'
    }]
});

module.exports = mongoose.model("User", userSchema);
