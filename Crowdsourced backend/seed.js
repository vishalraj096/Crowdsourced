import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Business from './src/models/Business.js';
import Review from './src/models/Review.js';

dotenv.config();

// Test data
const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Jane Smith", 
    email: "jane@example.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Admin User",
    email: "admin@example.com", 
    password: "admin123",
    role: "admin"
  }
];

const businesses = [
  {
    name: "Mario's Pizza Palace",
    description: "Authentic Italian pizza with fresh ingredients",
    category: "restaurant",
    location: "New York, NY",
    phone: "555-123-4567",
    image: "/images/marios-pizza.jpg"
  },
  {
    name: "Coffee Corner Cafe",
    description: "Cozy coffee shop with great WiFi and pastries",
    category: "cafe",
    location: "San Francisco, CA", 
    phone: "555-987-6543",
    image: "/images/coffee-corner.jpg"
  },
  {
    name: "TechFix Repair",
    description: "Quick phone and laptop repairs",
    category: "service",
    location: "Austin, TX",
    phone: "555-456-7890",
    image: "/images/techfix.jpg"
  },
  {
    name: "Fashion Boutique",
    description: "Trendy clothing and accessories",
    category: "shop", 
    location: "Los Angeles, CA",
    phone: "555-321-6543",
    image: "/images/fashion-store.jpg"
  },
  {
    name: "Quick Burger Joint",
    description: "Fast and delicious burgers",
    category: "restaurant",
    location: "Chicago, IL",
    phone: "555-111-2222", 
    image: "/images/quick-burger.jpg"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crowdsourced-reviews');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Business.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`Created ${createdUsers.length} users`);

    // Create businesses
    const createdBusinesses = await Business.create(businesses);
    console.log(`Created ${createdBusinesses.length} businesses`);

    // Create some sample reviews
    const reviews = [
      {
        user: createdUsers[0]._id,
        business: createdBusinesses[0]._id,
        rating: 5,
        comment: "Amazing pizza! Best I've ever had.",
        status: "approved"
      },
      {
        user: createdUsers[1]._id,
        business: createdBusinesses[0]._id,
        rating: 4,
        comment: "Great food but service was slow.",
        status: "approved"  
      },
      {
        user: createdUsers[0]._id,
        business: createdBusinesses[1]._id,
        rating: 5,
        comment: "Perfect coffee and cozy atmosphere.",
        status: "approved"
      },
      {
        user: createdUsers[1]._id,
        business: createdBusinesses[2]._id,
        rating: 4,
        comment: "Fixed my phone quickly and reasonably priced.",
        status: "pending"
      },
      {
        user: createdUsers[0]._id,
        business: createdBusinesses[3]._id,
        rating: 3,
        comment: "Nice clothes but overpriced.",
        status: "pending"
      }
    ];

    const createdReviews = await Review.create(reviews);
    console.log(`Created ${createdReviews.length} reviews`);

    // Update business ratings based on approved reviews
    for (const business of createdBusinesses) {
      const approvedReviews = await Review.find({ 
        business: business._id, 
        status: 'approved' 
      });
      
      if (approvedReviews.length > 0) {
        const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / approvedReviews.length;
        
        await Business.findByIdAndUpdate(business._id, {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: approvedReviews.length
        });
      }
    }
    
    console.log('Updated business ratings');
    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');  
    console.log('Admin: admin@example.com / admin123');
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
