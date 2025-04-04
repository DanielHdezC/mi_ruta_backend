import { obtenerPosiciones } from '../services/traccarService.js';
import { DateTime } from 'luxon';

export const obtenerCercanas = async (req, res) => {
  console.log('⚡ LLEGÓ A LA FUNCIÓN obtenerCercanas ⚡');
  const { lat, lon } = req.query;
  const ahora = DateTime.now();

  try {
    const posiciones = await obtenerPosiciones();
    console.log(`📍 Se recibieron ${posiciones.length} posiciones desde Traccar`);

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3;
      const toRad = Math.PI / 180;
      const φ1 = lat1 * toRad;
      const φ2 = lat2 * toRad;
      const Δφ = (lat2 - lat1) * toRad;
      const Δλ = (lon2 - lon1) * toRad;
      const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const cercanas = posiciones.filter(p => {
      const tiempo = DateTime.fromISO(p.deviceTime);
      const diferenciaMinutos = ahora.diff(tiempo, 'minutes').minutes;

      return (
        diferenciaMinutos < 15 &&
        calcularDistancia(p.latitude, p.longitude, parseFloat(lat), parseFloat(lon)) < 3000
      );
    });

    console.log(`✅ Se van a enviar ${cercanas.length} posiciones`);
    res.json(cercanas);
  } catch (error) {
    console.error('❌ Error al consultar Traccar:', error.message);
    res.status(500).json({ error: 'Error al consultar Traccar' });
  }
};

