const express = require("express");
const router = express.Router();

const controllerHandler = (promise, params) => async (req, res, next) => {
  console.log("params ", params);
  // console.log("promise ", promise);

  const boundParams = params ? params(req, res, next) : [];
  try {
    console.log("boundParams ", boundParams);

    const result = await promise(...boundParams);
    console.log("result ", result);
    return res.json(result);
  } catch (error) {
    console.log("kiran", error);
    res.status(error.statusCode || 500);
    res.write(`${error.message}`);
    console.log({
      message: error.message,
      stack: error.stackTrace,
      code: error.statusCode || 500
    });
    return res.end();
  }
};

module.exports = controllerHandler;
