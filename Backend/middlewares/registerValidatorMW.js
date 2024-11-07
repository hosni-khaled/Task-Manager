const validator = require("../util/registerValidator");

const sendResponse = (res, status, message) => {
  res.status(status).json({
    status: "fail",
    message,
  });
};

module.exports = (req, res, next) => {
  let valid = validator(req.body);
  if (valid) {
    next();
  } else {
    if (validator.errors[0].instancePath == "/password")
      return sendResponse(
        res,
        403,
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit."
      );
    if (validator.errors[0].instancePath == "/email")
      return sendResponse(res, 403, "Invalid email address format.");
    if (validator.errors[0].instancePath == "/phoneNumber")
      return sendResponse(res, 403, "Invalid phone number format.");
    else {
      return sendResponse(res, 403, validator.errors);
    }
  }
};
