'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const {User, Lesson} = require('./models');

const jsonParser = bodyParser.json();

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL || global.DATABASE_URL
};

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

const database = {
};

app.use(passport.initialize());


passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };
        return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

// app.use(bodyParser);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      session: false
    }),
    (req, res) => {
        let user;
        User
            .findOrCreate({googleId: req.user.googleId}, {accessToken: req.user.accessToken}, (err,result) =>{
                user = result;
                if(err !== null){
                    throw new Error(err);
                }
                res.cookie('accessToken', req.user.accessToken, {expires: 0}).redirect('/lessons');
            });
      // res.cookie('accessToken', req.user.accessToken, {expires: 0});
      // res.redirect('/lessons');        
    }
);

app.get('/api/users/:accessToken', 
    // passport.authenticate('bearer', {session: false}),
    (req,res) =>{
      console.log('we made it this far');
        User
            .find({accessToken: req.params.accessToken})
            .then(user => {
              console.log('this is our user', user);
                res.json(user);
            });
});

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
      res.json({
        googleId: req.user.googleId
      });
    }
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);

app.put('/api/users/:userId/lessons/',
    passport.authenticate('bearer', {session: false}),
    jsonParser,
    (req,res) => {
        console.log('this is our put request', req.body);
        User
            .update({googleId: req.params.userId}, {$push:{lessons:req.body}})
            .exec()
            .then(() => {
                User
                    .find({googleId: req.params.userId})
                    .then(_res => {
                      console.log(_res);
                      res.json(_res);
                    });
            });

    }
);

app.post('/api/lessons',
    // passport.authenticate('bearer', {session: false}),
    jsonParser,
    (req,res) => {
        Lesson
            .create({
                title: req.body.title,
                questions: req.body.questions
            })
            .then(res=> console.log(res))
            .catch(err=> console.log(err));
    }
);

app.get('/api/lessons',
    passport.authenticate('bearer', {session:false}),
    (req,res) => {
        Lesson
            .find()
            .then(lessons => {
                res.json(lessons);
            })
            .catch(err => {
                res.json(err);
            });
    }
);

app.get('/api/lessons/:lessonId',
    passport.authenticate('bearer', {session:false}),
    (req,res) => {
        Lesson
            .findById(req.params.lessonId)
            .then(lesson => {
                res.json(lesson);
            })
            .catch(err => {
                res.json(err);
            });
    }
);

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(databaseUrl=secret.DATABASE_URL, port=3001) {
    return new Promise((resolve, reject) => {
        console.log(databaseUrl);
        mongoose.connect(databaseUrl, err=>{
            if(err){
                return reject(err);
            };
        });
        server = app.listen(port, () => {
            resolve();
        }).on('error', err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};