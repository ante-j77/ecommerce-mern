const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const validateMongodbId = require("../utils/validateMongodbID");
const slugify = require("slugify");

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json({ message: `Product with ID: ${id} has been deleted.` });
  } catch (error) {
    throw new Error(error);
  }
});

// GET PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProduct = await Product.findById(id);
    res.json(getProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // filtriranje proizvoda
    const queryObj = { ...req.query };

    // isključivanje odredjenih polja
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `€${match}`
    );

    let query = Product.find(JSON.parse(queryString));

    // Sortiranje
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // ogranicenje polja
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This Page does not exists");
      }
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  validateMongodbId(_id);

  try {
    const user = await User.findById({ _id });
    const productAlreadyAdded = user.wishlist.find(
      (id) => id.toString() === prodId
    );

    if (!prodId || !validateMongodbId(prodId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // dodavanje ili uklanjanje proizvoda iz liste zelja
    let updateQuery;
    if (productAlreadyAdded) {
      updateQuery = {
        $pull: { wishlist: prodId },
      };
    } else {
      updateQuery = {
        $push: { wishlist: prodId },
      };
    }

    let updatedUser = await User.findByIdAndUpdate(_id, updateQuery, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
};
