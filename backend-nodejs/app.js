const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//const route = require("./routes/route");
const product = require("./routes/product.route"); // Imports routes for the products

let port = 2000;
const app = express();
// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = "mongodb://localhost:27017/products";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use("/", route);
app.use("/products", product);

app.listen(port, () => {
  console.log("router " + app);

  console.log("Web server is up and running at " + port);
});
