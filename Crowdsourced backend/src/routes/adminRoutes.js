import express from 'express';
import { 
  getPendingReviews, 
  approveReview, 
  rejectReview,
  getDashboardStats
} from '../controllers/adminController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/reviews/pending', adminAuth, getPendingReviews);
router.put('/reviews/:id/approve', adminAuth, approveReview);
router.put('/reviews/:id/reject', adminAuth, rejectReview);
router.get('/stats', adminAuth, getDashboardStats);

export default router;
