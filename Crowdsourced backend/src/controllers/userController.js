import User from '../models/User.js';
import Review from '../models/Review.js';

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and email'
      });
    }

    const existingUser = await User.findOne({ 
      email, 
      _id: { $ne: userId } 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

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
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user account',
      error: error.message
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviewStats = await Review.aggregate([
      { $match: { user: userId } },
      { 
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalReviews = await Review.countDocuments({ user: userId });

    const stats = {
      totalReviews,
      approved: reviewStats.find(stat => stat._id === 'approved')?.count || 0,
      pending: reviewStats.find(stat => stat._id === 'pending')?.count || 0,
      rejected: reviewStats.find(stat => stat._id === 'rejected')?.count || 0
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user stats',
      error: error.message
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const { avatarUrl } = req.body;
    const userId = req.user.id;

    if (!avatarUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide avatar URL'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Avatar updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading avatar',
      error: error.message
    });
  }
};
