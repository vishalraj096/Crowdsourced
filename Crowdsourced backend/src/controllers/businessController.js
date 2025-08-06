import Business from '../models/Business.js';
import Review from '../models/Review.js';

export const getBusinesses = async (req, res) => {
  try {
    const { category, location, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const businesses = await Business.find(query)
      .sort({ averageRating: -1, createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: businesses.length,
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

export const getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching business',
      error: error.message
    });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const { name, description, category, location, phone, image } = req.body;

    if (!name || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, category, and location'
      });
    }

    const business = new Business({
      name,
      description,
      category,
      location,
      phone: phone || '',
      image: image || ''
    });

    await business.save();

    res.status(201).json({
      success: true,
      message: 'Business created successfully',
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating business',
      error: error.message
    });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.json({
      success: true,
      message: 'Business updated successfully',
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating business',
      error: error.message
    });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    await Review.deleteMany({ business: req.params.id });

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

export const getBusinessesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const businesses = await Business.find({ category })
      .sort({ averageRating: -1 })
      .limit(20);

    res.json({
      success: true,
      category,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching businesses by category',
      error: error.message
    });
  }
};

export const searchBusinesses = async (req, res) => {
  try {
    const { q } = req.query; 

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const businesses = await Business.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    })
    .sort({ averageRating: -1 })
    .limit(10);

    res.json({
      success: true,
      query: q,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching businesses',
      error: error.message
    });
  }
};

export const getNearbyBusinesses = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location parameter is required'
      });
    }

    const businesses = await Business.find({
      location: { $regex: location, $options: 'i' }
    })
    .sort({ averageRating: -1 })
    .limit(20);

    res.json({
      success: true,
      location,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby businesses',
      error: error.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = ['restaurant', 'cafe', 'shop', 'service', 'other'];
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Business.countDocuments({ category });
        return { category, count };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

export const updateBusinessRating = async (businessId, newRating) => {
  try {
    const business = await Business.findById(businessId);
    if (!business) return;

    const totalRating = (business.averageRating * business.totalReviews) + newRating;
    const newTotalReviews = business.totalReviews + 1;
    const newAverageRating = totalRating / newTotalReviews;

    await Business.findByIdAndUpdate(businessId, {
      averageRating: Math.round(newAverageRating * 10) / 10, // Round to 1 decimal
      totalReviews: newTotalReviews
    });
  } catch (error) {
    console.error('Error updating business rating:', error);
  }
};
