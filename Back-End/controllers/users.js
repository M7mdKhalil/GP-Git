const Company = require("../models/company");
const User = require("../models/user");
const Offer = require("../models/offer");
const bcrypt = require("bcrypt");

module.exports.userDetails = async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(user)
  res.send(user)
}


module.exports.companyRegisterForm = async (req, res) => {
  const { username, password, email, image, location } = req.body;
  const isfound = await Company.findOne({ username });
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const kind = "company";
  if (!isfound) {
    const newCompany = await Company.create({
      username,
      password: hashedPassword,
      email,
      kind,
      image,
      location,
      createdat: new Date(),
    });
    return res.send({ ok: true, msg: "welcome" });
  } else {
    res.send({ ok: false, msg: "is already registrated" });
  }
};

module.exports.userRegisterForm = async (req, res,next) => {
  console.log(req.files)
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
  const hashedPassword = await bcrypt.hashSync(password, 10);
  if (!isfound) {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      cv,
      image,
      kind: "user",
      filename,
      location,
      phonenumber,
      createdat: new Date(),
    });
    return res.send({ ok: true, msg: "welcome" });
  } else {
    res.send({ ok: false, msg: "is already registrated" });
  }
};

module.exports.loginForm = async (req, res) => {
  const { username, password } = req.body;
  const userfound = await User.findOne({ username });
  if (userfound) {
    const passwordiscorrect = bcrypt.compareSync(password, userfound.password);
    if (passwordiscorrect) {
      res.cookie("userid", userfound._id);
      res.cookie("islogin", true);
      console.log(req.cookie);
      res.send({
        ok: true,
        msg: "found",
        _id: userfound._id,
        username,
        kind: userfound.kind,
      });
    } else {
      res.send({ ok: false, msg: "wrong password" });
    }
  } else {
    const userfound = await Company.findOne({ username });
    if (userfound) {
      const passwordiscorrect = bcrypt.compareSync(
        password,
        userfound.password
      );
      if (passwordiscorrect) {
        res.send({
          ok: true,
          msg: "found",
          _id: userfound._id,
          username,
          kind: userfound.kind,
        });
      } else {
        res.send({ ok: false, msg: "wrong password" });
      }
    } else {
      res.send({ ok: false, msg: "not found" });
    }
  }
};

module.exports.editForm = async (req, res) => {
  const { _id } = req.body;
  const newUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (newUser) {
    res.send(newUser);
  } else {
    const newCompany = await Company.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(newCompany);
  }
};

module.exports.deleteForm = async (req, res) => {
  const newUser = await User.findByIdAndDelete(req.body._id);
  if (newUser) {
    res.send(newUser);
  } else {
    const newCompany = await Company.findByIdAndDelete(req.body._id);
    res.send(newCompany);
  }
};

module.exports.applyuser = async (req, res) => {
  const offer = await Offer.findById(req.body._id);
  const user = await User.findById(req.body.userid);
  console.log(offer.appliers.includes(req.body.userid));
  if (offer && user) {
    if (!offer.appliers.includes(req.body.userid)) {
      offer.appliers.push(req.body.userid);
      offer.save();
      user.offers.push(req.body._id);
      user.save();
      res.send({ ok: true, appliers: offer.appliers });
    } else res.send({ ok: false, msg: "alreadyapplied" });
  } else {
    res.send({ ok: false, msg: "something error" });
  }
};

module.exports.unapplyuser = async (req, res) => {
  const offer = await Offer.findById(req.body._id);
  const user = await User.findById(req.body.userid);
  if (offer && user) {
    console.log(offer.appliers.includes(req.body.userid));
    if (offer.appliers.includes(req.body.userid)) {
      const offer = await Offer.findByIdAndUpdate(req.body._id, {
        $pull: { appliers: req.body.userid },
      });
      const user = await User.findByIdAndUpdate(req.body.userid, {
        $pull: { offers: req.body._id },
      });
      res.send({ ok: true, appliers: offer.appliers });
    } else res.send({ ok: false, msg: "alreadynotapplied" });
  } else {
    res.send({ ok: false, msg: "something error" });
  }
};
