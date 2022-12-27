const mongoose = require("mongoose");
const schema = mongoose.Schema;


const adminSchema = new schema({
    username: String,
    password: String,
    kind: String,
    image: {
        url: { type: String, default: 'https://res.cloudinary.com/dar969tda/image/upload/v1671655008/HireHup/mwh7sh7cifckjsr3kcvz.png' },
        public_id: { type: String, default: 'mwh7sh7cifckjsr3kcvz' }
    },
    notification: [{ msg: String, new: { type: Boolean, default: true }, offerid: String, companyimg: String }]
});

module.exports = mongoose.model("Admin", adminSchema);