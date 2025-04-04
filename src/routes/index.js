import express from 'express';
import { obtenerCercanas } from '../controllers/combisController.js';

const router = express.Router();
router.get('/combis-cercanas', obtenerCercanas);
export default router;
