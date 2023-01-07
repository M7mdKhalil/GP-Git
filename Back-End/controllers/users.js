const Company = require("../models/company");
const User = require("../models/user");
const Offer = require("../models/offer");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

module.exports.userDetails = async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id).populate('offers').populate('acceptedOffers').populate('regectedOffers');
    if (user) {
        console.log('user', user)
        res.send(user);
    }
    else {
        const comp = await Company.findById(req.params.id);
        if (comp) {
            res.send(comp);
        }
        else {
            const admin = await Admin.findById(req.params.id);
            res.send(admin);
        }
    }
}


module.exports.companyRegisterForm = async (req, res) => {
    const { username, password, email, image, location, bio, phonenumber } = req.body;
  const isfound = await Company.findOne({ username });
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const kind = "company";
  if (!isfound) {
    const newCompany = await Company.create({
      username,
      password: hashedPassword,
        email,
        bio,
        phonenumber,
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

module.exports.addadmin = async (req, res) => {
    const { username, password, image } = req.body;
    const isfound = await Admin.findOne({ username });
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const kind = "admin";
    if (!isfound) {
        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
            kind,
            image
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
    bio,
    cv,
    image,
    location,
    phonenumber,
  } = req.body;
  const isfound = await User.findOne({ username });
    const hashedPassword = await bcrypt.hashSync(password, 10);
    console.log('rg', cv);
  if (!isfound) {
    const newUser = await User.create({
      username,
      password: hashedPassword,
        email,
      bio,
      cv,
      image,
      kind: "user",
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
                userfound
            });
        } else {
            res.send({ ok: false, msg: "wrong password", userfound });
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
                    userfound
                });
            } else {
                res.send({ ok: false, msg: "wrong password" });
            }
        } else {
            const userfound = await Admin.findOne({ username });
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
                        userfound
                    });
                } else {
                    res.send({ ok: false, msg: "wrong password" });
                }
            } else {
                res.send({ ok: false, msg: "not found" });
            }
        
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
  if (offer && user) {
    if (!offer.appliers.includes(req.body.userid)) {
      offer.appliers.push(req.body.userid);
      offer.save();
      user.offers.push(req.body._id);
      user.save();
      res.send({ ok: true, appliers: offer.appliers});
    } else res.send({ ok: false, msg: "alreadyapplied" });
  } else {
    res.send({ ok: false, msg: "something error" });
  }
};

module.exports.unapplyuser = async (req, res) => {
  const offer = await Offer.findById(req.body._id);
  const user = await User.findById(req.body.userid);
  if (offer && user) {
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

module.exports.acceptedstate = async (req, res) => {
    const user = await User.findById(req.body.applierid);
    const offer = await Offer.findById(req.body.offerid);
    const company = await Company.findById(req.body.companyid);
    if (user && company && offer) {
        if (req.body.state === 'accept') {
             await Offer.findByIdAndUpdate(req.body.offerid, {
                $pull: { appliers: req.body.applierid },
            });
            user.notification.push({ msg: `Your request that you submitted to the ${company.username} publication on the ${offer.title} has been accepted.`, offerid: req.body.offerid,companyimg:company.image.url })
            user.acceptedOffers.push(offer._id);
            user.save();
            offer.acceptedAppliers.push(user._id);
            offer.save();
            res.send({ ok: true, state: 'accepted' })
        }

        if (req.body.state === 'regect') {
            await Offer.findByIdAndUpdate(req.body.offerid, {
                $pull: { appliers: req.body.applierid },
            });
            user.notification.push({ msg: `Your request that you submitted to the ${company.username} publication on the ${offer.title} has been regected`, offerid: req.body.offerid, companyimg: company.image.url }
)
            user.regectedOffers.push(offer._id);
            user.save();
            offer.regectedAppliers.push(user._id);
            offer.save();
            res.send({ ok: true, state: 'regected' })
        }
    } else {
        res.send({ ok: false })
    }
};

module.exports.appliedstate = async (req, res) => {
    const user = await User.findById(req.body.applierid);
    const offer = await Offer.findById(req.body.offerid);
    const company = await Company.findById(req.body.companyid);
    if (user && company && offer) {
        company.notification.push({ msg: `${user.username} has applied on your ${offer.title}`,applierimg:user.image.url,offerid:req.body.offerid });
        company.save();
            res.send({ ok: true })
        }
     else {
        res.send({ ok: false })
    }
};

module.exports.newnot = async (req, res) => {
    console.log(req.body.kind)
    if (req.body.kind === 'user') {
        const user = await User.findById(req.body._id);
        for (let i = 0; i < user.notification.length; i++) {
            if (user.notification[i].new === true) {
                user.notification[i].new = false;
            }
            await user.save();
        }
    }
    if (req.body.kind === 'company') {
        const company = await Company.findById(req.body._id);
        for (let i = 0; i < company.notification.length; i++) {
            if (company.notification[i].new === true) {
                company.notification[i].new = false;
            }
            await company.save();
        }
    }
    
};