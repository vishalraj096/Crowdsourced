# Crowdsourced Reviews Backend

A Node.js/Express backend for a crowdsourced review platform where users can review and rate local businesses.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Business Management**: CRUD operations for businesses with location-based search
- **Review System**: Users can submit reviews with multiple rating criteria
- **Admin Moderation**: Admin approval workflow for reviews
- **File Uploads**: Image upload support with Cloudinary integration
- **Email Notifications**: Automated email notifications for users
- **Search & Filtering**: Advanced search and filtering capabilities

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic services
├── utils/          # Utility functions
└── server.js       # Main server file
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get business by ID
- `POST /api/businesses` - Create new business
- `PUT /api/businesses/:id` - Update business
- `DELETE /api/businesses/:id` - Delete business

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews/business/:id` - Get reviews for a business
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/reviews/pending` - Get pending reviews
- `PUT /api/admin/reviews/:id/approve` - Approve review
- `PUT /api/admin/reviews/:id/reject` - Reject review

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT
