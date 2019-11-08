const { attributes } = require('structure');
 
const User = attributes({
    name: {
      type: String,
      minLength: 3
    },
    age: {
      type: Number,
      required: true
    }
  })(class User { });
  module.exports = User;