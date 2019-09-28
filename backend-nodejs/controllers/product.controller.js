const Product = require("../models/product.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};
exports.createProduct = function(request, response) {
  let product = new Product({
    name: request.body.name,
    price: request.body.price
  });
  product.save(err => {
    if (err) {
      console.log("Error in saving Product object");
      next(err);
    }
    response.send("Product Created successfully");
  });
};
exports.getProductById = function(request, response) {
  Product.findById(request.params.id, (err, result) => {
    if (err) return next(err);
    response.send(result);
  });
};
exports.updateProduct = function(request, response) {
  Product.findByIdAndUpdate(
    request.params.id,
    { $set: request.body },
    (error, result) => {
      if (error) next(error);
      response.send(result);
    }
  );
};
exports.deleteProduct = function(request, response) {
  Product.findByIdAndRemove(request.params.id, (error, result) => {
    if (error) next(error);
    response.send(result);
  });
};
