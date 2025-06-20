const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  categorie: { type: String, required: true },
  annee: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Book", bookSchema);

