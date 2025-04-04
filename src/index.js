import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import rutas from './routes/index.js';
import { enviarPosicionesPeriodicamente } from './services/traccarService.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

// WebSocket conectado directamente al mismo servidor
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('🟢 Cliente WebSocket conectado');
});

enviarPosicionesPeriodicamente(wss); // envía datos a todos los clientes conectados cada 5 segundos

app.use(cors());
app.use(express.json());
app.use('/api', rutas);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor MiRuta backend escuchando en 0.0.0.0:${PORT}`);
});

