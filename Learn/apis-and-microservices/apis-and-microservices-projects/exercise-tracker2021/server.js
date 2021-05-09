const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
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

//Handel reqs setup
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


//Tasks
//You can POST to /api/users with form data username to create a new user. The returned response will be an object with username and _id properties.
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


//GET Req
//You can make a GET request to /api/users to get an array of all users. Each element in the array is an object containing a user's username and _id.
app.get('/api/users', function(req, res) {
  
  User.find({}).select('username').exec(function(err, arr) {
    if (err) return res.json({msg: err.MongooseError });
    console.log(arr);
    res.json(arr);
  });
});


//You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.
app.post('/api/users/:_id/exercises', function (req, res) {
  const _id =req.params._id;
  const {description, duration, date } = req.body;
  let result = {}
  result['userId'] = _id;
  result['description'] = description;
  result['duration'] = duration;
  result['date'] = date;
  //res.json(req.body);

  //Simple validation
  //Date
  let exerciseDate = new Date().toISOString().substring(0, 10);
  if (date && date !== "") {
    exerciseDate = new Date(date).toISOString().substring(0, 10);
  }
  //create exercise object
  const exerciseObj = {
    description: description,
    duration: parseInt(duration),
    date: exerciseDate
  };
  //let exercise = new ExerciseSession(exerciseObj);
  //exercise.save();

  User.findByIdAndUpdate( 
    _id ,
    {$push : {log: exerciseObj}}
    ,
    {new:true},
    (err, userUpdated) => {
    if (err) return res.json({msg: err.MongooseError });
    //prepare responseObj
    let responseObj={
      _id : _id,
      username: userUpdated.username,
      date:new Date(exerciseDate).toDateString(),
      duration: exerciseObj.duration,
      description:description
    };
    res.json(responseObj);
  }    
  );
});


//You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user. The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.

app.get('/api/users/:_id/logs', function(req, res) {
  User.findById(req.params._id,(err,userFound)=>{
    if (!err) {
      let logdisplay = userFound.log;
      //add interval
       if(req.query.from||req.query.to){
        let fromDate = new Date(0)
        let toDate =new Date()
        if(req.query.from){
          fromDate = new Date(req.query.from)
        }
        if(req.query.to){
          toDate = new Date(req.query.to)
        }
        fromDate = fromDate.getTime()
        toDate = toDate.getTime()
        logdisplay= logdisplay.filter((element)=>{
          let datetocompare = new Date(element.date).getTime()
          return fromDate<=datetocompare & datetocompare<=toDate
        })
      } 
      
      //add limits
     if(req.query.limit)
      {
        logdisplay=logdisplay.slice(0,req.query.limit)
      } 


      let responseObj2=
      {
        _id : req.params._id,
        username: userFound.username,
        count:userFound.log.length,
        log:logdisplay
      }
      res.json(responseObj2);
    }
  });

});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
