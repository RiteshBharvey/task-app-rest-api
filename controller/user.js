const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const setCookies = require("../utils/cookies");
const { ErrorHandler } = require("../middlewares/error");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("user already exist", 404));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  //console.log(user);
  setCookies(user, res, "Registered user successfully", 201);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  //   console.log(req.body);
  const user = await User.findOne({ email }).select("+password");
  //   console.log(user);
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect password", 404));
  }
  setCookies(user, res, `welcome back ${user.name}`, 200);
};

const myProfile = (req, res, next) => {
  res.status(200).json({ success: true, userDetails: req.userDetails });
};

const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: "User logged out" });
};

module.exports = {
  register,
  login,
  myProfile,
  logout,
};
