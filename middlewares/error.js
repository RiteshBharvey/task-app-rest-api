class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ status: false, message: err.message || "Internal Server error" });
};


module.exports = { ErrorHandler, errorMiddleware };
