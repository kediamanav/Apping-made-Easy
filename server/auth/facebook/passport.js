var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails',
      'first_name',
      'last_name'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAsync({
      'facebook.id': profile.id
    })
      .then(function(user) {
        if (!user) {
          console.log(profile);
          if(!profile.emails){
            user = new User({
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email: profile.name.givenName+"."+profile.name.familyName+"@facebook.com",
              role: 'user',
              provider: 'facebook',
              facebook: profile._json
            });
          }
          else{
            user = new User({
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email: profile.emails[0].value,
              role: 'user',
              provider: 'facebook',
              facebook: profile._json
            });
          }
          user.saveAsync()
            .then(function(user) {
              return done(null, user[0]);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          //console.log(user);
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
