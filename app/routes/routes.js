var mongoose = require('mongoose');
var express = require('express');
var mongoosastic = require('mongoosastic');
var gcm = require('node-gcm');
var assert = require('assert');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var config = require('../../config/conf.js');
var url = config.url;
var sender = new gcm.Sender(config.senderID);

var Users = require('../models/user');
var Patient = require('../models/patient');
var PatientNews = require('../models/patientNews');
var Device = require('../models/device');
var Message = require('../models/message');
var Test = require('../models/test');


module.exports = function(app) {

    app.get('/api/', function(req, res) {
        res.json({ message: 'Welcome to the API!' });   
    });

    // GET Index route
    app.get('/', function(req, res, next) {

        // Experiment with sending notifications960 during 4 hours for testing the receival rate and battery life of the paired smartwatches
        // Send 50 notifications at a time
        var regTokens = [];
        var message = "";
        var i = 1;

        Device.find(function (err, devices) {
            if (err) return err;
            devices.forEach(function (item) {
                var stringregid = "dwi1T9u3hQM:" + item.regid;
                regTokens.push(stringregid);
            });

            setInterval(function() {   

                // SEND GCM PUSH NOTIFICATION
                message = new gcm.Message();
                message.addNotification({
                  title: 'Notification ' + i,
                  body: 'sent!',
                  icon: 'icon',
                  sound: 'default'
                });

                console.log(message);

                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if(err) {
                        console.log(err);
                        return err;
                    }
                    // else console.log(response);
                });
                i++;
            }, 15000); 
        });
        // Experiment code ends here

        res.render('index.ejs');

    });

    // GET NEWS route
    app.get('/news', function(req, res, next) {
        res.render('news.ejs');
    });

    // GET NEWS List route
    app.get('/newsList', function(req, res, next) {
        res.render('newsList.ejs');
    });

    // GET Send route
    app.get('/send', function(req, res, next) {
        res.render('send.ejs');
    });

    // GET Register user route
    app.get('/user', function(req, res, next) {
        res.render('user.ejs');
    });

     // GET Users route
    app.get('/users', function(req, res, next) {
        res.render('users.ejs');
    });

    
    // GET API Users route
    app.get('/api/users', function(req, res, next) {
        Users.find(function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    });

    // GET User with username
    app.get('/api/users/:username', function(req, res) {
        var username = req.params.username;
        mongoose.model('Users').find({ "username": username }, function (err, user) {
          if (err) res.send(err);
          res.json(user);
        });
    });


    // GET Patients page
    app.get('/patients', function(req, res) {
        Patient.find(function(err, patients) {
            if (err)
                res.send(err);
            res.render('patients.ejs', {
                "patients" : patients
            });
        });
    });

    // GET Patients page
    app.get('/api/patients', function(req, res) {
        Patient.find(function(err, patients) {
            if (err) res.send(err);
            res.json(patients);
        });
    });

    // GET NEWS List page
    app.get('/api/newsList', function(req, res) {
        PatientNews.find(function(err, newsList) {
            if (err) res.send(err);
            res.json(newsList);
        });
    });

    // GET Devices page
    app.get('/api/devices', function(req, res) {
        Device.find(function(err, devices) {
            if (err) res.send(err);
            res.json(devices);
        });
    });

    // GET Test page
    app.get('/api/tests', function(req, res) {
        Test.find(function(err, tests) {
            if (err) res.send(err);
            res.json(tests);
        });
    });

    // GET Device with ID page
    app.get('/api/devices/:id', function(req, res) {
        var regid = req.params.id;
        mongoose.model('Device').find({ "regid": regid }, function (err, device) {
          if (err) res.send(err);
            res.json(device);
        });
    });

    // GET User with username
    app.get('/api/users/:username', function(req, res) {
        var username = req.params.username;
        mongoose.model('Users').find({ "username": username }, function (err, user) {
          if (err) res.send(err);
          res.json(user);
        });
    });

    // POST GCM Push Notification page
    // Documentation: https://github.com/ToothlessGear/node-gcm
    app.post('/api/send', function(req, res, next) {
        console.log(req.body);
        var datatitle = req.body.title || "Default";
        var datamsg = req.body.msg || "Message";
        // var receiver = req.body.receiver;
        var regTokens = [];
        var message = "";

        var newMesage = new Message();
        newMesage.title = datatitle;
        newMesage.body = datamsg;

        Device.find(function (err, devices) {
            if (err) return err;
            devices.forEach(function (item) {
                var stringregid = "dwi1T9u3hQM:"+item.regid;
                regTokens.push(stringregid);
            });

            // console.log("regTokens ", regTokens);

            // SEND GCM PUSH NOTIFICATION
            message = new gcm.Message();
            message.addNotification({
              title: '' + datatitle + '',
              body: '' + datamsg + '',
              icon: 'icon',
              sound: 'default'
            });

            // console.log(message);

            console.log(regTokens);
            sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if(err) {
                    console.error(err);
                    return err;
                } else console.log(response);
            });

            // Save the message and check for errors
            newMesage.save(function(err) {
                if (err) res.send(err);
                res.json(newMesage);
            });
        });
    });

    app.post('/api/updatePatient', function(req, res, next) {
        var regTokens = [];

        if(req.body.cpr && req.body.firstname && req.body.lastname && req.body.diagnosis && req.body.triage) {

            mongoose.model('Patient').find({ "cpr" : req.body.cpr }, function (err, patient) {
                  if (err) {
                      return console.error(err);
                  } else {

                    Device.find(function (err, devices) {
                        if (err) return err;
                        devices.forEach(function (item) {
                            var stringregid = "dwi1T9u3hQM:"+item.regid;
                            regTokens.push(stringregid);
                        });

                        var message = new gcm.Message();
                        message.addNotification({
                          title: 'Triage Update',
                          body: 'Triage level changed from ' + patient[0].triage + ' to ' + req.body.triage + ' for the patient ' + patient[0].firstname + ' ' + patient[0].lastname,
                          icon: 'icon',
                          sound: 'default',
                          click_action: "OPEN_ACTIVITY_1"
                        });
                        
                        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                            if(err) { 
                                console.error(err);
                                return err;
                            } else console.log(response);
                        });

                        var oldTriage = patient[0].triage;

                        patient[0].cpr = req.body.cpr || '';
                        patient[0].firstname = req.body.firstname || '';
                        patient[0].lastname = req.body.lastname || '';
                        patient[0].diagnosis = req.body.diagnosis || '';
                        patient[0].triage = req.body.triage || '';

                        patient[0].save(function(err) {
                            if (err) return next(err);
                            res.json(patient[0]);
                        });
                    });
                  }
            });
        } else return "User not existent!";
    });


    // Create a patient (accessed at POST http://localhost:3000/api/patients)
    app.post('/api/patients', function(req, res, next) {

        if(req.body.cpr && req.body.firstname && req.body.lastname && req.body.diagnosis && req.body.triage && req.body.doctor && req.body.address && req.body.city && req.body.zip) {
            
            var patient = new Patient();
            patient.cpr = req.body.cpr;
            patient.firstname = req.body.firstname;
            patient.lastname = req.body.lastname;
            patient.triage = req.body.triage;
            patient.diagnosis = req.body.diagnosis;
            patient.doctor = req.body.doctor;
            patient.address = req.body.address;
            patient.city = req.body.city;
            patient.zip = req.body.zip;

            // Save the patient and check for errors
            patient.save(function(err) {
                if (err) res.send(err);
                res.json(patient);
            });
        } else return "No provided patient details!";
    });

    // Create a device (accessed at POST http://localhost:3000/api/devices/regid)
    app.post('/api/devices', function(req, res, next) {
        if(req.body.regid && req.body.uuid) { 
            var device = new Device();
            device.regid = req.body.regid;
            device.uuid = req.body.uuid;

            // Save the device and check for errors
            device.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Device created!' });
            });
        } else return "No provided device details!";
    });

    // Create a test (accessed at POST http://localhost:3000/api/devices/name)
    app.post('/api/tests', function(req, res, next) {
        if(req.body.name) { 
            var test = new Test();
            test.name = req.body.name;

            // Save the device and check for errors
            test.save(function(err) {
                if (err) res.send(err);
                res.json({ message: 'Test created!' });
            });
        } else return "No provided test details!";
    });

    // POST API Register user
    app.post('/api/registerUser', function(req, res, next) {
        if(req.body.employeeId && req.body.firstname && req.body.lastname && req.body.email && req.body.phone && req.body.username && req.body.password && req.body.role && req.body.org) { 
            var user = new Users();
            user.employeeId = req.body.employeeId;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.username = req.body.username;
            // TODO Hast the password using a salt
            user.password = req.body.password;
            user.role = req.body.role;
            user.organisation = req.body.org;

            user.save(function(err) {
                if (err) return next(err);
                res.json(user);
            });
        } else return "No provided user details!";    
    });


    // POST API NEWS page
    app.post('/api/bos', function(req, res, next) {
        var regTokens = [];

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();

        if (min < 10) min = "0" + min;
        if (hh < 10) hh = "0" + hh;
        if (mm < 10) mm = "0" + mm;
        if (dd < 10) dd = "0" + dd;

        // console.log(today, dd, mm, yyyy, hh, min);

        if (req.body.cpr && req.body.lastname && req.body.respiration && req.body.oxygenSat && req.body.oxygen && req.body.temp && req.body.systolic && req.body.heartRate && req.body.consciousness) {
            var patientToks = new PatientNews();
            patientToks.cpr = req.body.cpr;
            patientToks.firstname = req.body.firstname;
            patientToks.lastname = req.body.lastname;
            patientToks.respiration = req.body.respiration;
            patientToks.oxygenSat = req.body.oxygenSat;
            patientToks.oxygen = req.body.oxygen;
            patientToks.temperature = req.body.temp;
            patientToks.systolic = req.body.systolic;
            patientToks.heartRate = req.body.heartRate;
            patientToks.consciousness = req.body.consciousness;

            var respirationScore = '';
            if (req.body.respiration <= 9) {
                respirationScore = 3;
            } else if (req.body.respiration > 9 || req.body.respiration <= 11){
                respirationScore = 1;
            } else if (req.body.respiration > 11 || req.body.respiration <= 20){
                respirationScore = 0;
            } else if (req.body.respiration > 20 || req.body.respiration <= 24){
                respirationScore = 2;
            } else if (req.body.respiration > 25){
                respirationScore = 3;
            }

            var oxygenSatScore = '';
            if (req.body.oxygenSat <= 91) {
                oxygenSatScore = 3;
            } else if (req.body.oxygenSat > 91 || req.body.oxygenSat <= 93){
                oxygenSatScore = 2;
            } else if (req.body.oxygenSat > 93 || req.body.oxygenSat <= 95){
                oxygenSatScore = 1;
            } else if (req.body.oxygenSat > 95){
                oxygenSatScore = 0;
            }

            var supplementScore = '';
            if (req.body.oxygen === 'Yes') {
                supplementScore = 2;
            } else {
                supplementScore = 0;
            } 

            var temperatureScore = '';
            if (req.body.temp <= 35) {
                temperatureScore = 3;
            } else if (req.body.temp > 35 || req.body.temp <= 36){
                temperatureScore = 1;
            } else if (req.body.temp > 36 || req.body.temp <= 38){
                temperatureScore = 0;
            } else if (req.body.temp > 38 || req.body.temp <= 39){
                temperatureScore = 1;
            } else if (req.body.temp > 39){
                temperatureScore = 2;
            }

            var sysScore = '';
            if (req.body.systolic <= 90) {
                sysScore = 3;
            } else if (req.body.systolic > 90 || req.body.systolic <= 100){
                sysScore = 2;
            } else if (req.body.systolic > 100 || req.body.systolic <= 110){
                sysScore = 1;
            } else if (req.body.systolic > 110 || req.body.systolic <= 219){
                sysScore = 0;
            } else if (req.body.systolic > 219){
                sysScore = 3;
            }

            var bpScore = '';
            if (req.body.heartRate <= 40) {
                bpScore = 3;
            } else if (req.body.heartRate > 40 || req.body.heartRate <= 50){
                bpScore = 1;
            } else if (req.body.heartRate > 50 || req.body.heartRate <= 90){
                bpScore = 0;
            } else if (req.body.heartRate > 90 || req.body.heartRate <= 110){
                bpScore = 1;
            } else if (req.body.heartRate > 110 || req.body.heartRate <= 130){
                bpScore = 2;
            } else if (req.body.heartRate > 130){
                bpScore = 3;
            }

            var consScore = '';
            if (req.body.consciousness === 'A') {
                consScore = 0;
            } else {
                consScore = 3;
            } 

            var score = parseInt(respirationScore, 10) + parseInt(oxygenSatScore, 10) + parseInt(supplementScore, 10) + parseInt(temperatureScore, 10) + parseInt(sysScore, 10) + parseInt(bpScore, 10) + parseInt(consScore, 10);

            patientToks.respirationScore = respirationScore;
            patientToks.oxygenSatScore = oxygenSatScore;
            patientToks.oxygenScore = supplementScore;
            patientToks.temperatureScore = temperatureScore;
            patientToks.systolicScore = sysScore;
            patientToks.heartRateScore = bpScore;
            patientToks.consciousnessScore = consScore;
            patientToks.score = score;
            patientToks.currentdate = dd + '/' + mm + '/' + yyyy;
            patientToks.currenttime = hh + ':' + min;

            Device.find(function (err, devices) {
                if (err) return err;
                devices.forEach(function (item) {
                    var stringregid = "dwi1T9u3hQM:"+item.regid;
                    regTokens.push(stringregid);
                });

                var message = new gcm.Message();
                message.addNotification({
                  title: 'BOS Registeret',
                  body: 'Score: ' + score + ' \n\ ' + ' Navn: ' + req.body.firstname + ' ' + req.body.lastname + ' \n\ ' + ' CPR: ' + req.body.cpr,
                  icon: 'icon',
                  sound: 'default'
                });

                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if(err) { 
                        console.error(err);
                        return err;
                    } else console.log(response);
                });

                patientToks.save(function(err) {
                    if (err) return next(err);
                    res.json(patientToks);
                });
            });
        } else return "No provided NEWS details!";
    }); 


    // POST API NEWS page
    app.post('/api/news', function(req, res, next) {
        var regTokens = [];

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();

        if (min < 10) min = "0" + min;
        if (hh < 10) hh = "0" + hh;
        if (mm < 10) mm = "0" + mm;
        if (dd < 10) dd = "0" + dd;

        // console.log(today, dd, mm, yyyy, hh, min);

        if (req.body.cpr && req.body.lastname && req.body.respiration && req.body.oxygenSat && req.body.oxygen && req.body.temp && req.body.systolic && req.body.heartRate && req.body.consciousness) {
            var score = parseInt(req.body.respiration, 10) + parseInt(req.body.oxygenSat, 10) + parseInt(req.body.oxygen, 10) + parseInt(req.body.temp, 10) + parseInt(req.body.systolic, 10) + parseInt(req.body.heartRate, 10) + parseInt(req.body.consciousness, 10);

            var patientToks = new PatientNews();
            patientToks.cpr = req.body.cpr;
            patientToks.firstname = req.body.firstname;
            patientToks.lastname = req.body.lastname;
            patientToks.respiration = req.body.respiration;
            patientToks.oxygenSat = req.body.oxygenSat;
            patientToks.oxygen = req.body.oxygen;
            patientToks.temperature = req.body.temp;
            patientToks.systolic = req.body.systolic;
            patientToks.heartRate = req.body.heartRate;
            patientToks.consciousness = req.body.consciousness;
            patientToks.score = score;
            patientToks.currentdate = dd + '/' + mm + '/' + yyyy;
            patientToks.currenttime = hh + ':' + min;

            Device.find(function (err, devices) {
                if (err) return err;
                devices.forEach(function (item) {
                    var stringregid = "dwi1T9u3hQM:"+item.regid;
                    regTokens.push(stringregid);
                });

                var message = new gcm.Message();
                message.addNotification({
                  title: 'BOS Registeret',
                  body: 'Score: ' + score + ' \n\ ' + ' Navn: ' + req.body.firstname + ' ' + req.body.lastname + ' \n\ ' + ' CPR: ' + req.body.cpr,
                  icon: 'icon',
                  sound: 'default'
                });

                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if(err) { 
                        console.error(err);
                        return err;
                    } else console.log(response);
                });

                patientToks.save(function(err) {
                    if (err) return next(err);
                    res.json(patientToks);
                });
            });
        } else return "No provided NEWS details!";
    }); 

    // DELETE API NEWS with patient cpr
    app.delete('/api/news/:id', function(req, res) {
        PatientNews.remove({
            _id: req.params.id
        }, function(err, news) {
        if (err) return res.send(err);
        res.json({ message: 'Successfully deleted' });
      });
    });

    // DELETE API Patient with patient cpr
    app.delete('/api/patients/:cpr', function(req, res) {
        Patient.remove({
            cpr: req.params.cpr
        }, function(err, news) {
        if (err) return res.send(err);
        res.json({ message: 'Patient successfully deleted' });
      });
    });

    // DELETE API User with username
    app.delete('/api/user/:username', function(req, res) {
        Users.remove({
            username: req.params.username
        }, function(err, news) {
        if (err) return res.send(err);
        res.json({ message: 'User successfully deleted' });
      });
    });

    app.get('/api/patients/:cpr', function(req, res) {
        Patient.remove({
              cpr: req.params.cpr
        }, function(err, patient) {
        if (err) return res.send(err);
        });
        res.redirect('/patients');
    });

    // Custom notification test
    app.post('/api/custom', function(req, res, next) {
        console.log(req.body);
        var datatitle = req.body.title || "New Notification";
        var datamsg = req.body.msg || "Message";
        // var receiver = req.body.receiver;
        var regTokens = [];
        var message = "";

        var newMesage = new Message();
        newMesage.title = datatitle;
        newMesage.body = datamsg;

        Device.find(function (err, devices) {
            if (err) return err;
            devices.forEach(function (item) {
                var stringregid = "dwi1T9u3hQM:"+item.regid;
                regTokens.push(stringregid);
            });

            // console.log("regTokens ", regTokens);

            // SEND GCM PUSH NOTIFICATION
            message = new gcm.Message();
            message.addNotification({
              title: '' + datatitle + '',
              body: '' + req.body + '',
              icon: 'icon',
              sound: 'default'
            });

            // console.log(message);

            console.log(regTokens);
            sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if(err) {
                    console.error(err);
                    return err;
                } else console.log(response);
            });

            // Save the message and check for errors
            newMesage.save(function(err) {
                if (err) res.send(err);
                res.json(newMesage);
            });
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
};
