var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'google.id': profile.id
    })
      .then(function(user) {
        if (!user) {
          //console.log(profile);
          user = new User({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value.split('@')[0],
            provider: 'google',
            google: profile._json
          });
          user.saveAsync()
            .then(function(user) {
              return done(null, user[0]);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
