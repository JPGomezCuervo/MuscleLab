const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GOOGLE_CLIENT_ID =
  "1060018757623-sk8opucj3l59lu8u1e6qmsuggnqtgr0h.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const { User } = require("./src/db");
const bcryptjs = require("bcryptjs");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ where: { googleId: profile.id } });
        if (user) {
          return cb(null, user);
        } else {
          const hashedPassword = await bcryptjs.hash("123456", 10);
          const newUser = await User.create({
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.email,
            phone: profile.id,
            password: hashedPassword,
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
