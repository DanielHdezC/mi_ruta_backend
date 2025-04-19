import * as driverModel from '../models/driverModel.js';

export async function createDriver(req, res) {
  try {
    const { name } = req.body;
    const driver = await driverModel.createDriver(name);
    res.status(201).json(driver);
  } catch (err) {
    console.error('Error creating driver:', err);
    res.status(500).send('Internal server error');
  }
}

export async function listDrivers(req, res) {
  try {
    const drivers = await driverModel.listDrivers();
    res.json(drivers);
  } catch (err) {
    console.error('Error listing drivers:', err);
    res.status(500).send('Internal server error');
  }
}

export async function assignDriver(req, res) {
  try {
    const { driverId, vehicleId } = req.body;
    const updated = await driverModel.assignVehicle(driverId, vehicleId);
    if (!updated) return res.status(404).send('Driver or vehicle not found');
    res.json(updated);
  } catch (err) {
    console.error('Error assigning vehicle:', err);
    res.status(500).send('Internal server error');
  }
}

export async function getVehicle(req, res) {
  try {
    const { id } = req.params;
    const vehicle = await driverModel.getAssignedVehicle(id);
    if (!vehicle) return res.status(404).send('No assigned vehicle');
    res.json(vehicle);
  } catch (err) {
    console.error('Error getting assigned vehicle:', err);
    res.status(500).send('Internal server error');
  }
}
