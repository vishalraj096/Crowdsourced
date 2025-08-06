import express from 'express';
import { 
  getBusinesses, 
  getBusiness, 
  createBusiness, 
  updateBusiness, 
  deleteBusiness,
  getBusinessesByCategory,
  searchBusinesses,
  getNearbyBusinesses,
  getCategories
} from '../controllers/businessController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBusinesses);
router.get('/categories', getCategories);
router.get('/search', searchBusinesses);
router.get('/nearby', getNearbyBusinesses);
router.get('/category/:category', getBusinessesByCategory);
router.get('/:id', getBusiness);
router.post('/', createBusiness);
router.put('/:id', auth, updateBusiness);
router.delete('/:id', auth, deleteBusiness);

export default router;
