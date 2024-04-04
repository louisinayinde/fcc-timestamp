// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { is } = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  // creating a date object
  let date = new Date();
  // if the given parameter is a number (timestamp)
  if(/^\d*$/.test(req.params.date)){
    date.setTime(req.params.date);
  } 
  // else we just create a new date parsing the string given
  else {
    date = new Date(req.params.date);
  }
  
  // giving headers for JSON
  res.set({ 'Content-Type': 'application/json' }) 
  // if the date is invalid
  if(!date.getTime()) res.send(JSON.stringify({error: "Invalid Date"}))
  // else, we send the object with two members (unix and natural)
  else res.send(JSON.stringify({
    unix: date.getTime(),
    utc: date.toUTCString()
  }))
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
