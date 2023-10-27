const express = require('express');
const router = express.Router();
const reportsController = require('../../../controllers/reports_controller');
const passport = require('passport');

router.get('/:status', passport.authenticate('jwt', {session: false}), reportsController.showReports);



module.exports = router;
