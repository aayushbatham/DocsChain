const express = require("express");
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
require("./middlewares/auth");
//
dotenv.config();
require("./db/db");
const PORT = process.env.PORT || 4000;
const app = express();
//
app.use(session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("query", req.query);
  console.log("params", req.params);
  console.log("body", req.body);
  next();
});

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  });

app.use('/auth', authRoute);


app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  });


app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      req.session.destroy();
      res.send('Goodbye!');
    });
  });



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
