const mongoose = require('mongoose');
const schema = mongoose.Schema;

const offerSchema = new schema({
    title: String,
    description: String,
    location: String,
    appliers: [{
        type: schema.Types.ObjectId, ref: 'User'
    }],
    acceptedAppliers: [{
        type: schema.Types.ObjectId, ref: 'User'
    }],
    regectedAppliers: [{
        type: schema.Types.ObjectId, ref: 'User'
    }],
    endDate: Date,
    available: { type: Boolean, default:true },
    author:{
        type:schema.Types.ObjectId,ref:'Company' 
    },
    date:String,
    image:{
        type:schema.Types.ObjectId,ref:'Company' 
    }})
    


module.exports = mongoose.model('Offer', offerSchema);
const Offer = mongoose.model('Offer', offerSchema);
async function updateExpiredOffers() {
    // Find all offers with an end date that has passed
    const expiredOffers = await Offer.find({ endDate: { $lt: new Date() } });

    // Update the "available" field of those offers to "false"
    await Offer.updateMany({ _id: { $in: expiredOffers.map(offer => offer._id) } }, { available: false });
}

setInterval(updateExpiredOffers, 60000);  





