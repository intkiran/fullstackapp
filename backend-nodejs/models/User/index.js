const validateUsername = require("./validate"),
  mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  PASSWORD_SALT_FACTOR = 10,
  jwt = require("jsonwebtoken");
const Constants = require("../../config/constants");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: { type: String, unique: false },
    username: {
      type: String,
      unique: true,
      validate: [{ validator: validateUsername, msg: "Invalid username" }]
    },
    password: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
UserSchema.pre("save", function(next) {
  var user = this;
  console.log("Saving User", next);
  //do password hash only when password is changed or new
  if (!user.isModified("password")) next();
  //Generate password salt
  bcrypt.genSalt(PASSWORD_SALT_FACTOR, function(error, salt) {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, function(error, passwordHash) {
      if (error) return next(error);
      // override the cleartext password with the hashed one
      user.password = passwordHash;
      next();
    });
  });
});

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.generateToken = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    },
    Constants.security.sessionSecret,
    {
      expiresIn: Constants.security.sessionExpiration
    }
  );
};
/* 
  _hashPassword(
    password,
    saltRounds = Constants.security.saltRounds,
    callback
  ) {
    return bcrypt.hash(password, saltRounds, callback);
  } */

const User = mongoose.model("User", UserSchema);

module.exports = User;
