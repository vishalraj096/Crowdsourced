# Business API Documentation

## Business Model Structure

### Create Business Request
```json
{
  "name": "Your Business Name",
  "description": "Detailed description of your business",
  "category": "restaurant", // Options: restaurant, cafe, retail, service, healthcare, automotive, beauty, fitness, entertainment, education, other
  "address": {
    "street": "123 Main Street",
    "city": "Your City",
    "state": "Your State",
    "zipCode": "12345",
    "country": "USA"
  },
  "location": {
    "type": "Point",
    "coordinates": [-73.935242, 40.730610] // [longitude, latitude]
  },
  "contact": {
    "phone": "+1-555-123-4567",
    "email": "contact@business.com",
    "website": "https://www.business.com"
  },
  "hours": {
    "monday": { "open": "09:00", "close": "17:00", "closed": false },
    "tuesday": { "open": "09:00", "close": "17:00", "closed": false },
    "wednesday": { "open": "09:00", "close": "17:00", "closed": false },
    "thursday": { "open": "09:00", "close": "17:00", "closed": false },
    "friday": { "open": "09:00", "close": "17:00", "closed": false },
    "saturday": { "open": "10:00", "close": "16:00", "closed": false },
    "sunday": { "open": "", "close": "", "closed": true }
  },
  "priceRange": "$$", // Options: $, $$, $$$, $$$$
  "features": [
    "wifi",
    "parking",
    "outdoor-seating",
    "delivery",
    "takeout"
  ]
}
```

### Business Response (Full Object)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Mario's Italian Restaurant",
  "description": "Authentic Italian cuisine in the heart of downtown...",
  "category": "restaurant",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "location": {
    "type": "Point",
    "coordinates": [-73.935242, 40.730610]
  },
  "contact": {
    "phone": "+1-555-123-4567",
    "email": "info@mariositalian.com",
    "website": "https://www.mariositalian.com"
  },
  "hours": {
    "monday": { "open": "11:00", "close": "22:00", "closed": false },
    "tuesday": { "open": "11:00", "close": "22:00", "closed": false },
    "wednesday": { "open": "11:00", "close": "22:00", "closed": false },
    "thursday": { "open": "11:00", "close": "22:00", "closed": false },
    "friday": { "open": "11:00", "close": "23:00", "closed": false },
    "saturday": { "open": "11:00", "close": "23:00", "closed": false },
    "sunday": { "open": "12:00", "close": "21:00", "closed": false }
  },
  "images": [
    "/uploads/businesses/marios-restaurant-exterior.jpg",
    "/uploads/businesses/marios-restaurant-interior.jpg"
  ],
  "priceRange": "$$$",
  "features": [
    "outdoor-seating",
    "wifi",
    "parking",
    "wine-bar",
    "romantic",
    "family-friendly"
  ],
  "ratings": {
    "overall": {
      "average": 4.5,
      "count": 127
    },
    "quality": {
      "average": 4.7,
      "count": 127
    },
    "service": {
      "average": 4.3,
      "count": 127
    },
    "value": {
      "average": 4.1,
      "count": 127
    }
  },
  "isActive": true,
  "owner": "507f1f77bcf86cd799439012",
  "verified": true,
  "createdAt": "2025-08-06T10:30:00.000Z",
  "updatedAt": "2025-08-06T10:30:00.000Z"
}
```

## Business Categories
- `restaurant` - Restaurants, diners, fast food
- `cafe` - Coffee shops, tea houses, bakeries
- `retail` - Stores, boutiques, shopping
- `service` - Repair services, consulting, professional services
- `healthcare` - Clinics, dental offices, wellness centers
- `automotive` - Car repair, dealerships, car wash
- `beauty` - Salons, spas, beauty services
- `fitness` - Gyms, yoga studios, sports facilities
- `entertainment` - Theaters, bars, entertainment venues
- `education` - Schools, tutoring, training centers
- `other` - Any other business type

## Price Ranges
- `$` - Budget-friendly (Under $15 per person)
- `$$` - Moderate (15-30 per person)
- `$$$` - Expensive ($30-60 per person)
- `$$$$` - Very Expensive ($60+ per person)

## Common Features
- `wifi` - Free WiFi available
- `parking` - Parking available
- `outdoor-seating` - Outdoor seating area
- `delivery` - Delivery service
- `takeout` - Takeout available
- `reservations` - Accepts reservations
- `wheelchair-accessible` - Wheelchair accessible
- `pet-friendly` - Pets allowed
- `family-friendly` - Good for families
- `romantic` - Romantic atmosphere
- `business-friendly` - Good for business meetings
- `live-music` - Live music events
- `happy-hour` - Happy hour specials
- `vegan-options` - Vegan menu options
- `gluten-free` - Gluten-free options
- `credit-cards` - Accepts credit cards
- `cash-only` - Cash only
- `byob` - Bring your own bottle
- `full-bar` - Full bar available
- `wine-bar` - Wine selection available
