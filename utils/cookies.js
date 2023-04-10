const jwt = require("jsonwebtoken");

const setCookies = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //console.log(token);

  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
      secure: process.env.NODE_ENV==="Development" ? false : true,
    })
    .json({ status: "success", message });
};

module.exports = setCookies;
