require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const userRouter = require("./routers/user");
const bookRouter = require("./routers/books");
const reviewRouter = require("./routers/reviews");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "BookConnect API",
      version: "1.0.0",
      description: "API pour la gestion de livres et avis",
      contact: {
        name: "Adonis",
        email: "adonisoussou737@gmail.com"
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routers/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected!"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/books", bookRouter);
app.use("/reviews", reviewRouter);

module.exports = app;

