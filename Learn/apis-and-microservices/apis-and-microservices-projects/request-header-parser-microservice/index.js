// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// My code Goes here
// Request Header Parser Microservice
app.get('/api/whoami',function(req,res){
  let results={}
  //console.log(req.headers);
  console.log(req.headers['accept-language']);
  console.log(req.headers['user-agent']);
  console.log(req.headers['x-forwarded-for']);
  results['ipaddress'] = req.headers['x-forwarded-for'];
  results['language'] = req.headers['accept-language'];
  results['software'] = req.headers['user-agent'];
  console.log(req);
  res.json(results);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});