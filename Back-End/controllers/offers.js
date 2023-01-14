const Company = require("../models/company");
const Offer = require("../models/offer");
const User = require("../models/user");
const formatDate = require("../utils/formatDate");

module.exports.getAllOffers = async (req, res) => {
  const allOffers = await Offer.find({}).populate("author").populate("skills");
  res.send(allOffers);
};

module.exports.getCompanyOffers = async (req, res) => {
  const id = req.params.id;
  const offers = await Offer.find({author: id});
  res.send({ offers, ok: true });
};

module.exports.getUserOffers = async (req, res) => {
  const id = req.params.id;
  const offers = await Offer.find({appliers: id});
  res.send({ offers, ok: true });
};

module.exports.addOffer = async (req, res) => {
  const { title, description, location, author, requirmentSkills, endDate } =
    req.body;
  const newOffer = await Offer.create({
    title,
    description,
    location,
    author,
    skills: requirmentSkills,
    endDate: formatDate(endDate),
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
  const { title, description, location, endDate } = req.body;
  const newOffer = await Offer.findByIdAndUpdate(_id, {
    title,
    description,
    location,
    endDate,
  });
  console.log(endDate)
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
    newUser.save();
  }
  const newCompany = await Company.findByIdAndUpdate(newOffer.author._id, {
    $pull: { offers: _id },
  });
  console.log(req.body);
  if (req.body.admin === true) {
    newCompany.notification.push({
      msg: `${newOffer.title} has been removed Because it is against our policy`,
    });
  }
  newCompany.save();
  res.send(newOffer);
};

module.exports.getOfferDetails = async (req, res) => {
  const id = req.params.id;
  const offer = await Offer.findById(id)
    .populate("appliers")
    .populate("author")
    .populate("acceptedAppliers")
    .populate("regectedAppliers")
    .populate("skills");
  res.send(offer);
};
