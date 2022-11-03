const express = require('express')
const router = express.Router({mergeParams:true});
const users = require('../controllers/users')
router.use(express.urlencoded({extended:true}))
const {isLogged,isntLogged} = require('../middlewares');

router.post("/company",users.companyRegisterForm );

  router.post("/", users.userRegisterForm);

  router.post('/login', users.loginForm)

  router.put("/",isLogged,users.editForm);

  router.delete("/",isLogged, users.deleteForm);

  router.post("/apply",users.applyuser)
  
  router.post("/unapply",users.unapplyuser)

module.exports= router;