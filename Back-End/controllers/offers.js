const Company = require("../models/company");
const Offer = require("../models/offer");
const User = require("../models/user");
const formatDate = require("../utils/formatDate");

module.exports.getAllOffers = async (req, res) => {
  const allOffers = await Offer.find({}).populate("author");
  res.send(allOffers);
};

module.exports.addOffer = async (req, res) => {
  const { title, description, location, author } = req.body;
  const newOffer = await Offer.create({
    title,
    description,
    location,
    author,
    date: formatDate(new Date()),
  });
  const addOfferToCompany = await Company.findById(author);
  addOfferToCompany.offers.push(newOffer._id);
  addOfferToCompany.save();
  console.log("companyoffers", addOfferToCompany.offers);
  res.send({ newOffer, ok: true });
};

module.exports.editOffer = async (req, res) => {
  const { _id } = req.body;
  const { title, description, location } = req.body;
  const newOffer = await Offer.findByIdAndUpdate(_id, {
    title,
    description,
    location,
  });
  res.send({ newOffer, ok: true });
};

module.exports.deleteOffer = async (req, res) => {
  const _id = req.params.id;
  console.log("hallo delete", req.params);
  const newOffer = await Offer.findByIdAndDelete(_id);
  for (i = 0; i < newOffer.appliers.length; i++) {
    const newUser = await User.findByIdAndUpdate(newOffer.appliers[i]._id, {
      $pull: { offers: _id },
    });
<<<<<<< HEAD
    const addOfferToCompany = await Company.findById(author);
    addOfferToCompany.offers.push(newOffer._id);
    addOfferToCompany.save();
    res.send({newOffer,ok:true});
=======
>>>>>>> 46474719c851c03f24d8c9943f72f76842e39a44
  }
  const newCompany = await Company.findByIdAndUpdate(newOffer.author._id, {
    $pull: { offers: _id },
  });
  res.send(newOffer);
};

module.exports.getOfferDetails = async (req, res) => {
  const id = req.params.id;
  const offer = await Offer.findById(id)
    .populate("appliers")
    .populate("author")
    .exec();
  res.send(offer);
};
