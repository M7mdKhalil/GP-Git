const express = require('express')
const router = express.Router({mergeParams:true});
const users = require('../controllers/users')
const {isLogged} = require('../middlewares');
const multer =require('multer')
const {storage} = require('../cloudinary/index');
const uploade = multer({ storage });

router.get('/allcompanies', users.getallCompanies);
router.get('/allusers', users.getAllUsers);

router.get("/:id", users.userDetails);

router.post("/company", uploade.single('image'), users.companyRegisterForm);

router.post("/companylocation", users.companylocation);

router.post("/offerlocation", users.offerslocation);

router.post("/offerskills", users.offersskills);


router.post("/getcompanyid", users.getcompanyid);

router.post("/admin", uploade.single('image'), users.addadmin);

  router.post("/", uploade.single('image'),users.userRegisterForm);

  router.post('/login', users.loginForm)

  router.put("/",isLogged,users.editForm);

  router.delete("/delete/:id",isLogged, users.deleteForm);

  router.post("/apply",users.applyuser)
  
router.post("/unapply", users.unapplyuser)

router.post('/acceptstate', users.acceptedstate);

router.post('/applystate', users.appliedstate);

router.post('/newnot', users.newnot);









module.exports= router;