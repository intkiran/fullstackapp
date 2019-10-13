const bcrypt = require("bcrypt");

exports.test = function(req, res) {
  res.send("testcontroller");
};

let hash = bcrypt.hashSync("myPassword", 10);
console.log("kiran", hash);
if (bcrypt.compareSync("myPassword", hash)) {
  console.log("matched", hash);
} else {
  console.log("not matched", hash);
}
