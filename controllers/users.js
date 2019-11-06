var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// INSERT USERS.

const User = require('../domain/users');
// not work.
router.get('/', function(req, res, next){
  const user = new User({
    name: 'John'
  });
  const { valid, errors } = user.validate();
  if(!valid){
    console.log('[not validate]', errors);
    return res.status(422).json(errors);
  }
  // validate
  res.json(user);
})
// work

router.get('/1', function(req, res, next){
  const user = new User({
    name: 'This is my name',
    age: 25
  });
  const { valid, errors } = user.validate();
  if(!valid){
    console.log('[not validate]', errors);
    return res.status(422).json(errors);
  }
  // validate
  res.json(user);
})
module.exports = router;
