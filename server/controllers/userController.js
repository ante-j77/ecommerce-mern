const User = require("../models/userModel");
const Product = require("../models/productModel");
const Basket = require("../models/basketModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken } = require("../config/jwtToken");
const validateMongodbId = require("../utils/validateMongodbID");
const { generateRefreshToken } = require("../config/refreshToken");

// CREATING USER

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, address, mobile } = req.body;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

// const createUser = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const findUser = await User.findOne({ email });
//   if (!findUser) {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } else {
//     throw new Error("User already exists");
//   }
// });

// LOGING IN

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // provjera da li user postoji
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.comparePassword(password))) {
    // dodajemo refresh token
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// HANDLE REFRESH TOKEN

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (cookie.refreshToken == null) return res.statusCode(401).send();
  if (!cookie.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Refresh Token not found");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Somethig is wrong with Refresh Token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// LOGOUT

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  // provjera postoji li refresh token u cookies
  if (!cookie.refreshToken) return res.sendStatus(204);

  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });

  // ako korisnik nije pronadjen, brisemo cookies s refresh tokenom
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }

  // azuriramo korisnika u bazi podataka - postavi refresh token na prazan string
  await User.findByIdAndUpdate(user._id, { refreshToken: "" });

  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  res.sendStatus(204);
});

// GET ALL USERS

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// GET SINGLE USER
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const getUser = await User.findById(id);
    res.json({ getUser });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE USER

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ deletedUser });
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE USER

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

// BLOCK USER

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      {
        new: true,
      }
    );
    if (!blockUser) {
      throw new Error("User not found");
    }
    res.json({ message: "User blocked" });
  } catch (error) {
    throw new Error(error.message);
  }
});

// UNBLOCK USER
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblockUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!unblockUser) {
      throw new Error("User not found");
    }
    res.json({ message: "User unblocked" });
  } catch (error) {
    throw new Error(error.message);
  }
});

// UPDATE PASSWORD
const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);

  const user = await User.findById(_id);

  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found with this e-mail address");

  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your password <a href="http//localhost:3001/api/user/reset-password/${token}">Click Here</>`;

    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };

    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  // stavimo hash na token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired");

  user.password = await bcrypt.hash(password, 10);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  res.json(user);
});

// USER BASKET
const userBasket = asyncHandler(async (req, res) => {
  const { basket } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    let products = [];
    // pronalazimo korisnika
    const user = await User.findById(_id);
    if (!user) {
      return res(404).json({ message: "User does not exist" });
    }
    // provjeravamo da li korisnik vec ima aktivnu kosaricu u bazi podataka te je uklanjamo
    const alreadyExistBasket = await Basket.findOne({
      orderby: user._id,
    });
    if (alreadyExistBasket) {
      alreadyExistBasket.remove();
    }

    // dodajemo proizvode u kosaricu
    for (let i = 0; i < basket?.length; i++) {
      let object = {};
      object.productId = basket[i]._id;
      object.quantity = basket[i].quantity;
      /*let getPrice = await Product.findById(
        basket[i]._id.select("price").exec()
      );
      object.price = getPrice.price; */
      object.price = basket[i].price;

      products.push(object);
    }

    // izracun ukupne cijene proizvoda u kosarici
    let basketTotal = 0;
    for (let i = 0; i < products?.length; i++) {
      basketTotal += products[i].price * products[i].quantity;
    }

    let newBasket = await new Basket({
      products,
      basketTotal,
      orderby: user?._id,
    }).save();
    res.json(newBasket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const getUserBasket = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const basket = await Basket({ orderby: _id }).populate("products.product");

    if (!basket) {
      return res.status(404).json({ message: "Basket not found" });
    }
    res.json(basket);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Inernal server error" });
  }
});

//WISHLIST
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const user = await User.findById(_id).populate("wishlist");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  userBasket,
  getUserBasket,
  getWishlist
};
