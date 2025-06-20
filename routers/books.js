const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const bookCtrl = require("../controllers/books");

router.post("/", auth, bookCtrl.createBook);
router.get("/", bookCtrl.getBooks);
router.put('/:id', booksCtrl.updateBook);
router.delete('/:id', booksCtrl.deleteBook);

module.exports = router;




