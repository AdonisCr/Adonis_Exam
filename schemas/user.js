const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

