const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {passReqToCallback: true};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

const bcrypt = require('bcryptjs'); //encrypt password
const mdl = require('../models');
const jwt = require('jsonwebtoken');


// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function (req, jwt_payload, next) {
  console.log('payload received', jwt_payload);
  try {
    let user = await mdl.User.findOne({where:{ id: jwt_payload.id }, raw: true})
    console.log('[User]',user);
  
    if (user) {
      req.user = user;

      next(null, user);
    } else {
      next(null, false);
    }
    
  } catch (error) {
    next(null, false);
    
  }
 
});
// use the strategy
passport.use(strategy);
// 1
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status('422').send('input email and password please!');
  }
  let user = await mdl.User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'No such user found' });
  }
  if (!(bcrypt.compareSync(password, user.password))) {
    return res.status(401).json({ msg: 'Password is incorrect' });

  }

  // from now on we'll identify the user by the id and the id is the 
  // only personalized value that goes into our token
  let payload = { id: user.id, role: user.role };
  let token = jwt.sign(payload, jwtOptions.secretOrKey,{ expiresIn: '1h' });
  res.json({ msg: 'ok', token: token });


});

// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  console.log('[request.user]',req.user);
  
  res.json('Success! You can now see this without a token.');
});

// logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/')
}); // end logout.

module.exports = router;
