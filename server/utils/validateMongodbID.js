const mongoose = require("mongoose");

// provjera da li je ID ispravan

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new Error("ID is not valid");
  }
};

module.exports = validateMongodbId;
