// === src/controllers/traccarController.js ===
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TRACCAR_URL = process.env.TRACCAR_URL;
const AUTH = {
  username: process.env.TRACCAR_USER,
  password: process.env.TRACCAR_PASS
};

function haversineDistance(coord1, coord2) {
  const toRad = deg => deg * (Math.PI / 180);
  const R = 6371; // km

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getCombisCercanas(req, res) {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitud y longitud requeridas' });
  }

  try {
    const response = await axios.get(`${TRACCAR_URL}/api/positions`, {
      auth: AUTH
    });

    const posiciones = response.data;
    const pasajeroCoord = { lat: parseFloat(lat), lng: parseFloat(lng) };

    const cercanas = posiciones.filter(pos => {
      const distancia = haversineDistance(pasajeroCoord, {
        lat: pos.latitude,
        lng: pos.longitude
      });
      return distancia <= 0.5; // 500 metros
    });

    res.json(cercanas);
  } catch (err) {
    console.error('Error obteniendo combis cercanas:', err.message);
    res.status(500).send('Error al consultar Traccar');
  }
}
