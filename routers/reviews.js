const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const reviewCtrl = require("../controllers/reviews");


router.post("/", auth, reviewCtrl.addReview);
router.get("/:bookId", reviewCtrl.getBookReviews);

module.exports = router;

