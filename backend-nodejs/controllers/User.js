const UserService = require("../services/User");
const getUser = async username => {
  console.log("getUser controller");
  const response = await UserService.getUser(username);
  return response;
};
const loginUser = async req => {
  const response = await UserService.loginUser(req);
  return response;
};
const logout = async (req, res) => {
  delete req.headers["x-access-token"];

  return res.status(200).json({
    message: "User has been successfully logged out"
  });
};
const getAllUsers = async () => {
  const response = await UserService.getAllUsers();

  return response;
};
const addUser = async newUser => {
  console.log("newUser ", newUser);
  const user = await UserService.addUser(newUser);
  return user;
};

module.exports = { getUser, getAllUsers, addUser, loginUser };
