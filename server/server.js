//Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');

//Config
var config = require('./config')
//var port = 3006;

//Controllers
var menuCtrl = require('./controllers/menuCtrl');
var userCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');

//Policies
var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401).send();
    return next();
};

//Express
var app = express();

var http = require('http').Server(app);

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Live-Server
app.use(express.static(__dirname + '/../public'));

//Menu Endpoints
app.post('/api/menu', menuCtrl.create);
app.get('/api/menu', menuCtrl.read);
app.put('/api/menu/:id', menuCtrl.update);
app.delete('/api/menu/:id', menuCtrl.delete);

//Order Endpoints
app.post('/api/order', orderCtrl.create);
app.get('/api/order', orderCtrl.read);
app.put('/api/order/:id', orderCtrl.update);

//User Endpoints
app.get('/api/users', userCtrl.read);
app.put('/api/users/:id', userCtrl.update);

//Auth Endpoints
app.post('/auth/local/register', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me);
app.put('/auth/local/users/:_id', isAuthed, userCtrl.update);
app.post('/auth/local', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
    req.logout();
    return res.status(200).send('logged out');
});

//Connections
var mongoUri = "mongodb://localhost:27017/manuels";
var port = 3007;
mongoose.set('debug',true);
mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
    console.log("Successfully connected to mongodb");
});
app.listen(port, function(){
    console.log('listening on port ' + port);
});

//Server and DB Init
/*
var port = 3007;
var mongoUri = 'mongodb://miknevinas:miknevinas@ds061415.mongolab.com:61415/personal-project';

mongoose.set('debug', true);
mongoose.connect(mongoUri);
mongoose.connection
    .on('error', console.error.bind(console, 'Connection Error: '))
    .once('open', function() {
    console.log('Connected to MongoDB at', mongoUri.slice(mongoUri.indexOf('@')+1, mongoUri.length));
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});
*/
