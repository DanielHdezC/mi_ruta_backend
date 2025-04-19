import express from 'express';
import { getCombisCercanas } from '../controllers/traccarController.js';

const router = express.Router();

router.get('/combis-cercanas', getCombisCercanas);

export default router;

