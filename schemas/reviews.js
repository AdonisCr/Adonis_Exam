const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commentaire: { type: String },
  note: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);

