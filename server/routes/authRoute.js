const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

router.get("/failure", (req, res) => {
  res.send("Something went wrong");
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/protected',
  failureRedirect: '/auth/login',
  failureFlash: true // Enable flashing of error messages
}));

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create user in the database
    const user = await User.create({ username, email, password: hashedPassword });
    res.send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
