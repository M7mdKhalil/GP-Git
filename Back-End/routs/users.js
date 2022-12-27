const express = require('express')
const router = express.Router({mergeParams:true});
const users = require('../controllers/users')
router.use(express.urlencoded({extended:true}))
const {isLogged} = require('../middlewares');
const multer =require('multer')
const {storage} = require('../cloudinary/index');
const uploade = multer({storage});

router.get("/:id",users.userDetails)

router.post("/company", uploade.single('image'), users.companyRegisterForm);

router.post("/admin", uploade.single('image'), users.addadmin);

  router.post("/", uploade.single('image'),users.userRegisterForm);

  router.post('/login', users.loginForm)

  router.put("/",isLogged,users.editForm);

  router.delete("/",isLogged, users.deleteForm);

  router.post("/apply",users.applyuser)
  
router.post("/unapply", users.unapplyuser)

router.post('/acceptstate', users.acceptedstate);

router.post('/applystate', users.appliedstate);

router.post('/newnot', users.newnot);








module.exports= router;