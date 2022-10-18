const mongoose = require('mongoose');
const schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose);

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
    
const population =[{
    path : 'applaiers'
}]

offerSchema.plugin(deepPopulate,{populate:{'author':{select:'username'}}});
module.exports = mongoose.model('Offer',offerSchema)
