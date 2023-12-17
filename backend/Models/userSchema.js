const mongoose = require("mongoose");
const {
  userSchema,
  loginSchema,
  updateUserSchema,
} = require("../schemas/userSchema");
// const { userSchema } = require('../schemas/userSchema')
const bcrypt = require("bcryptjs");
const sendEmail = require("../utills/sendEmail");
const { generateRandomToken } = require("../utills/tokenGenerator");
const CustomError = require("../utills/myownError");
const userMongooseSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: {
    type: String,
    unique: [true, "User with this email already exists"],
  },
  profileUrl: {
    type: String,
    default: null,
  },
  password: String,
  isAllDetails: {
    type: Boolean,
    default: false,
  },
  wNumber: {
    type: String,
    default: null,
  },
  cNumber: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  passWordResetToken: String,
  isPasswordResetTokenVerified: {
    type: Boolean,
    default: false,
  },
  emailConfirmationToken: String,
  passTokenExpire: Date,

  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});
userMongooseSchema.statics.login = async function (data) {
  const { error } = loginSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new CustomError("validation error", errorMessages);
  }
  const user = await this.findOne({ email: data.email });
  if (user) {
    const result = await bcrypt.compare(data.password, user.password);
    if (result) {
      return user;
    } else {
      throw new CustomError("Email", "Email or password is incorrect");
    }
  } else {
    throw new CustomError("Email", "Email or password is incorrect");
  }
};
userMongooseSchema.statics.signUp = async function (data) {
  const { error } = userSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new CustomError("validation error", errorMessages);
  }
  const { name, userName, email, password } = data;

  const exists = await this.findOne({ email });
  if (exists) {
    throw new CustomError(
      "Email",
      "Account with this email has already been registered"
    );
  }
  const token = generateRandomToken();
  const mailOptions = {
    to: email,
    subject: "GB Arts Bazaar Email Confirmation",
    message: `Your email verification code for GBArts Bazaar is : ${token}`,
  };

  try {
    await sendEmail(mailOptions);
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await this.create({
      name,
      userName,
      email,
      password: hashedPass,
      emailConfirmationToken: token,
    });
    return user;
  } catch (error) {
    console.log(error.code);
    throw new CustomError("smtp", error.message);
  }
};

userMongooseSchema.statics.updateUserData = async function (data) {
  const { error } = updateUserSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new CustomError("validation error", errorMessages);
  }
  const { email, wNumber, cNumber, address, profileUrl } = data;

  const user = await this.findOne({ email });
  if (user) {
    user.wNumber = wNumber;
    user.cNumber = cNumber;
    user.address = address;
    user.profileUrl = profileUrl;
    user.isAllDetails = true;
    await user.save();
    return user;
  } else {
    throw new CustomError("user", "No user found with this email");
  }
};

userMongooseSchema.statics.verifyEmail = async function (data) {
  const exists = await this.findOne({ email: data.email });

  if (exists) {
    // console.log(exists.emailConfirmationToken)
    const match = exists.emailConfirmationToken == data.token;
    if (match) {
      exists.isEmailVerified = true;
      exists.emailConfirmationToken = undefined;
      await exists.save();
      return match;
    } else {
      throw Error("Invalid Token");
    }
  } else {
    throw Error("User with this email doesn't exists");
  }
};
userMongooseSchema.statics.forgotPasswordRequest = async function (data) {
  const exists = await this.findOne({ email: data.email });

  if (exists) {
    const token = generateRandomToken();
    exists.passWordResetToken = token;

    await exists.save();

    const mailOptions = {
      to: data.email,
      subject: "GB Arts Bazaar Forget Password Recovery",
      message: `Your Password reset token for GBArts Bazaar is : ${token}`,
    };

    try {
      await sendEmail(mailOptions);
      exists.passWordResetToken = token;
      exists.passTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await exists.save();
    } catch (error) {
      throw Error("Some error occured please try again later");
    }
  } else {
    throw Error("User With this email doesn't exists");
  }
};
userMongooseSchema.statics.forgotPasswordTokenVerify = async function (data) {
  const exists = await this.findOne({ email: data.email });

  if (exists) {
    // console.log(exists.emailConfirmationToken)
    const match = exists.passWordResetToken == data.token;
    console.log(match);
    if (match) {
      // exists.isEmailVerified = true
      exists.passWordResetToken = undefined;
      exists.passwordResetTokenExpire = undefined;
      exists.isPasswordResetTokenVerified = true;
      await exists.save();
      return match;
    } else {
      throw Error("Invalid Token or has been expired");
    }
  } else {
    throw Error("User with this email doesn't exists");
  }
};

userMongooseSchema.statics.forgetPasswordUpdate = async function (data) {
  const exists = await this.findOne({ email: data.email });

  if (exists) {
    if (exists.isPasswordResetTokenVerified) {
      const hashedPass = await bcrypt.hash(data.password, 10);
      exists.password = hashedPass;
      exists.isPasswordResetTokenVerified = undefined;
      await exists.save();
    } else {
      throw Error(
        "Please verify password reset token before changing password"
      );
    }
  } else {
    throw Error("User with this email doesn't exists");
  }
};

module.exports = mongoose.model("User", userMongooseSchema);
