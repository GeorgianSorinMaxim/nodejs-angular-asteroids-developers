var mongoose = require('mongoose');
var express = require('express');
var mongoosastic = require('mongoosastic');
var assert = require('assert');
var router = express.Router();
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var config = require('../../config/conf.js');
var url = config.url;

var Asteroid = require('../models/asteroid');
var Group = require('../models/group');

var conversion = {'A':1, 'B':2, 'C':3, 'D':4, 'E':5, 'F':6, 'G':7, 'H':8, 'I':9, 'J':10, 'K':11, 'L':12, 'M':13, 'N':14, 'O':15, 'P':16, 'R':17, 'Q':18, 'S':19, 'T':20, 'U':21, 'V':22, 'W':23, 'X':24, 'Y':25, 'Z':26};

module.exports = function(app) {

    // GET Index route
    app.get('/', function(req, res, next) {
        res.render('index.ejs', { user : req.user });
    });

    // GET Astedoids route
    app.get('/asteroid', function(req, res, next) {
        res.render('asteroid.ejs');
    });

    // GET Groups 
    app.get('/group', function(req, res, next) {
        res.render('group.ejs');
    });

    app.get('/register', function(req, res) {
        res.render('register.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs');
    });


    // ------------------ Developer Groups -------------------//
    // GET Groups 
    app.get('/api/groups', function(req, res, next) {
        Group.find(function(err, groups) {
            if (err) res.send(err);
            res.json(groups);
        });
    });

    // GET Group with ID
    app.get('/api/group/:id', function(req, res) {
        mongoose.model('Group').find({ "_id": req.params.id }, function (err, group) {
          if (err) res.send(err);
          res.json(group);
        });
    });

    // POST Group
    app.post('/api/group', function(req, res, next) {
        if(req.body.name) { 
            var group = new Group();
            group.name = req.body.name.toUpperCase();
            group.numberConversion = numberConversion(group.name);
            group.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Group created!' });
            });
        } else return "No provided group details!";
    });

    // PUT Update Group
    app.post('/api/updateGroup/', function(req, res, next) {
        mongoose.model('Group').find({ "_id": req.body._id }, function (err, group) {
            if (err) return res.send(err);
            group[0].name = req.body.newName.toUpperCase() || '';
            group[0].numberConversion = numberConversion(group[0].name);
            group[0].save(function(err) {
                if (err) return next(err);
                res.json(group[0]);
            });
        });
    });

    // DELETE Group with ID
    app.delete('/api/group/:id', function(req, res) {
        Group.remove({
            _id: req.params.id
        }, function(err) {
        if (err) return res.send(err);
        res.json({ message: 'Successfully deleted' });
      });
    });


    // ------------------ Asteroids -------------------//
    // GET Asteroid
    app.get('/api/asteroids', function(req, res) {
        Asteroid.find(function(err, asteroids) {
            if (err) res.send(err);
            res.json(asteroids);
        });
    });

    // GET Asteroid with ID
    app.get('/api/asteroid/:id', function(req, res) {
        mongoose.model('Asteroid').find({ "_id": req.params.id }, function (err, asteroid) {
          if (err) res.send(err);
            res.json(asteroid);
        });
    });

    // POST Asteroid
    app.post('/api/asteroid', function(req, res, next) {
        if(req.body.name) { 
            var asteroid = new Asteroid();
            asteroid.name = req.body.name.toUpperCase();
            asteroid.numberConversion = numberConversion(asteroid.name);
            asteroid.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Asteroid created!' });
            });
        } else return "No provided asteroid details!";
    });

    // POST Update Astedoid
    app.post('/api/updateAsteroid/', function(req, res, next) {
        mongoose.model('Asteroid').find({ "_id": req.body._id }, function (err, asteroid) {
            if (err) return res.send(err);
            asteroid[0].name = req.body.newName.toUpperCase() || '';
            asteroid[0].numberConversion = numberConversion(asteroid[0].name);
            asteroid[0].save(function(err) {
                if (err) return next(err);
                res.json(asteroid[0]);
            });
        });
    });


    // DELETE Astedoid with ID
    app.delete('/api/asteroid/:id', function(req, res) {
        Asteroid.remove({
            _id: req.params.id
        }, function(err) {
        if (err) return res.send(err);
        res.json({ message: 'Successfully deleted' });
      });
    });

    // Handle 404
    app.use(function(req, res) {
        res.status(404);
        res.render('404.ejs');
    });

    // Handle 500
    app.use(function(error, req, res, next) {
       res.status(500);
       res.render('500.ejs');
    });

    function numberConversion(str) {
        var numberConversion = 1;
        for (var i = 0; i < str.length; i++) {
            for(letter in conversion) {
                if(str.charAt(i) === letter) {
                    numberConversion = numberConversion * conversion[letter];
                }
            }
        }
        return numberConversion;
    }
};
