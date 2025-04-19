import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';

// Routers REST
import traccarRoutes from './src/routes/index.js';
import driverRoutes from './src/routes/driverRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
// Función WebSocket definida en src/index.js
import initWebSocket from './src/index.js';
import combisRoutes from './src/routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

// Montar routers REST bajo /api
app.use('/api', traccarRoutes);
app.use('/api', driverRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', combisRoutes);
// Crear servidor HTTP y montar WebSocket
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
initWebSocket(server);

// Arrancar HTTP + WS
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
