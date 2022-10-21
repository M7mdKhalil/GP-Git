const Company =require('../models/company');
const Offer = require('../models/offer')
const formatDate =require('../utils/formatDate')

module.exports.getAllOffers = async (req, res) => {
    const allOffers = await Offer.find({}).populate('author');
    res.send(allOffers);
  }

module.exports.addOffer = async (req, res) => {
    const { title, description, location ,author} =
      req.body;
    const newOffer = await Offer.create({
      title,
      description,
      location,
      author,
      date: formatDate(new Date()),
    });
    const addOfferToCompany = await Company.findById(author);
    addOfferToCompany.offers.push(newOffer._id);
    console.log(addOfferToCompany.offers)
    res.send({newOffer,ok:true});
  }

  module.exports.editOffer = async (req, res) => {
    const { _id } = req.body;
    const { title, description, location } = req.body;
    const newOffer = await Offer.findByIdAndUpdate(
      _id,
      { title, description, location },
      { new: true }
    );
    res.send({newOffer,ok:true});
  }

  module.exports.deleteOffer = async (req, res) => {
    const newOffer = await Offer.findByIdAndDelete(req.body._id);
    res.send(newOffer);
  }

  module.exports.getOfferDetails=async (req, res) => {
    const id = req.params.id;
    const offer = await Offer.findById(id);
    res.send(offer);
  }