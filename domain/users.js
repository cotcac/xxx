const { attributes } = require('structure');
 
const User = attributes({
    name: {
      type: String,
      minLength: 10
    },
    age: {
      type: Number,
      required: true
    }
  })(class User { });
  module.exports = User;