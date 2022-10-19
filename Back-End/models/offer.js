const mongoose = require('mongoose');
const schema = mongoose.Schema;

const offerSchema = new schema({
    title:String,
    description:String,
    location:String,
    applaiers:{
        type:schema.Types.ObjectId,ref:'User' 
    },
    author:{
        type:schema.Types.ObjectId,ref:'Company' 
    },
    date:String,
    image:{
        type:schema.Types.ObjectId,ref:'Company' 
    }})
    


module.exports = mongoose.model('Offer',offerSchema)
