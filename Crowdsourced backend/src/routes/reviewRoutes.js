import express from 'express';
import { 
  getReviews, 
  getReview, 
  createReview, 
  updateReview, 
  deleteReview,
  getBusinessReviews,
  getUserReviews
} from '../controllers/reviewController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/business/:businessId', getBusinessReviews);
router.get('/user/:userId', getUserReviews);
router.get('/:id', getReview);
router.post('/', auth, createReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

export default router;
