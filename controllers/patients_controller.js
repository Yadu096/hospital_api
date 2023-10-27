const Patient = require('../models/patients');
const Report = require('../models/reports');

//register the patient
module.exports.register = async function(req, res){
    try{
        //search if registration with the provided phone number is already done
        let patient = await Patient.findOne({phone: req.body.phone});
        if(patient){
            //patient exists, so return his/her info
            return res.status(400).json({
                message: "Patient already registered",
                patient: patient
            });
        }else{
            //register the patient
            let patient = await Patient.create({
                name: req.body.name,
                phone: req.body.phone,
                UHID: req.body.UHID
            });

            return res.status(200).json({
                message: "Patient successfully registered",
                patient: patient
            });
        }

    }catch{err}{
        console.log(err, "***Error***");
        req.status(500).json({
            message: "Could not register the patient"
        });
    }
}

//create report
module.exports.createReport = async function(req, res){
    try{
        //Get the patient whose report is to be created from the params
        let patient = await Patient.findById(req.params.id);
        //create the report only if the patient exists
        if(patient){
            let report = await Report.create({
                doc_name: req.body.doc_name,
                status: req.body.status,
                date: req.body.date,
                patient: req.params.id
            });
            //Push this report in the patients model
            patient.reports.push(report.id);
            patient.save();

            return res.status(200).json({
                message: "Report created. Please preview: ",
                report: report
            });

        }else{
            return res.status(400).json({
                message: "No patient with the given ID exists"
            });
        }

    }catch(err){
        console.log(err, "***Error***");
        return res.status(500).json({
            message: "Could not create the report"
        });
    }
}

//Show reports
module.exports.allReports = async function(req, res){
    try{
        //get all reports of the patient
        let patient = await Patient.findById(req.params.id);
        if(patient){
            //get all reports of this patient
            let reports = await Report.find({patient: req.params.id});

            return res.status(200).json({
                message: "Here are all the requested reports:",
                reports: reports
            });
        }else{
            return res.status(400).json({
                message: "No patient with the given ID exists"
            });
        }

    }catch(err){
        console.log(err,"***Error***");
        return res.status(500).json({
            messsage: "could not get the reports"
        });
    }
}


