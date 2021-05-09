const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload());
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  if(!req.files) {
    res.send({
        status: false,
        message: 'No file uploaded'
    });
  }else{
    let upfile = req.files.upfile;
    //send response
    res.send({
      status: true,
      message: 'File is uploaded',
      data: {
          name: upfile.name,
          type: upfile.mimetype,
          size: upfile.size
        }
    });

  }


  
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
