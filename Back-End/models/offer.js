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
    author:String,
    date:Date,
    image:{url:String,
        filename:String}
})
    
const population =[{
    path : 'applaiers'
}]

offerSchema.plugin(deepPopulate,{});
module.exports = mongoose.model('Offer',offerSchema)
