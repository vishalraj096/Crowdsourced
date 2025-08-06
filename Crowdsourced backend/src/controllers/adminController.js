import Review from '../models/Review.js';
import Business from '../models/Business.js';
import User from '../models/User.js';
import { updateBusinessRating } from './businessController.js';

export const getPendingReviews = async (req, res) => {
  try {
    const pendingReviews = await Review.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('business', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: pendingReviews.length,
      data: pendingReviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending reviews',
      error: error.message
    });
  }
};

export const approveReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Review is not pending approval'
      });
    }

    review.status = 'approved';
    await review.save();

    await updateBusinessRating(review.business, review.rating);

    await review.populate('user', 'name');
    await review.populate('business', 'name');

    res.json({
      success: true,
      message: 'Review approved successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving review',
      error: error.message
    });
  }
};

export const rejectReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { reason } = req.body;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Review is not pending approval'
      });
    }

    review.status = 'rejected';
    if (reason) {
      review.moderatorNotes = reason;
    }
    await review.save();

    await review.populate('user', 'name');
    await review.populate('business', 'name');

    res.json({
      success: true,
      message: 'Review rejected successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error rejecting review',
      error: error.message
    });
  }
};

export const getReportedReviews = async (req, res) => {
  res.json({
    success: true,
    count: 0,
    data: [],
    message: 'No reported reviews (feature coming soon)'
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      count: users.length,
      total: totalUsers,
      page: parseInt(page),
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

export const getAllBusinesses = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const businesses = await Business.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalBusinesses = await Business.countDocuments();

    res.json({
      success: true,
      count: businesses.length,
      total: totalBusinesses,
      page: parseInt(page),
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching businesses',
      error: error.message
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const totalReviews = await Review.countDocuments();
    const pendingReviews = await Review.countDocuments({ status: 'pending' });
    const approvedReviews = await Review.countDocuments({ status: 'approved' });
    const rejectedReviews = await Review.countDocuments({ status: 'rejected' });

    const categoryStats = await Business.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });
    const recentBusinesses = await Business.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });
    const recentReviews = await Review.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });

    const stats = {
      totals: {
        users: totalUsers,
        businesses: totalBusinesses,
        reviews: totalReviews
      },
      reviews: {
        pending: pendingReviews,
        approved: approvedReviews,
        rejected: rejectedReviews
      },
      categories: categoryStats,
      recentActivity: {
        newUsers: recentUsers,
        newBusinesses: recentBusinesses,
        newReviews: recentReviews
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user role',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await Review.deleteMany({ user: userId });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const businessId = req.params.id;

    const business = await Business.findByIdAndDelete(businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    await Review.deleteMany({ business: businessId });

    res.json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting business',
      error: error.message
    });
  }
};
