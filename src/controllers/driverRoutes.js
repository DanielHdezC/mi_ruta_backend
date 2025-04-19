const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/driverController');

router.post('/drivers', ctrl.createDriver);
router.get('/drivers', ctrl.listDrivers);
router.post('/assign-driver', ctrl.assignDriver);
router.get('/driver/:id/vehicle', ctrl.getVehicle);

module.exports = router;
