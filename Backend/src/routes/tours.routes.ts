import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createTour,
  getUserTours,
  getTourById,
  updateTour,
  deleteTour,
} from '../controllers/tours.controller';

const router = Router();

// Apply the auth middleware to all routes in this file
router.use(authMiddleware);

// Route definitions
router.route('/')
  .post(createTour)
  .get(getUserTours);

router.route('/:id')
  .get(getTourById)
  .put(updateTour)
  .delete(deleteTour);

export default router;