import { WebSocketServer } from 'ws';
import { enviarPosicionesPeriodicamente } from './services/traccarService.js';

/**
 * Inicializa el servidor WebSocket sobre el HTTP server existente.
 */
export default function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('🟢 Cliente WebSocket conectado');
  });

  // Envía datos periódicamente a todos los clientes conectados
  enviarPosicionesPeriodicamente(wss);
}
