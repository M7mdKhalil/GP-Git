const Offer = require('./models/offer')

module.exports.isLogged = async(req,res,next)=>{
    if(!req.body.islogin){
      return  res.send('you must be loggin');
    }
     next();
}


// module.exports.isAuthor = async(req,res,next)=>{
//     const offer = await Offer.findById(req.body._id);
//     console.log(req.body);
//     if(!offer.author.equals(req.body.userid)){
//         return res.send({msg:'you are not author'})
//     }
//     next();
// }

