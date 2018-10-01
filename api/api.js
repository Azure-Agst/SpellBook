const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const util = require('util');
const sanitizer = require('express-sanitizer');
const bcrypt = require('bcrypt')

const items = require('./items.json');

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
router.use(sanitizer());

//Make Token
function newToken() {
  var text = ""; var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// init mongo
var db;
var url = require("./credentials.json").uri;
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  db = client.db("spellbook");
  console.log("[MongoDB] Driver successfully connected to server!");
});



// ===== [ GETS ] ============================================================================================



router.get('/loadouts', (req, res) => {
  var data = db.collection("loadouts").find().sort({ timestamp: -1 }).limit(5);
  data.toArray((err, docs) => {
    res.send(docs);
  });
});



router.get('/loadout/:uuid', (req, res) => {
  var data = db.collection("loadouts").findOne({uuid: req.params.uuid}, (err, item) => {
    var array = [];
    array.push(item);
    res.send(array);
  });
});



router.get('/user/:id', (req, res) => {
  var data = db.collection("loadouts").findOne({username: req.params.id}, (err, item) => {
    var array = [];
    array.push(item);
    res.send(array);
  });
});



// ===== [ POSTS ] ===========================================================================================



router.all('/login', (req, res) => {
  switch (req.method){
    case "POST":
      var username = req.sanitize(req.body.username);
      var password = req.sanitize(req.body.password);

      if (username == undefined || password == undefined) {
        res.send({"login": false, "error": "Error processing username or password!"});
        return;
      };

      db.collection("users").findOne({username: username}, function(err, result){
        bcrypt.compare(password, result.password, function(err, isequal){
          if (isequal == true){
            res.send({"login": true, "username": result.username, "token": result.token, "image": result.image});
          } else {
            res.send({"login": false, "error": "Username and password don't match!"});
          }
        });
      })
      break;

    case "GET":
      res.send("Did you mean to POST?");
      break;
  }
});



router.all('/signup', (req, res) => {
  switch (req.method){
    case "POST":
      //console.log(req.body);
      var username = req.sanitize(req.body.username);
      var password = req.sanitize(req.body.password);

      if (username == undefined || password == undefined) {
        res.send({"signup": false, "error": "Error processing username or password!"});
        return;
      };

      bcrypt.hash(password, 10, function(err, hash){
        var userobject = {
          username: username,
          password: hash,
          token: gtoken(),
          image: "/public/user_images/default.png",
          usertype: 0
        }
        db.collection("users").insertOne(userobject, function(err, result){
          if (err) {
            console.log(err);
            res.send({"signup": false, "error": "Whoops! Serveride Error! Contact an admin for help!"});
          } else {
            res.send({"signup": true, "username": result.username, "token": result.token, "image": result.image});
          }
        });
      });
      break;

    case "GET":
      res.send("did you mean to POST?");
      break;
  }
});



router.all('/createLoadout', (req, res) => {
  switch (req.method){
    case "POST":
      console.log("Post recieved!")
      // CLEAN
      var name = req.sanitize(req.body.name); var rune = req.sanitize(req.body.rune);
      var left = req.sanitize(req.body.left); var right = req.sanitize(req.body.right);
      var amulet = req.sanitize(req.body.amulet); var belt = req.sanitize(req.body.belt);
      var boots = req.sanitize(req.body.boots); var author = req.sanitize(req.body.author);
      console.log(req.body.desc);
      var desc = "N/A"; if (req.body.desc != "") { desc = req.sanitize(req.body.desc) };

      console.log("Cleaned!");

      if (name == undefined || rune == undefined ||
          left == undefined || right == undefined ||
          amulet == undefined || belt == undefined ||
          boots == undefined || desc == undefined ||
          author == undefined ) {
        res.send({"success": false, "error": "Error processing data! Var Missing!"});
        return;
      };
      console.log("Contsins all data!")

      if (doesContain("gauntlets", right) == false || doesContain("gauntlets", left) == false ||
          doesContain("amulets", amulet) == false || doesContain("belts", belt) == false ||
          doesContain("boots", boots) == false || doesContain("runes", rune) == false ) {
        res.send({"success": false, "error": "Error processing data! Spoofed var!"});
        return;
      };
      console.log("Proper Formatting!");

      var loadoutObj = {
        uuid: guid(),
        author: author,
        name: name,
        rune: rune,
        left: left,
        right: right,
        amulet: amulet,
        belt: belt,
        boots: boots,
        desc: desc,
        timestamp: new Date()
      }

      console.log("object created!");

      db.collection("loadouts").insertOne(loadoutObj, function(err, result){
          if (err) {
            console.log(err);
            res.send({"success": false, "error": "Whoops! Serveride Error! Contact an admin for help!"});
          } else {
            res.send({"success": true, "message": "Success! Redirect!", "url": "/loadouts/"+result.ops[0].uuid});
          }
      });

      break;

    case "GET":
      res.send("Did you mean to POST?");
      break;
  }
});



// ===== [ UTILS ] ===========================================================================================


function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function gtoken() {
  return s4() + s4() + s4() + s4();
}


function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function genUuid(){
  var goodUuid = false; var tempuuid;
  while (goodUuid == false) {
    tempuuid = guid();
    db.collection("loadouts").findOne({ uuid: tempuuid }, (err, result) => {
      console.log(result)
      if (result.name == undefined){
        goodUuid = true;
      }
    });
  }
  return tempuuid;
}



function doesContain(category, param){
  var contains = false;
  for (var i = 0; i < items[category].length; i++){
    if (param == items[category][i]){
      contains = true;
    }
  }
  return contains;
}



//export
module.exports = router;
