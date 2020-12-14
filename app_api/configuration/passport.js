const passport = require('passport');
const LokalnaStrategija = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
  new LokalnaStrategija(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, pkKoncano) => {
      User.findOne(
        { elektronskiNaslov: email },
        (error, user) => {
          if (error)
            return pkKoncano(error);
          if (!user) {
            return pkKoncano(null, false, {
              "message": "Failed email"
            });
          }
          if (!user.preveriGeslo(geslo)) {
            return pkKoncano(null, false, {
              "message": "Failed password"
            });
          }
          return pkKoncano(null, user);
        }
      );
    }
  )
);