# 🚀 Crowdsourced Review Platform - Simplified for Hackathon

## 📁 Project Structure

```
Crowdsourced backend/
├── src/
│   ├── models/           # Database models
│   │   ├── User.js       # Simple user model
│   │   ├── Business.js   # Simplified business model  
│   │   └── Review.js     # Basic review model
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── businessRoutes.js
│   │   └── reviewRoutes.js
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth middleware
│   └── server.js         # Main server file
├── sample-data/          # Sample JSON data
└── package.json          # Dependencies
```

## 📊 Simplified Data Models

### 🏢 Business Model
```javascript
{
  name: String,           // "Mario's Pizza"
  description: String,    // "Best pizza in town"
  category: String,       // restaurant, cafe, shop, service, other
  location: String,       // "New York, NY"
  phone: String,          // "555-123-4567"
  image: String,          // Single image URL
  averageRating: Number,  // 4.5
  totalReviews: Number    // 25
}
```

### 👤 User Model
```javascript
{
  name: String,     // "John Smith"
  email: String,    // "john@example.com"
  password: String, // Hashed
  role: String      // "user" or "admin"
}
```

### ⭐ Review Model
```javascript
{
  user: ObjectId,      // Reference to user
  business: ObjectId,  // Reference to business
  rating: Number,      // 1-5 stars
  comment: String,     // Review text (max 500 chars)
  status: String       // pending, approved, rejected
}
```

## 🎯 Key Features for Demo

1. **Browse Businesses** - Simple list with search by category
2. **Submit Reviews** - Basic form with rating and comment
3. **Admin Approval** - Simple approve/reject interface
4. **Rating Aggregation** - Auto-calculate average ratings

## ⚡ Quick Start

1. Install dependencies: `npm install`
2. Start server: `npm run dev`
3. API will be available at `http://localhost:5000`

## 🛠 Essential API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/businesses` - List businesses
- `POST /api/businesses` - Add business
- `POST /api/reviews` - Submit review
- `GET /api/reviews/:businessId` - Get business reviews
- `PUT /api/reviews/:id/approve` - Admin approve review

## 💡 Hackathon Tips

- Focus on core functionality first
- Use the sample data to populate your database
- Keep UI simple but functional
- Demo the full user journey: browse → review → admin approval
- Have backup plans for complex features

## 🎨 Frontend Integration

Frontend should handle:
- Business listing page
- Review submission form
- Admin dashboard (simple table)
- Basic search/filter by category

This simplified structure will help you build a working demo quickly! 🚀
