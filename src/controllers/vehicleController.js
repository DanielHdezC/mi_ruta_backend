import * as vehicleModel from '../models/vehicleModel.js';

export async function createVehicle(req, res) {
  const { vehicleId, gpsDeviceId } = req.body;
  const vehicle = await vehicleModel.createVehicle(vehicleId, gpsDeviceId);
  res.status(201).json(vehicle);
}

export async function listVehicles(req, res) {
  const vehicles = await vehicleModel.listVehicles();
  res.json(vehicles);
}
