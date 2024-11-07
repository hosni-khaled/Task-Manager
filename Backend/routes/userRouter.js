const express = require("express");
const authController = require("./../controllers/authController");
const registerValidator = require("../middlewares/registerValidatorMW");

const router = express.Router();

router.route("/signup").post(registerValidator, authController.signup);
router.route("/login").post(authController.login);

module.exports = router;
