const User = require("../models/User");
const getUser = async id => {
  const user = await User.findOne({ id });
  return user;
};

const getAllUsers = async () => {
  return User.find({}).exec();
};
const loginUser = async user => {
  const username = user.username;
  const password = user.password;

  const newUser = await User.findOne({ username });
  if (!newUser || !newUser.authenticate(password)) {
    //this.throwError(401,'Please verify your credentials.')
    const err = new Error("Please verify your credentials.");
    err.status = 401;
    throw err;
  }

  return { user: newUser.toJSON(), token: newUser.generateToken() }; //user.generateToken();
};
const addUser = async user => {
  console.log("kiran babu", user);
  let newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password
  });
  let addedUser = await newUser.save();
  return addedUser;
};
module.exports = {
  getUser,
  getAllUsers,
  addUser,
  loginUser
};
