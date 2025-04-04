import { loginTraccar, obtenerPosiciones } from './traccarService.js';

export default (io) => {
  io.on('connection', (socket) => {
    console.log('📡 Cliente conectado por WebSocket');

    socket.on('solicitar-combis', async (coords) => {
      try {
        const cookie = await loginTraccar();
        const posiciones = await obtenerPosiciones(cookie);

        // Solo para pruebas: envía todo
        const cercanas = posiciones;

        console.log(`✅ WS: Enviando ${cercanas.length} posiciones al cliente`);
        socket.emit('combis-cercanas', cercanas);
      } catch (err) {
        console.error('❌ Error en WebSocket:', err);
        socket.emit('combis-cercanas', []);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 Cliente desconectado');
    });
  });
};

