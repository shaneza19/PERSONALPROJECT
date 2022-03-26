//JWT Passport
require('dotenv').config();
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../../models');
const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
    const targetUser = await db.User.findOne({ where: { id: payload.id} });

    if (targetUser){
        done(null, targetUser);
    } else {
        done(null, false);
    }
});

passport.use("jwt", JWTStrategy);


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    User.findById(user.id, function (err, user) {
        done(err, user);
    });
});