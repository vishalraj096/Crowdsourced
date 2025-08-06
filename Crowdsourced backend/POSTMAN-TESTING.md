# 🧪 Postman API Testing Guide - Crowdsourced Review Platform

## Base URL
```
http://localhost:5000/api
```

## 📋 Testing Sequence (Recommended Order)

### 1. 👤 User Authentication

#### Register User
```
POST /auth/register
```
**Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Register Admin
```
POST /auth/register
```
**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

#### Login User
```
POST /auth/login
```
**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** Save the `token` from response for authentication!

#### Get Profile (Protected)
```
GET /auth/profile
```
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 2. 🏢 Business Management

#### Create Business
```
POST /businesses
```
**Body (JSON):**
```json
{
  "name": "Mario's Pizza Palace",
  "description": "Authentic Italian pizza with fresh ingredients",
  "category": "restaurant",
  "location": "New York, NY",
  "phone": "555-123-4567",
  "image": "/images/marios-pizza.jpg"
}
```

#### Get All Businesses
```
GET /businesses
```

#### Get Businesses with Filters
```
GET /businesses?category=restaurant
GET /businesses?location=New York
GET /businesses?search=pizza
GET /businesses?category=cafe&location=San Francisco
```

#### Get Single Business
```
GET /businesses/BUSINESS_ID_HERE
```

#### Search Businesses
```
GET /businesses/search?q=pizza
```

#### Get Businesses by Category
```
GET /businesses/category/restaurant
```

#### Get Nearby Businesses
```
GET /businesses/nearby?location=New York
```

#### Update Business
```
PUT /businesses/BUSINESS_ID_HERE
```
**Body (JSON):**
```json
{
  "name": "Mario's Pizza Palace - Updated",
  "description": "Best Italian pizza in NYC",
  "phone": "555-123-9999"
}
```

#### Delete Business
```
DELETE /businesses/BUSINESS_ID_HERE
```

### 3. ⭐ Review Management

#### Create Review (Protected)
```
POST /reviews
```
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body (JSON):**
```json
{
  "business": "BUSINESS_ID_HERE",
  "rating": 5,
  "comment": "Amazing pizza! Best I've ever had. The crust was perfect and the service was excellent."
}
```

#### Get All Reviews
```
GET /reviews
```

#### Get Reviews for Specific Business
```
GET /reviews/business/BUSINESS_ID_HERE
```

#### Get Reviews by User
```
GET /reviews/user/USER_ID_HERE
```

#### Get Single Review
```
GET /reviews/REVIEW_ID_HERE
```

#### Update Review (Protected)
```
PUT /reviews/REVIEW_ID_HERE
```
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body (JSON):**
```json
{
  "rating": 4,
  "comment": "Updated review: Good pizza but service could be faster."
}
```

#### Delete Review (Protected)
```
DELETE /reviews/REVIEW_ID_HERE
```
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. 👑 Admin Operations

#### Get Pending Reviews (Admin Only)
```
GET /admin/reviews/pending
```
**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```

#### Approve Review (Admin Only)
```
PUT /admin/reviews/REVIEW_ID_HERE/approve
```
**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```

#### Reject Review (Admin Only)
```
PUT /admin/reviews/REVIEW_ID_HERE/reject
```
**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```
**Body (JSON):**
```json
{
  "reason": "Inappropriate content"
}
```

#### Get Admin Stats (Admin Only)
```
GET /admin/stats
```
**Headers:**
```
Authorization: Bearer ADMIN_TOKEN_HERE
```

### 5. 👥 User Operations

#### Get User Profile
```
GET /users/USER_ID_HERE
```

#### Get User Reviews
```
GET /users/USER_ID_HERE/reviews
```

#### Get User Stats
```
GET /users/USER_ID_HERE/stats
```

## 📊 Sample Test Data

### Business Data
```json
[
  {
    "name": "Tony's Pizza",
    "description": "New York style pizza",
    "category": "restaurant",
    "location": "New York, NY",
    "phone": "555-111-2222"
  },
  {
    "name": "Coffee Corner",
    "description": "Cozy coffee shop",
    "category": "cafe",
    "location": "San Francisco, CA",
    "phone": "555-333-4444"
  },
  {
    "name": "Tech Repair Shop",
    "description": "Phone and laptop repairs",
    "category": "service",
    "location": "Austin, TX",
    "phone": "555-555-6666"
  },
  {
    "name": "Fashion Boutique",
    "description": "Trendy clothing store",
    "category": "shop",
    "location": "Los Angeles, CA",
    "phone": "555-777-8888"
  }
]
```

### Review Data
```json
[
  {
    "rating": 5,
    "comment": "Excellent service and amazing food!"
  },
  {
    "rating": 4,
    "comment": "Good quality but a bit expensive."
  },
  {
    "rating": 3,
    "comment": "Average experience, nothing special."
  },
  {
    "rating": 2,
    "comment": "Poor service and food was cold."
  },
  {
    "rating": 1,
    "comment": "Terrible experience, would not recommend."
  }
]
```

## 🔧 Postman Environment Variables

Create these variables in Postman:

```
baseUrl: http://localhost:5000/api
userToken: (set after login)
adminToken: (set after admin login)
businessId: (set after creating business)
reviewId: (set after creating review)
userId: (set after user registration)
```

## 🎯 Testing Workflow

1. **Setup:** Register users (regular + admin)
2. **Login:** Get tokens for both user types
3. **Create Data:** Add businesses using regular user
4. **Reviews:** Create reviews for businesses
5. **Admin Work:** Login as admin, approve/reject reviews
6. **Validation:** Check if ratings update correctly

## ⚠️ Common HTTP Status Codes

- `200`: Success
- `201`: Created successfully
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found
- `500`: Server error

## 🚀 Quick Test Collection

Import this into Postman as a collection:

1. Register User → Save token
2. Create Business → Save businessId
3. Create Review → Save reviewId
4. Register Admin → Save admin token
5. Approve Review (as admin)
6. Get Business → Verify updated rating

This will test the complete user journey! 🎉
