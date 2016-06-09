var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV || 'development';

// console.log(__dirname+ '/server/views')
app.set('views', __dirname+ '/server/views');
app.set('view engine', 'jade');

// console.log(__dirname + '/public')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// MONGOOSE
if(env == 'development') {
  console.log('connecting to local host...')
  mongoose.connect('mongodb://localhost/carpool')
} else {
  console.log('connecting to MongoLab...')
  mongoose.connect('mongodb://carpool:carpool@ds011734.mlab.com:11734/carpool')
}

var db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('The db is up and running...')
})

var userSchema = mongoose.Schema({
  username: String,
  password: String
});
var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err,collection) {
  console.log("in User.find({})")
  if(collection.length === 0) {
    console.log("creating new users")
    User.create({username:'torihuang', password:'password'});
    User.create({username:'mattbrauer', password:'password'});
    User.create({username:'norikins', password:'password'});
  }
})

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
  res.render('index');
})

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Nihao from port ' + port + '...')