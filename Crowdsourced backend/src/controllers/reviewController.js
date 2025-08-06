import Review from '../models/Review.js';
import Business from '../models/Business.js';
import { updateBusinessRating } from './businessController.js';

export const getReviews = async (req, res) => {
  try {
    const { status, business, user } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (business) {
      query.business = business;
    }

    if (user) {
      query.user = user;
    }

    const reviews = await Review.find(query)
      .populate('user', 'name')
      .populate('business', 'name')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name')
      .populate('business', 'name');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review',
      error: error.message
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { business, rating, comment } = req.body;
    const userId = req.user.id;

    if (!business || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide business ID, rating, and comment'
      });
    }

    const businessExists = await Business.findById(business);
    if (!businessExists) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    const existingReview = await Review.findOne({ user: userId, business });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this business'
      });
    }

    const review = new Review({
      user: userId,
      business,
      rating,
      comment,
      status: 'pending' // Needs admin approval
    });

    await review.save();

    await review.populate('user', 'name');
    await review.populate('business', 'name');

    res.status(201).json({
      success: true,
      message: 'Review submitted for approval',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.status = 'pending'; // Needs re-approval after edit

    await review.save();
    await review.populate('user', 'name');
    await review.populate('business', 'name');

    res.json({
      success: true,
      message: 'Review updated and sent for re-approval',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.user.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};

export const getBusinessReviews = async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const { status = 'approved' } = req.query; // Default to approved reviews

    const reviews = await Review.find({ 
      business: businessId, 
      status 
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 })
    .limit(20);

    res.json({
      success: true,
      businessId,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching business reviews',
      error: error.message
    });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;

    const reviews = await Review.find({ user: userId })
      .populate('business', 'name')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      userId,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user reviews',
      error: error.message
    });
  }
};

export const voteHelpful = async (req, res) => {
  res.json({
    success: true,
    message: 'Vote helpful feature - Coming soon!'
  });
};

export const reportReview = async (req, res) => {
  res.json({
    success: true,
    message: 'Report review feature - Coming soon!'
  });
};
