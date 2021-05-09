require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Setup connection to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//test conection
/* let joeDoe = new User({name: "Joe Doe 2", exercise: 'push ups', duration: 20,date:new Date("2020-02-02")});
joeDoe.save(); */

// Create Schema
// we need a collection of exercises related to single user in users' collection
const Schema = mongoose.Schema;
let exerciseSchema = new Schema({
  description: { type: String, required: true },
  exercise: { type: String },
  duration: Number,
  date: String // date can be used
});

let userSchema = new Schema({
  username: { type: String, required: true },
  log:[exerciseSchema]
});


//define Schema
let ExerciseSession = mongoose.model("Session", exerciseSchema);
const User = mongoose.model("User", userSchema);



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//The code goes here

//POST Req
//Get Data from POST Requests Create a New User
app.post('/api/exercise/new-user', function (req, res) {
  let result = {}
  result['username'] = req.body.username;
  let newuser = new User({ name: req.body.username });
  newuser.save();
  result['_id'] = newuser._id;
  console.log(result);
  res.json(result);
});

//Get Data from POST Requests Add exercises
app.post('/api/exercise/add', function (req, res) {
  let result = {}
  result['userId'] = req.body.userId;
  result['description'] = req.body.description;
  result['duration'] = req.body.duration;
  result['date'] = req.body.date;
  res.json(result);
});


//GET Req
//Get Data from get Requests
app.get('/api/exercise/users', function(req, res) {
  
  User.find({}).select('name').exec(function(err, arr) {
    if (err) throw err;
    console.log(arr);
    res.json(arr);
  });
});






//Start listen
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
