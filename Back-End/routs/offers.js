const express = require('express')
const router = express.Router({mergeParams:true});
const offers = require('../controllers/offers');
router.use(express.urlencoded({extended:true}))

router.get("/", offers.getAllOffers);

router.post("/",offers.addOffer );

router.put("/", offers.editOffer);

router.delete("/", offers.deleteOffer);

router.get("/:id", offers.getOfferDetails);

module.exports= router;