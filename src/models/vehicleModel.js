import pool from '../config/db.js';

export async function createVehicle(vehicleId, gpsDeviceId) {
  const res = await pool.query(
    'INSERT INTO vehicles (vehicle_id, gps_device_id) VALUES ($1, $2) RETURNING *',
    [vehicleId, gpsDeviceId]
  );
  return res.rows[0];
}

export async function listVehicles() {
  const res = await pool.query('SELECT id, vehicle_id, gps_device_id FROM vehicles');
  return res.rows;
}
