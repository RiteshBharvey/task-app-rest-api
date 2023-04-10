const jwt = require("jsonwebtoken");
const User = require("../model/user");

const isAuthenticated = async(req,res,next)=>{
 const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      status: "false",
      message: "User not logged in",
    });
  }
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  req.userDetails = await User.findById({ _id });
  next();
}

module.exports=isAuthenticated;