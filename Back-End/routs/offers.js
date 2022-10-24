const express = require('express')
const router = express.Router({mergeParams:true});
const offers = require('../controllers/offers');
router.use(express.urlencoded({extended:true}))
const {isLogged,isAuthor}=require('../middlewares');

router.get("/",offers.getAllOffers);

router.post("/",isLogged,offers.addOffer);

router.put("/",isLogged,offers.editOffer);

router.delete("/",isLogged, offers.deleteOffer);

router.get("/:id",offers.getOfferDetails);

module.exports= router;