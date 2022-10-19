const express = require('express')
const router = express.Router({mergeParams:true});
const users = require('../controllers/users')
router.use(express.urlencoded({extended:true}))

router.post("/company",users.companyRegisterForm );

  router.post("/", users.userRegisterForm);

  router.post('/login', users.loginForm)

  router.put("/",users.editForm);

  router.delete("/", users.deleteForm);

module.exports= router;