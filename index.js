///////////////////////////////
// index.js                  //
// (c) 2018 Andrew Augustine //
///////////////////////////////

// Module Imports
const express = require('express');
const session = require('express-session');
const app = express();
const apirouter = require("./api/api.js");
const path = require("path");

// init static dirs
app.use('/public', express.static(path.join(__dirname, '/public'))); // set ./assets as static folder

// init API
app.use(session({secret:"TotallySecret", cookie:{}}));
app.use("/api", apirouter);

// init webpage
app.get("*", function(req, res){
  var session = req.session;

  if (session.user){
    //data here
  }

  res.sendFile(path.join(__dirname, "/public/index.html"));
})

// Finish and Listen
app.listen(8000, function(){
  console.log("[Server] Server Started!");
})
