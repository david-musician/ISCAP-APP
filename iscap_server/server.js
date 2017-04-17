var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport    = require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');

// get our request parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET https://ionic-sandbox-david-musician.c9users.io:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at https://ionic-sandbox-david-musician.c9users.io:' + port + '/api');
});

app.get('/api', function(req, res) {
    res.send('This is the API Endpoint!');
});

app.get('/api/signup', function(req, res) {
    res.send('Signup!');
});

app.get('/api/authenticate', function(req, res) {
    res.send("Authenticate!");
});

/*app.get('/api/memberinfo', function(req, res) {
    res.send("Member info!");
});*/

// connect to database
mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/api/authenticate', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        
        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and passwrod is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/api/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

app.get('/api/memberinfo', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err,user) {
            if (err) throw err;
            
            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }else {
            return null;
        }
    } else {
        return null;
    }
};

// connect the api routes under /api/*
app.post('/api/signup', apiRoutes);

app.post('/api/authenticate', apiRoutes);

// Start the server
app.listen(port);
console.log('Application running at: https://ionic-sandbox-david-musician.c9users.io:' + port);

process.on('uncaughtException', function (err) {
    console.log(err);
}); 