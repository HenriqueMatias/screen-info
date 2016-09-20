var restify  = require('restify');
var mongoose = require('mongoose');
var server   = restify.createServer();
var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat();

function respond(req, res, next) {
  
  mongoose.createConnection('localhost:27017', 'novoteste');
  var catName = req.params.name;
  
  res.send('hello ' + catName);
  kitty.name=catName;
  kitty.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('meow');
	  }
  });
  next();
}

server.get('/hello/:name', respond);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
