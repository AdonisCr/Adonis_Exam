const Review = require("../schemas/reviews");

exports.addReview = (req, res) => {
  const review = new Review({
    bookId: req.body.bookId,
    userId: req.userId,
    commentaire: req.body.commentaire,
    note: req.body.note
  });

  review.save()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.json(error))
};

exports.getBookReviews = (req, res) => {
  Review.find({ bookId: req.params.bookId })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error }));
};

