// index.js
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
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  //request API date param:
  var time = req.params.date;

  //check if time param is in unix format:
  var isUnix = /^[0-9]+$/.test(time);

  //turn date param into timestamps
  var unix = isUnix 
  ? Number(time) 
  : Math.floor((new Date(time)));

  var timestamp = new Date(unix);
  var utc = timestamp.toUTCString();

  if ( ! time ) {
    var unix = Math.floor((new Date()));
    var utc = new Date().toUTCString();
    return res.send({ "unix": unix, "utc": utc});
  } else if ( utc === "Invalid Date" ) {
    return res.send({ error: "Invalid Date" });
  } else {
    return res.send({ "unix": unix, "utc": utc });
  };
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
