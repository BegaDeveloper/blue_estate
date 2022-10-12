const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const nameCheck = (name) => {
  if (!name) {
    return false;
  } else if (name.length < 4) {
    return false;
  } else {
    return true;
  }
};

const nameValidators = [
  { validator: nameCheck, message: "Must be a valid full name." },
];

const emailCheck = (email) => {
  if (!email) {
    return false;
  } else {
    const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return regEx.test(email);
  }
};

const emailValidator = [
  { validator: emailCheck, message: "Must be a valid email." },
];

const passwordCheck = (password) => {
  if (!password) {
    return false;
  } else {
    const regEx = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    return regEx.test(password);
  }
};

const passwordValidator = [
  {
    validator: passwordCheck,
    message: "Password must be valid",
  },
];

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    validate: nameValidators,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: emailValidator,
  },
  mobile: { type: String, required: true, lowercase: true },
  password: {
    type: String,
    required: true,
    lowercase: true,
  },
});

/*userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      this.password = hash;
      next();
    });
  });
});
*/

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
