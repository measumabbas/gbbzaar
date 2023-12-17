const ErrorHander = require("../utills/errorhandler");
const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");
const {
  userSchema,
  loginSchema,
  updateUserSchema,
} = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const cloudibary = require("cloudinary");
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.signUp(req.body);

    const token = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      token,
      isEmailVerified: user.isEmailVerified,
    });
  } catch (error) {
    if (error.name === "smtp") {
      return next(new ErrorHander(error.message, 403));
    }
    // console.log(error.name)
    if (error.name === "Email") {
      return next(new ErrorHander(error.message, 409));
    } else if (error.name === "validation error") {
      return next(new ErrorHander(error.message, 400));
    } else {
      return next(new ErrorHander(error, 500));
    }
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    await User.verifyEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    await User.forgotPasswordRequest(req.body);

    res.status(200).json({
      success: true,
      message: "Password Reset token sent successfully",
    });
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};

exports.forgotPasswordTokenVerify = async (req, res, next) => {
  try {
    await User.forgotPasswordTokenVerify(req.body);
    res.status(200).json({
      success: true,
      message: "Password Reset token verified successfully",
    });
  } catch (error) {
    return next(new ErrorHander(error, 500));
  }
};
exports.forgetPasswordUpdate = async (req, res, next) => {
  try {
    await User.forgetPasswordUpdate(req.body);
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error)
    return next(new ErrorHander(error, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      success: true,
      token,
      isEmailVerified: user.isEmailVerified,
      isAllDetails: user.isAllDetails,
    });
  } catch (error) {
    if (error.name === "Email") {
      return next(new ErrorHander(error.message, 409));
    } else if (error.name === "validation error") {
      return next(new ErrorHander(error.message, 400));
    } else {
      return next(new ErrorHander(error, 500));
    }
  }
};

exports.updateUserData = async (req, res, next) => {
  try {
    const user = await User.updateUserData(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "validation error") {
      return next(new ErrorHander(error.message, 400));
    } else if (error.name === "user") {
      return next(new ErrorHander(error.message, 403));
    } else return next(new ErrorHander(error.message, 500));
  }
};

exports.getUser = async (req, res,next) => {
  try {
    const { id } = req.query;
    console.log(id)

    if (!id) {
      return next(new ErrorHander("Please provide user is", 400));
    } else {
      const user = await User.findById(id);
      if (!user) {
        return next(new ErrorHander("No any user with this id", 400));
      } else {
        res.status(200).json({
          success: true,
          user,
        });
      }
    }
  } catch (error) {
    console.log(error)
    return next(new ErrorHander(error.message, 500));
  }
};

exports.loadUser = async (req, res) => {
  try {
    const token = req.header("Authorization");
    // console.log(token)
    if (token) {
      const token = req.header("Authorization").split(" ")[1];
      // console.log(token)
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        // console.log(err)
        if (err) {
          return res
            .status(401)
            .json({ error: "Invalid token , please login again" });
        }

        const userId = decoded.payload;
        // console.log(userId)
        const user = await User.findOne({ _id: userId });
        res.status(200).json({
          success: true,
          user,
        });
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Please provide token to access this route",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
