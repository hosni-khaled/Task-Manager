const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

exports.signup = async (req, res) => {
  try {
    let { username, email } = req.body;
    let usernameIsExist = await User.findOne({ username });
    if (usernameIsExist) {
      return res.status(400).json({
        status: "fail",
        message: "Username is already exist...",
      });
    }
    let emailIsExist = await User.findOne({ email });
    if (emailIsExist) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already exist...",
      });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    user.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(403).json({
      status: "fail",
      message: "Please provide email or password!",
    });
  }
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(403).json({
      status: "fail",
      message: "Incorrect username or password!",
    });
  }
  let correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return res.status(403).json({
      status: "fail",
      message: "Incorrect username or password!",
    });
  }
  let token = signToken(user._id);
  res.set("Authorization", `Bearer ${token}`);
  user.password = undefined;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userIsExist = await User.findById(decoded.id);
    if (!userIsExist) {
      return res.status(401).json({
        status: "fail",
        message: "The token beloning to this user does not longer exsit.",
      });
    }

    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};
