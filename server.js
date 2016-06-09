var express = require('express');

var app = express();

var env = 'development'

app.set('views', __dirname+ '/server/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.render('index');
})