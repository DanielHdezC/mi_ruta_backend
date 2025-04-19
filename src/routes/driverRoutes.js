import { Router } from 'express';
import * as ctrl from '../controllers/driverController.js';

const router = Router();
router.post('/drivers', ctrl.createDriver);
router.get('/drivers', ctrl.listDrivers);
router.post('/assign-driver', ctrl.assignDriver);
router.get('/driver/:id/vehicle', ctrl.getVehicle);
export default router;
