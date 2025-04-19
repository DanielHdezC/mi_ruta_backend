import pool from '../config/db.js';

export async function createDriver(name) {
  const res = await pool.query(
    'INSERT INTO drivers (name) VALUES ($1) RETURNING *',
    [name]
  );
  return res.rows[0];
}

export async function listDrivers() {
  const res = await pool.query(
    'SELECT id, name, assigned_vehicle_id FROM drivers'
  );
  return res.rows;
}

export async function assignVehicle(driverId, vehicleId) {
  const res = await pool.query(
    'UPDATE drivers SET assigned_vehicle_id = $1 WHERE id = $2 RETURNING *',
    [vehicleId, driverId]
  );
  return res.rows[0];
}

export async function getAssignedVehicle(driverId) {
  const res = await pool.query(
    `SELECT d.id, d.name, v.vehicle_id, v.gps_device_id
     FROM drivers d
     JOIN vehicles v ON d.assigned_vehicle_id = v.id
     WHERE d.id = $1`,
    [driverId]
  );
  return res.rows[0];
}
