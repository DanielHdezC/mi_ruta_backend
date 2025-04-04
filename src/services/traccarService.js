import axios from 'axios';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();

let cookie = null;

const loginTraccar = async () => {
  try {
    console.log('Intentando conectar con Traccar...');
    const params = new URLSearchParams();
    params.append('email', process.env.TRACCAR_USER);
    params.append('password', process.env.TRACCAR_PASS);

    const response = await axios.post(
      `${process.env.TRACCAR_URL}/api/session`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    cookie = response.headers['set-cookie'][0];
    console.log('✅ Login exitoso');
  } catch (error) {
    console.error('❌ Fallo login Traccar:', error.message);
    if (error.response) {
      console.log('Código de respuesta:', error.response.status);
      console.log('Respuesta:', error.response.data);
    }
  }
};

const obtenerPosiciones = async () => {
  try {
    if (!cookie) {
      await loginTraccar();
    }

    const response = await axios.get(`${process.env.TRACCAR_URL}/api/positions`, {
      headers: {
        Cookie: cookie,
      },
    });

    const posiciones = response.data;
    console.log(`📍 Se recibieron ${posiciones.length} posiciones desde Traccar`);
    return posiciones;
  } catch (error) {
    console.error('❌ Error al consultar Traccar:', error.message);
    return [];
  }
};

const enviarPosicionesPeriodicamente = (wss) => {
  setInterval(async () => {
    const posiciones = await obtenerPosiciones();
    console.log(`✅ Se van a enviar ${posiciones.length} posiciones`);
    wss.clients.forEach((cliente) => {
      if (cliente.readyState === WebSocket.OPEN) {
        cliente.send(JSON.stringify(posiciones));
      }
    });
  }, 5000); // cada 5 segundos
};

export {
  loginTraccar,
  obtenerPosiciones,
  enviarPosicionesPeriodicamente
};

