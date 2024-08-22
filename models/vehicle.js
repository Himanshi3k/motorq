// models/vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vin: {
        type: String,
        required: true,
        unique: true
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Org',
        required: true
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);


