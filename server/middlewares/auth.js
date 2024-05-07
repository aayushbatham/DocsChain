// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config();
// const User = require('../models/userSchema');

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.SECRET,
//     callbackURL: process.env.CALLBACK
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             let user = await User.findOne({ oauthProviderId: profile.id });

//             if (!user) {
//                 user = new User({
//                     oauthProvider: 'google',
//                     oauthProviderId: profile.id,
//                     email: profile.emails[0].value,
//                     name: profile.displayName
//                 });
//                 await user.save();
//             }

//             return done(null, user);
//         } catch (error) {
//             return done(error);
//         }
//     }
// ));

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });


