require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');


//The code goes here
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



app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//POST Req
//Get Data from POST Requests Create a New User
app.post('/api/users', function (req, res) {
  let result = {}
  let newuser = new User({ username: req.body.username });
  newuser.save((err, savedUser)=>{
    if (err) console.log(err);
      result['_id'] = savedUser._id;
      result['username'] = savedUser.username;
      res.json(result);
  });
  
});






//Start listen
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
