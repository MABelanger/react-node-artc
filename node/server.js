const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy
const FileStore = require('session-file-store')(session);
const utils = require('./utils');
const dotenv = require('dotenv');


// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is not set.
if(!(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
  utils.overwriteEnv('.env.default.development')
}

if(process.env.USERS){
  USERS = JSON.parse(process.env.USERS);
}

function handleGetJson(res, dbJson) {
  let usersFilePath = path.join(__dirname, dbJson);
  fs.access(usersFilePath, fs.constants.F_OK, (err) => {
    if(err) {
      res.json([]);
    } else {
      let readable = fs.createReadStream(usersFilePath);
      readable.pipe(res);
    }
  });
}

function handleGetUserJson(res, user) {
  return res.status(200).json(user);
}

function handleGetNeedToLogin(res) {
  let error = {
    error : 'need to login!'
  }
  return res.status(401).json(error);
}

// body-parser for retrieving form data
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Headers to enable Cross-origin resource sharing (CORS)
let middlewareCors = require('./middlewares/cors');
let middlewareUserAgent = require('./middlewares/userAgent');

app.use(middlewareCors);
app.use(middlewareUserAgent);

let configSession = {
  store: new FileStore(),
  secret: process.env.SESSION_SECRET,
  proxy: true,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV !== "development"
  }
};

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  let validUserId = null;
  for(let i=0; i<USERS.length; i++) {
    if(id == USERS[i].id) {
      done(null, USERS[i]);
    }
  }
});

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    for(let i=0; i<USERS.length; i++) {
      if (username === USERS[i].username && password === USERS[i].password) {
        return done(null, USERS[i]);
      }
    }
    return done(null, false, {"subject": "User not found."});
  })
);

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {
    if(error) {
      return res.status(500).json(error);
    }
    if(!user) {
      let error = {
        error : 'wrong user or password'
      }
      return res.status(401).json(error);
    }
    req.login(user, function(err){
      res.json({user: user});
    });
  })(req, res, next);
});

app.use(express.static("public"));


// private get & post
app.get('/part_up.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handleGetJson(res, '/db/part_up.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get('/part_down.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handleGetJson(res, '/db/part_down.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get('/part_tmp.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handleGetJson(res, '/db/part_tmp.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get('/notes.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handleGetJson(res, '/db/notes.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get('/qtSections.json', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handleGetJson(res, '/db/qtSections.json');
  } else {
    handleGetNeedToLogin(res);
  }
});


function handlePostJson(req, res, dbJson) {
  let partDir = path.join(__dirname, dbJson);
  const data = req.body;
  fs.writeFile(partDir, JSON.stringify(data), function (err) {
    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json({message: 'file saved'});
    }
  });
}

app.post('/part_up.json', function(req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handlePostJson(req, res, '/db/part_up.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.post('/part_down.json', function(req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handlePostJson(req, res, '/db/part_down.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.post('/part_tmp.json', function(req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handlePostJson(req, res, '/db/part_tmp.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.post('/notes.json', function(req, res, next) {
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    handlePostJson(req, res, '/db/notes.json');
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get('/user', function(req, res){
  let isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    let user = req.user;
    console.log('user', user);
    console.log('res.locals.ua', res.locals.ua);
    handleGetUserJson(res, user);
  } else {
    handleGetNeedToLogin(res);
  }
});

app.get("*", function(req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(process.env.PORT);

console.log('server listen on *:' + process.env.PORT)
