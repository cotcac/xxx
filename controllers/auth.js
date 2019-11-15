const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = { passReqToCallback: true };
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";

const bcrypt = require("bcryptjs"); //encrypt password
const mdl = require("../models");
const jwt = require("jsonwebtoken");

// lets create our strategy for web token
// eslint-disable-next-line prefer-const
let strategy = new JwtStrategy(jwtOptions, async function(
  req,
  jwt_payload,
  next
) {
  try {
    const user = await mdl.User.findOne({
      where: { id: jwt_payload.id },
      raw: true
    });

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
router.post("/login", async function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status("422").send("input email and password please!");
  }
  const user = await mdl.User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(422)
      .json({ success: false, message: "No such user found" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res
      .status(422)
      .json({ success: false, message: "Password is incorrect" });
  }

  // from now on we'll identify the user by the id and the id is the
  // only personalized value that goes into our token
  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: "1h" });
  res.json({ success: true, token: token });
});

// protected route
// router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
//   console.log('[request.user]',req.user);

//   res.json('Success! You can now see this without a token.');
// });

// logout
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
}); // end logout.

module.exports = router;
