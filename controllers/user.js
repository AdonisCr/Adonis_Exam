require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

const saltRounds = 10;

exports.register = (req, res) => {
  bcrypt.hash(req.body.motDePasse, saltRounds, function (err, hash) {
    
    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      motDePasse: hash
    });

    user.save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.json(error));
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

      bcrypt.compare(req.body.motDePasse, user.motDePasse)
        .then(valid => {
          if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

          res.status(200).json({
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "1h"
            })
          });
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error));
};

exports.getOneUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json(error));
};

exports.updateUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
    .catch(error => res.status(400).json(error));
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
    .catch(error => res.status(400).json(error));
};

