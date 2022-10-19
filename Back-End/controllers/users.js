const Company =require('../models/company');
const User =require('../models/user');
const bcrypt =require('bcrypt');

module.exports.companyRegisterForm = async (req, res) => {
    const {
      username,
      password,
      email,
      image,
      filename,
      location
    } = req.body;
    const isfound = await Company.findOne({ username });
    const hashedPassword = await bcrypt.hashSync(password,10);
    const kind = "company"
    if (!isfound) {
      const newCompany = await Company.create({
        username,
        password:hashedPassword,
        email,
        kind,
        image,
        filename,
        location,
        createdat: new Date(),
      });
      return res.send({ ok: true, msg: "welcome" });
    } else {
      res.send({ ok: false, msg: "is already registrated" });
    }
  }

  module.exports.userRegisterForm = async (req, res) => {
    const {
      username,
      password,
      email,
      cv,
      image,
      filename,
      location,
      phonenumber,
    } = req.body;
    const isfound = await User.findOne({ username });
    const hashedPassword = await bcrypt.hashSync(password,10);
    if (!isfound) {
      const newUser = await User.create({
        username,
        password:hashedPassword,
        email,
        cv,
        kind:'user',
        image,
        filename,
        location,
        phonenumber,
        createdat: new Date(),
      });
      return res.send({ ok: true, msg: "welcome" });
    } else {
      res.send({ ok: false, msg: "is already registrated" });
    }
  }
  
  module.exports.loginForm = async(req,res)=>{
    const {username,password}=req.body;
    const userfound = await User.findOne({username});
    if(userfound){
      const passwordiscorrect = bcrypt.compareSync(password,userfound.password);
      if(passwordiscorrect){ 
      res.send({ok:true,msg:'found',_id:userfound._id,username,kind:userfound.kind})}
    else{
      res.send({ok:false,msg:'wrong password'})
    }}
    else{const userfound = await Company.findOne({username});
    if(userfound){
      const passwordiscorrect = bcrypt.compareSync(password,userfound.password);
      if(passwordiscorrect){ 
      res.send({ok:true,msg:'found',_id:userfound._id,username,kind:userfound.kind})}
    else{
      res.send({ok:false,msg:'wrong password'})
    }}else{
      res.send({ok:false,msg:'not found'})}
    }
  }

  module.exports.editForm= async (req, res) => {
    const { _id } = req.body;
    const newUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if(newUser){
    res.send(newUser);}
    else{
        const newCompany = await Company.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(newCompany);
    }
  }

  module.exports.deleteForm=async (req, res) => {
    const newUser = await User.findByIdAndDelete(req.body._id);
    if(newUser){
    res.send(newUser);}
    else{
        const newCompany = await Company.findByIdAndDelete(req.body._id);
        res.send(newCompany)
    }
  }