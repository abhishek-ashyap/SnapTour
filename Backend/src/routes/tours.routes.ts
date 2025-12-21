import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createTour,
  getUserTours,
  getTourById,
  updateTour,
  deleteTour,
  deleteAllTours,
} from '../controllers/tours.controller';

const router = Router();

router.use(authMiddleware);

// /api/tours
router.route('/')
  .post(createTour)
  .get(getUserTours);

// DELETE ALL tours for logged-in user
router.delete('/all', deleteAllTours);

// /api/tours/:id
router.route('/:id')
  .get(getTourById)
  .put(updateTour)
  .delete(deleteTour);

export default router;
