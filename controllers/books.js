const Book = require("../schemas/books");

exports.createBook = (req, res) => {
  const book = new Book({
    titre: req.body.titre,
    categorie: req.body.categorie,
    annee: req.body.annee,
    userId: req.userId
  });

  book.save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error))
};

exports.getBooks = (req, res) => {
  Book.find()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error))
};

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error))
};

exports.getAllBooks = (req, res) => {
  Book.find()
    .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error))
};

exports.updateBook = (req, res) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

