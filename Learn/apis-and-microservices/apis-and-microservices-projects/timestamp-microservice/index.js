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
app.get('/api/timestamp/:date?',function(req,res){

  let reqdate =req.params.date||'1';
  
  let regxunix = /^\d{12}/g;
  let regxgmt= /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/g;
  let ts='';
  let tsutc='';
  console.log(reqdate.match(regxunix));
  console.log(reqdate.match(regxgmt));
if(reqdate==='1'){
  let now = new Date();
   res.json({unix:now.getTime(), utc:now.toUTCString()});
}

if(reqdate.match(regxunix)){
  //console.log('regxunix');
   ts = parseInt(reqdate);
   tsutc = new Date(ts);
   res.json({ unix:ts , utc: tsutc.toUTCString() });
}else if(reqdate.match(regxgmt)){
  
   ts = new Date(reqdate);
   ts=ts.getTime();
   tsutc = new Date(reqdate);
   res.json({unix: ts, utc:tsutc.toUTCString()});
   
}else{
  res.json({ error : "Invalid Date" });
}

  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
