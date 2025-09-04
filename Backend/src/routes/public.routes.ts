import { Router } from 'express';
import { getPublicTour } from '../controllers/public.controller';

const router = Router();

// This is a public route, no authentication is required.
router.get('/tours/:id', getPublicTour);

export default router;