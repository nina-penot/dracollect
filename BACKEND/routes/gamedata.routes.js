// routes/auth.routes.js
import { Router } from 'express'; // Import nommé ⬅️
// import { register, login, getProfile } from '../controllers/auth.controller.js';
import { getZoneAll } from '../controllers/zones.controller.js';
// import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// Routes publiques
router.get('/zones', getZoneAll);

export default router;