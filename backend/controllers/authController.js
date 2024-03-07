const tryCatch = require("../utils/tryCatch");
const User = require("../models/userModel");
const VerificationToken = require("../models/verificationTokenModel");

const generateToken = require("../config/generateToken");
const { generateOTP, transport, plainEmailTemplate } = require("../utils/mail");
const { isValidobjectId } = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = tryCatch(async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    throw new Error("User already exists!!");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = await User.create({ ...req.body, password: hash });
  if (newUser) {
    const token = generateToken(newUser._id);
    const { password, ...others } = newUser._doc;

    const OTP = generateOTP();
    VerificationToken.create({
      owner: newUser._id,
      token: OTP,
    }).catch((err) => {
      throw new Error("Cannot Send OTP! Please try again!");
    });

    transport().sendMail({
      from: "emailverification@email.com",
      to: newUser.email,
      subject: "OTP for your email account",
      html: `<h1>${OTP}</h1>`,
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  }
});

const signIn = tryCatch(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email, user);
  if (!user) throw new Error("User not found!");

  const isCorrect = bcrypt.compare(req.body.password, user.password);

  if (!isCorrect) throw new Error("Wrong Credentials!");

  const token = generateToken(user._id);
  const { password, ...others } = user._doc;

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
});

const verifyEmail = tryCatch(async (req, res) => {
  const { userId, OTP } = req.body;
  if (!userId || !OTP.trim())
    throw new Error("Invalid request, missing parameters!");

  // if (!isValidobjectId(userId)) throw new Error("Invalid user id!");

  const user = await User.findById(userId);
  if (!user) throw new Error("Sorry, user not found!");

  if (user.verified) throw new Error("This account is alread! ");

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) throw new Error("Sorry, user not found!");

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) throw new Error("Please provide a valid token!");

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  transport().sendMail({
    from: "emailverification@email.com",
    to: user.email,
    subject: "Verify your email account",
    html: plainEmailTemplate(
      "Email Verified Successfully",
      "Thanks for connecting with us"
    ),
  });

  const { password, ...others } = user._doc;

  res.status(200).json(others);
});

const googleAuth = tryCatch(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = generateToken(user._id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user._doc);
  } else {
    const newUser = new User({
      ...req.body,
      fromGoogle: true,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(savedUser._doc);
  }
});

module.exports = { signUp, signIn, googleAuth, verifyEmail };
