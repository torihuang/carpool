var express = require('express'),
  bodyParser = require('body-parser');

var app = express();

var env = 'development'

// console.log(__dirname+ '/server/views')
app.set('views', __dirname+ '/server/views');
app.set('view engine', 'jade');

// console.log(__dirname + '/public')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath)
})

app.get('*', function(req, res) {
  res.render('index');
})

var port = 8080;
app.listen(port);
console.log('Nihao from port ' + port + '...')