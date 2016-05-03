var mongoose = require('mongoose');

// Define the schema for the Patients model
var patientNews = mongoose.Schema({
    cpr: { type: String, default: '' },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    respiration: { type: String, default: 'unknown' },
    oxygenSat: { type: String, default: '' },
    oxygen: { type: String, default: '' },
    temperature: { type: String, default: '' },
    systolic: { type: String, default: '' },
    heartRate: { type: String, default: '' },
    consciousness: { type: String, default: '' },
    respirationScore: { type: String, default: 'unknown' },
    oxygenSatScore: { type: String, default: '' },
    oxygenScore: { type: String, default: '' },
    temperatureScore: { type: String, default: '' },
    systolicScore: { type: String, default: '' },
    heartRateScore: { type: String, default: '' },
    consciousnessScore: { type: String, default: '' },
    score: { type: String, default: '' },
    currentdate: { type: String, default: '' },
    currenttime: { type: String, default: '' }
});

module.exports = mongoose.model('PatientNews', patientNews);
