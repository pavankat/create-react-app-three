// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');

var app = express();

// Set the app up with morgan
app.use(logger("dev"));


// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Database configuration
var databaseUrl = "songs_db";
var collections = ["songs"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// songs Routes
// ======
  //documentation for mongojs:
    //https://github.com/mafintosh/mongojs

  app.get("/songs", function(req, res) {
    // Find all songs in the songs collection
    db.songs.find({}, function(error, songs) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise, send json of the songs back to user
      // This will fire off the success function of the ajax request
      else {
        //pretend that it takes 5 seconds to get the songs back
        //setTimeout(function(){
          res.json(songs);
        //}, 5000)
      }
    });
  });

  // Handle form submission, save submission to mongo
  app.post("/songs", function(req, res) {
    
    console.log(req.body);

    // Insert the song into the songs collection
    db.songs.insert(req.body, function(error, savedSong) {
      // Log any errors
      if (error) {
        console.log(error);
      }else {
        //the reason why we are sending the savedSong back is because we now have an _id to give to the client
        res.json(savedSong);
      }
    });
  });

  //one song
  app.get("/songs/:id", function(req, res) {
    db.songs.findOne({
      "_id": mongojs.ObjectId(req.params.id)
    }, function(error, oneSong) {
      if (error) {
        res.send(error);
      }else {
        res.json(oneSong);
      }
    });
  });

  //update a song
  app.put("/songs/:id", function(req, res) {

    db.songs.findAndModify({
      query: { 
        "_id": mongojs.ObjectId(req.params.id) 
      },
      update: { $set: {
        "artist": req.body.artist, "title": req.body.title } 
      },
      new: true
      }, function (err, editedSong) {
          res.json(editedSong);
      });
  });

  app.delete("/songs/:id", function(req, res) {
    var id = req.params.id;

    db.songs.remove({
      "_id": mongojs.ObjectID(id)
    }, function(error, removed) {
      if (error) {
        res.send(error);
      }else {
        res.json(id);
      }
    });
  });

// Listen on port 3001
app.listen(3001, function() {
  console.log("App running on port 3001!");
});
