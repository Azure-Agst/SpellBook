///////////////////////////////
// index.js                  //
// (c) 2018 Andrew Augustine //
///////////////////////////////

// Module Imports
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const session = require('express-session');
const app = express();
const apirouter = require("./api/api.js");
const path = require("path");

// init static dirs
app.use('/public', express.static(path.join(__dirname, '/public'))); // set ./assets as static folder

// security may be a bit important.
app.use(function(req, res, next) {
  if(!req.secure) {
    var secureUrl = "https://" + req.headers['host'] + req.url;
    res.writeHead(301, { "Location":  secureUrl });
    res.end();
  }
  next();
});

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
if (process.env.NODE_ENV == 'production'){
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/spellbook.azureagst.pw/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/spellbook.azureagst.pw/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/spellbook.azureagst.pw/chain.pem', 'utf8');

  const credentials = {
  	key: privateKey,
  	cert: certificate,
  	ca: ca
  };

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);

  httpServer.listen(80, () => {
  	console.log('HTTP Server running on port 80');
  });

  httpsServer.listen(443, () => {
  	console.log('HTTPS Server running on port 443');
  });

} else {
  app.listen(80, function(){
    console.log("[Server] Server Started!");
  })
}
