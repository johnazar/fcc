require('dotenv').config();
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// add this
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//Get Data from POST Requests
let virdb=[];
let regex  = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;
app.post('/api/shorturl/new',function(req,res){
  let result = {}
  let original_url = req.body.url;
  if(original_url.match(regex)){
  console.log(req.body);
  result['original_url'] = original_url;
  virdb.push(original_url);
  result['short_url'] = virdb.indexOf(original_url);
  }else{
    result['error']='Invalid URL';
  }

  res.json(result);
});
app.get('/api/shorturl/:id', function(req, res) {
  let short_url = virdb[req.params.id];
  res.redirect(short_url);

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
