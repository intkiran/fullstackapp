const express = require("express");
const bodyParser = require("body-parser");
var database = require("./database.js");

const router = express.Router();
//const route = require("./routes/route");
const product = require("./routes/product.route"); // Imports routes for the products

let port = 2000;
const app = express();
//catch mongodb error
app.use((request, response, next) => {
  if (database.connection.readyState != 1) {
    var err = new Error("Failed to connect to mongodb!");
    err.status = 500;
    next(err);
  } else {
    next();
  }
});
//db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use("/", route);
app.use("/products", product);

app.listen(port, () => {
  console.log("router " + app);

  console.log("Web server is up and running at " + port);
});
