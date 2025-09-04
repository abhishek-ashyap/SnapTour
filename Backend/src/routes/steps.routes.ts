import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  addStepToTour,
  updateStep,
  deleteStep,
  deleteAllStepsForTour
} from '../controllers/steps.controller';

const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.route('/')
  .post(addStepToTour)
  .delete(deleteAllStepsForTour);

router.route('/:stepId')
  .put(updateStep)
  .delete(deleteStep);

export default router;