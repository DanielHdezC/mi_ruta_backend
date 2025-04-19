import { Router } from 'express';
import * as vehicleModel from '../models/vehicleModel.js';

const router = Router();
router.post('/vehicles', async (req, res) => {
  try {
    const { vehicleId, gpsDeviceId } = req.body;
    const vehicle = await vehicleModel.createVehicle(vehicleId, gpsDeviceId);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error('Error creating vehicle:', err);
    res.status(500).send('Internal server error');
  }
});
router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await vehicleModel.listVehicles();
    res.json(vehicles);
  } catch (err) {
    console.error('Error listing vehicles:', err);
    res.status(500).send('Internal server error');
  }
});
export default router;
