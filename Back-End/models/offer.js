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
    available: { type: Boolean, default:true },
    author:{
        type:schema.Types.ObjectId,ref:'Company' 
    },
    date:String,
    image:{
        type:schema.Types.ObjectId,ref:'Company' 
    }})
    


module.exports = mongoose.model('Offer',offerSchema)
