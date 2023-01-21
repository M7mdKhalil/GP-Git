const Company = require("../models/company");
const User = require("../models/user");
const Offer = require("../models/offer");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");



module.exports.userDetails = async (req, res) => {
    console.log('hiiiiiii');
    console.log(req.params.id);
    const user = await User.findById(req.params.id).populate({ path: 'offers', populate: { path: 'author'}}).populate('acceptedOffers').populate('regectedOffers');
    if (user) {
        console.log('user', user.username)
        res.send(user);
    }
    else {
        const comp = await Company.findById(req.params.id).populate('offers');
        if (comp) {
            console.log('comp', comp.username)
            res.send( comp );
        }
        else {
            const admin = await Admin.findById(req.params.id);
            if (admin) {
                res.send(admin);
            } else { res.send({}) }
        }
    }
}

module.exports.getallCompanies = async (req, res) => {
    const companies = await Company.find({});
    res.send(companies)
}

module.exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.send(users)
}

module.exports.getcompanyid = async (req, res) => {
    console.log(req.body.state);
    const com = await Company.findOne({ username: req.body.state });
    if (!com) { console.log('errrrrrrrrrrrrrrr'); res.send({ ok: false }) } else {
        console.log(com._id)
        res.send({ id: com._id,ok:true });
    }
}

module.exports.companylocation = async (req, res) => {
    const com = await Company.find({ 'location': { $regex: req.body.location, $options: "i" } });
    if (!com) { console.log('errrrrrrrrrrrrrrr'); res.send({ ok: false }) } else {
        res.send({ com , ok: true });
    }
}

module.exports.offerslocation = async (req, res) => {
    const off = await Offer.find({ 'location': { $regex: req.body.location, $options: "i" } }).populate('author');
    if (!off) { console.log('errrrrrrrrrrrrrrr'); res.send({ ok: false }) } else {
        res.send({ off, ok: true });
    }
}

module.exports.offersskills = async (req, res) => {
    const off = await Offer.find({ "skills": { $elemMatch: { "label": { $in: req.body.skills?.map(x => x.label) } } } }).populate('author');
    if (!off) { console.log('errrrrrrrrrrrrrrr'); res.send({ ok: false }) } else {
        res.send({ off, ok: true });
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

module.exports.editProfile = async (req, res) => {
    console.log('yessssss')
    const {
        username,
        email,
        bio,
        cv,
        image,
        location,
        phonenumber,
        kind,
        id
    } = req.body;
    const _id = id;
    if (kind === 'user') {
        const user = await User.updateOne({ _id }, {
            $set: {
                username,
                email,
                bio,
                cv,
                image,
                location,
                phonenumber
            }
        })
        return res.send({ok:true})
    }
    if (kind === 'company') {
        const company = await Company.updateOne({ _id }, {
            $set: {
                username,
                email,
                bio,
                image,
                location:cv?.country?.label,
                phonenumber
            }
        })
        return res.send({ ok: true })
    }
   return res.send({ok:false})
};

module.exports.loginForm = async (req, res) => {
    const { username, password } = req.body;
    const userfound = await User.findOne({ "username": { $regex: username, $options: "i" } });
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
        const userfound = await Company.findOne({ "username": { $regex: username, $options: "i" } });
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
    console.log(req.body.cancle, req.body.state);
    if (user && company && offer) {
        if (req.body.state === 'accept') {
            if (req.body.cancle) {
                await Offer.findByIdAndUpdate(req.body.offerid, {
                    $pull: { acceptedAppliers: req.body.applierid },
                });
                await User.findByIdAndUpdate(req.body.applierid, {
                    $pull: { acceptedOffers: req.body.offerid },
                });
                offer.appliers.push(user._id);
                user.offers.push(offer._id);
                user.notification.push({ msg: `Your request that accepted by ${company.username} publication on the ${offer.title} canceled and return ro natural state`, offerid: req.body.offerid, companyimg: company.image.url })
                offer.save();
                user.save();
                res.send({ ok: true, state: 'canceled' })

            } else {
                await Offer.findByIdAndUpdate(req.body.offerid, {
                    $pull: { appliers: req.body.applierid },
                });
                await User.findByIdAndUpdate(req.body.applierid, {
                    $pull: { offers: req.body.offerid },
                });
                user.notification.push({ msg: `Your request that you submitted to the ${company.username} publication on the ${offer.title} has been accepted.`, offerid: req.body.offerid, companyimg: company.image.url })
                user.acceptedOffers.push(offer._id);
                user.save();
                offer.acceptedAppliers.push(user._id);
                offer.save();
                res.send({ ok: true, state: 'accepted' })
            }
        }
    

        if (req.body.state === 'regect') {
            if (req.body.cancle) {
                await Offer.findByIdAndUpdate(req.body.offerid, {
                    $pull: { regectedAppliers: req.body.applierid },
                });
                await User.findByIdAndUpdate(req.body.applierid, {
                    $pull: { regectedOffers: req.body.offerid },
                });
                offer.appliers.push(user._id);
                user.offers.push(offer._id);
                user.notification.push({ msg: `Your request that regected by ${company.username} publication on the ${offer.title} canceled and return ro natural state`, offerid: req.body.offerid, companyimg: company.image.url })
                offer.save();
                user.save();
                res.send({ ok: true, state: 'canceled' })

            } else {
                await Offer.findByIdAndUpdate(req.body.offerid, {
                    $pull: { appliers: req.body.applierid },
                });
                await User.findByIdAndUpdate(req.body.applierid, {
                    $pull: { offers: req.body.offerid },
                });
                user.notification.push({ msg: `Your request that you submitted to the ${company.username} publication on the ${offer.title} has been regected`, offerid: req.body.offerid, companyimg: company.image.url }
                )
                user.regectedOffers.push(offer._id);
                user.save();
                offer.regectedAppliers.push(user._id);
                offer.save();
                res.send({ ok: true, state: 'regected' })
            }
        }
    }
    
     else {
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