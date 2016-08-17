#!/usr/bin/env node --harmony
'use strict';
const
  GOOGLE_CLIENT_ID = '{google client id}',
  GOOGLE_CLIENT_SECRET = '{google secret key}',
  log = require('npmlog'),
  request = require('request'),
  express = require('express'),
  passport = require('passport'),
  app = express(),
  redisClient = require('redis').createClient(),
  RedisStore = require('connect-redis')(express),
  GoogleStrategy = require('passport-google-oauth20').Strategy;


// START:redis-client

redisClient
  .on('ready', function () {
    log.info('REDIS', 'ready');
  })
  .on('error', function (err) {
    log.error('REDIS', err.message);
  });

// START:passport-serialize

passport.serializeUser(function (user, done) {
  done(null, user.identifier);
});
passport.deserializeUser(function (id, done) {
  done(null, {identifier: id});
});

// START:passport-use

/* passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    profile.identifier = identifier;
    return done(null, profile);
  }
)); */

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/user"
  },
  function(accessToken, refreshToken, profile, cb) {
    let user = { googleId: profile.id };
    log.info('PASSPORT', 'new GoogleStrategy');
    return cb(user);

    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
  }
));

// START:middleware

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({
  secret: 'unguessable',
  store: new RedisStore({
    client: redisClient
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// START:use-static

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/bower_components'));

const config = {
  bookdb: 'http://localhost:5984/books/',
  b4db: 'http://localhost:5984/b4/'
};
require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
require('./lib/bundle.js')(config, app);

// START:get-auth

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'], failureRedirect: '/auth/logout' }),
  function(req, res) {
    log.info('GOOGLE', 'authentication failed');
    // Successful authentication, redirect home.
    authed(req, res);
  });

// START:authed-middleware

const authed = function (req, res, next) {
  res.json(200, 'authenticated ~ loading app ...');
};

// START:get-user

app.get('/api/user', authed, function (req, res) {
  res.json(req.user);
});

// START:get-user-bundles

app.get('/api/user/bundles', authed, function (req, res) {
  let userURL = config.b4db + encodeURIComponent(req.user.identifier);
  request(userURL, function (err, couchRes, body) {
    if (err) {
      res.json(502, {error: "bad_gateway", reason: err.code});
    } else if (couchRes.statusCode === 200) {
      res.json(JSON.parse(body).bundles || {});
    } else {
      res.send(couchRes.statusCode, body);
    }
  });
});

// START:put-user-bundles

app.put('/api/user/bundles', [authed, express.json()], function (req, res) {
  let userURL = config.b4db + encodeURIComponent(req.user.identifier);
  request(userURL, function (err, couchRes, body) {
    if (err) {
      res.json(502, {error: "bad_gateway", reason: err.code});
    } else if (couchRes.statusCode === 200) {
      let user = JSON.parse(body);
      user.bundles = req.body;
      request.put({url: userURL, json: user}).pipe(res);
    } else if (couchRes.statusCode === 404) {
      let user = {bundles: req.body};
      request.put({url: userURL, json: user}).pipe(res);
    } else {
      res.send(couchRes.statusCode, body);
    }
  });
});

app.listen(3000, function () {
  console.log("hello, dave.");
});

