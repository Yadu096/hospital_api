const express = require('express');
const router = express.Router();
const doctorsController = require('../../../controllers/doctors_controller');

router.post('/register', doctorsController.register);
router.get('/login', doctorsController.createSession);


module.exports = router;
