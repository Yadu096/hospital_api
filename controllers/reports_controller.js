const Report = require('../models/reports');

//show reports filtered on the basis of status
module.exports.showReports = async function(req, res){
    try{
        //get all the reports filtered according to the provided status
        let reports = await Report.find({status: req.params.status});

        if(reports.length != 0){
            return res.status(200).json({
                message: "Requested reports: ",
                reports: reports
            })
        }else{
            //No report found
            return res.status(400).json({
                message: "No such report found"
            });
        }

    }catch(err){
        console.log(err,"***Error***");
        return res.status(500).json({
            message: "Could not get the reports, please try again"
        });
    }
}