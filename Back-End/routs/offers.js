const express = require('express')
const router = express.Router({mergeParams:true});
const offers = require('../controllers/offers');
router.use(express.urlencoded({extended:true}))
const {isLogged,isAuthor}=require('../middlewares');
const multer =require('multer')
const {storage} = require('../cloudinary/index');
const uploade = multer({storage})

router.get("/",uploade.array('image'),offers.getAllOffers);

router.get("/:id/offers",offers.getCompanyOffers);

router.get("/:id/userOffers",offers.getUserOffers);

router.post("/",isLogged,uploade.array('image'),offers.addOffer);

router.put("/",offers.editOffer);

router.post("/delete/:id",offers.deleteOffer);

router.get("/:id",offers.getOfferDetails);

module.exports= router;