const { attributes } = require("structure");

const User = attributes({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    email: true,
    required: true,
    minLength: 3
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: String,
    required: true,
    minLength: 3,
    default: "user" // admin // worker
  }
})(class User {});
module.exports = User;
