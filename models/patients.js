const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    UHID:{
        type: Number
    },
    reports:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;