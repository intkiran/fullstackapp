const express = require("express");
const bodyParser = require("body-parser");
let port = 2000;
const app = express();

app.listen(port, () => {
  console.log("Web server is up and running at " + port);
});
