var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var jwt = require('jwt-simple');
var _ = require('underscore');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);
//var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwtTokenSecret', '123456ABCDEF');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/2522Scout');
mongoose.connect('localhost', '2522Scout');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


require('./routes/api')(app, express, db, mongoose, jwt, _);
//require('./routes/thebluealliance')(app, express, db, mongoose, http);
//require('./routes/data')(app ,express);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
