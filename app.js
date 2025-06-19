require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Titre de ton nouveau projet ici",
      version: "1.0.0",
      description: "Description de l'API de ton nouveau projet",
      contact: {
        name: "Ton nom ici",
        email: "ton.email@exemple.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Laisse ce chemin ou adapte-le
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("✅ Connexion MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes à définir ici
// const exempleRouter = require("./routers/exemple");
// app.use("/exemples", exempleRouter);
// ...

module.exports = app;

