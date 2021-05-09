require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


// setup connection to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  exercise: { type: String },
  duration: Number,
  date: Date
});

//define schema
const User = mongoose.model("User", userSchema);
//test conection
/* let joeDoe = new User({name: "Joe Doe 2", exercise: 'push ups', duration: 20,date:new Date("2020-02-02")});
joeDoe.save(); */


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
