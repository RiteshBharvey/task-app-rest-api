const express = require("express");
const {register,login,myProfile, logout} = require("../controller/user");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

// register user
router.post("/new",register);
// login user
router.post("/login",login);
// get userDetails
router.get("/myprofile",isAuthenticated, myProfile);
// logout user
router.get("/logout",isAuthenticated,logout);

module.exports=router;