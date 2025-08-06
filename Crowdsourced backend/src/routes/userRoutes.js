import express from 'express';
import { 
  getUser, 
  getUserStats
} from '../controllers/userController.js';
import { getUserReviews } from '../controllers/reviewController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/:id/reviews', getUserReviews);
router.get('/:id/stats', getUserStats);

export default router;
