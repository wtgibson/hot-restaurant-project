// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// (DATA)
// =============================================================

var tables = [];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("api/tables", function(req, res) {
    return res.json(tables);
});

app.get("api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Create New Table - takes in JSON input
app.post("/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  if (tables.length > 5) {
    waitlist.push(newReservation);
    alert("Sorry no more tables available, you've been added to the waitlist");  

  }

  else {
    alert("Let me show you to your table")  
    tables.push(newReservation);
  }

  // Using a RegEx Pattern to remove spaces from newReservations
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
