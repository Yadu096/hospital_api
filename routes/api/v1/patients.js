const express = require('express');
const router = express.Router();
const patientsController = require('../../../controllers/patients_controller');
const passport = require('passport');

router.post('/register', passport.authenticate('jwt', {session: false}), patientsController.register);
router.post('/:id/create-report', passport.authenticate('jwt', {session: false}), patientsController.createReport);
router.get('/:id/all-reports', passport.authenticate('jwt', {session: false}), patientsController.allReports);


module.exports = router;
