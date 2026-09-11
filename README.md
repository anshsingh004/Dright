# Dright — Premium Car Rental Marketplace

[![Live Deployment](https://img.shields.io/badge/Live_Demo-drightapp.vercel.app-0070f3?style=for-the-badge&logo=vercel)](https://drightapp.vercel.app/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_+_Express_5-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

> **Dright** is a full-stack, enterprise-ready car rental marketplace engineered with the MERN stack. Designed to connect vehicle owners with discerning renters, Dright pairs real-time booking availability with flexible chauffeur options, home delivery fulfillment, and an intuitive dual-dashboard architecture.

---

## 🌟 Key Highlights & Feature Matrix

### 1. 📅 Automatic Booking-Based Availability Engine
- **No Cron Jobs / No Polling:** Car availability is computed dynamically on-demand using date overlap mathematical logic:
  $$\text{booking.pickupDate} \le \text{requested.returnDate} \quad \text{AND} \quad \text{booking.returnDate} \ge \text{requested.pickupDate}$$
- **Status Filtering:** `pending` and `confirmed` bookings block the car; `cancelled` bookings instantly release the vehicle.
- **Double-Booking Guard:** Real-time database locking verifies zero date collisions before booking creation.
- **Strict Date Range Validation:** Rejects past dates, missing fields, or return dates earlier than pickup dates. Minimum 1-day rental pricing calculation prevents zero-cost exploits.

### 2. 👨‍✈️ Flexible Rental Options (Car Only vs. Car + Driver)
- **Chauffeur Availability Control:** Car owners can toggle whether a driver service is available on their vehicle directly from the listing portal.
- **Customer Selection:** Renters choose between **Self-Drive (Car Only)** and **Car + Driver** during booking.
- **Defensive Backend Guard:** Backend rejects any driver-inclusive booking if the selected car has driver services disabled.
- **Zero Overhead:** No separate driver accounts or driver dashboards; seamless owner fulfillment model.

### 3. 🚚 Pickup vs. Home Delivery Fulfillment
- **Fulfillment Choice:** Renters can pick up the vehicle at the owner's hub or request direct **Home Delivery**.
- **Doorstep Address Input:** Selecting delivery opens an integrated street address field saved directly to the booking record.
- **Visual Badges:** Booking cards on both User and Owner dashboards prominently display the chosen fulfillment type and destination address.

### 4. 🌍 Expanded Centralized Geographic Coverage
- **18 Major Hubs:** Expanded from the initial 4 cities to 18 metropolitan locations across India and international hubs:
  - *International:* New York, Los Angeles, Houston, Chicago
  - *India:* Delhi, Gurgaon, Noida, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Jaipur, Chandigarh, Dehradun, Goa
- **Single Source of Truth:** Centralized `cityList` configuration ensures identical location options across homepage search, car filtering, owner listing forms, and catalog navigation.

### 5. 🏆 Top 3 Category Recommendations
- **Categorized Curations:** Dynamic recommendation engine categorizes available cars (SUVs, Sedans, Vans).
- **Deterministic Ranking:** Ranks vehicles by recency (model year), best daily rate value, and listing freshness.
- **Visual Curation Badges:** Displays `#1 Top Pick`, `#2 Recommended`, and `#3 Popular Choice` badges on top vehicles.
- **Availability Aware:** Only currently bookable, active vehicles appear in recommendations.

### 6. ⭐ Populated Authentic Testimonials & Reviews
- **Rich Experience Showcases:** Real customer reviews across key touchpoints: booking speed, vehicle condition, chauffeur professionalism, cleanliness, and home delivery convenience.
- **Individual High-Resolution Avatars:** Distinct, unrepeated photographic assets for every reviewer with verified renter badges.

### 7. 🛡️ Production Deep-Linking & Vercel SPA Routing
- **Zero 404s on Refresh:** Configured `client/vercel.json` SPA rewrites ensuring direct navigation to `/cars`, `/owner`, and `/my-bookings` routes seamlessly on Vercel CDN.

---

## 🏗 System Architecture

```
                               ┌────────────────────────┐
                               │   Vite + React SPA     │
                               │  (Tailwind, Framer)    │
                               └───────────┬────────────┘
                                           │ HTTP / REST
                                           ▼
                               ┌────────────────────────┐
                               │   Express.js Server    │
                               │ (Auth, JWT, Multer)    │
                               └─────┬────────────┬─────┘
                                     │            │
            ┌────────────────────────┘            └────────────────────────┐
            ▼                                                              ▼
 ┌─────────────────────┐                                        ┌─────────────────────┐
 │    MongoDB Atlas    │                                        │  ImageKit Cloud CDN │
 │ (Cars, Users, Book) │                                        │ (Optimized Images)  │
 └─────────────────────┘                                        └─────────────────────┘
```

---

## 📊 Database Schema Models

### `User` Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name of the user |
| `email` | String | Unique email address (indexed) |
| `password` | String | Bcrypt-hashed password |
| `role` | String | Enum: `["user", "owner"]` (default: `"user"`) |
| `image` | String | Profile avatar URL |

### `Car` Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `owner` | ObjectId | Reference to `User` model |
| `brand` | String | Manufacturer make (e.g. BMW, Toyota) |
| `model` | String | Model designation (e.g. X5, Corolla) |
| `image` | String | Hosted image URL (ImageKit) |
| `year` | Number | Manufacturing year |
| `category` | String | Vehicle class (`Sedan`, `SUV`, `Van`) |
| `seating_capacity` | Number | Passenger seat count (sanitized $\ge 1$) |
| `fuel_type` | String | Fuel configuration (`Petrol`, `Diesel`, `Hybrid`, `Electric`) |
| `transmission` | String | Gearbox type (`Automatic`, `Manual`, `Semi-Automatic`) |
| `pricePerDay` | Number | Daily rental rate |
| `location` | String | Home city/hub (from centralized `cityList`) |
| `description` | String | Vehicle description and overview |
| `isAvaliable` | Boolean | Listing-level owner availability toggle (*preserved spelling*) |
| `driverAvailable` | Boolean | Whether chauffeur service can be requested (*default: true*) |

### `Booking` Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `car` | ObjectId | Reference to booked `Car` |
| `user` | ObjectId | Reference to renting `User` |
| `owner` | ObjectId | Reference to vehicle `owner` |
| `pickupDate` | Date | Start of rental period (inclusive) |
| `returnDate` | Date | End of rental period (inclusive) |
| `status` | String | Enum: `["pending", "confirmed", "cancelled"]` |
| `price` | Number | Total booking price (days $\times$ pricePerDay) |
| `withDriver` | Boolean | Chauffeur requested (*default: false*) |
| `pickupOption` | String | Enum: `["pickup", "delivery"]` (*default: "pickup"*) |
| `deliveryAddress` | String | Street delivery address when delivery is chosen |

---

## 🔌 API Endpoints Reference

### User & Authentication (`/api/user`)
- `POST /api/user/register` — Register a new account (returns JWT).
- `POST /api/user/login` — Authenticate existing user (returns JWT).
- `GET /api/user/data` — Retrieve profile for authenticated user (`Bearer <token>`).
- `GET /api/user/cars` — Retrieve all active cars (`isAvaliable: true`).

### Bookings & Availability (`/api/bookings`)
- `POST /api/bookings/check-availability` — Query available cars for given `pickupDate`, `returnDate`, and optional `location`.
- `POST /api/bookings/create` — Book a car with date collision check, `withDriver`, and `pickupOption`.
- `GET /api/bookings/user` — Fetch all bookings made by the authenticated user.
- `GET /api/bookings/owner` — Fetch all incoming booking requests for the owner's fleet.
- `POST /api/bookings/change-status` — Owner updates booking status (`confirmed`, `cancelled`, `pending`).

### Owner Management (`/api/owner`)
- `POST /api/owner/change-role` — Upgrade user account to owner role.
- `POST /api/owner/add-car` — Upload image & create new car with `driverAvailable` setting.
- `GET /api/owner/cars` — Fetch all cars listed by current owner.
- `POST /api/owner/toggle-car` — Toggle listing availability (`isAvaliable`).
- `POST /api/owner/delete-car` — Remove a car listing.
- `GET /api/owner/dashboard` — Aggregated stats (revenue, pending/confirmed counts, recent bookings).

---

## ⚙️ Installation & Local Setup

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB** connection string (Local or Atlas)
- **ImageKit** account credentials

### 1. Repository Setup
```bash
git clone https://github.com/anshsingh004/Dright.git
cd Dright
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` in `server/`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
```

Start backend:
```bash
npm start
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create `.env` in `client/`:
```env
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=$
```

Start frontend:
```bash
npm run dev
# Application accessible at http://localhost:5173
```

---

## 🧪 Verification & Automated Testing

To run the full suite of automated logic and validation tests:

```bash
# Verify date overlap & availability engine
node scratch/test_availability_logic.js

# Verify driver service, pickup options, and location consistency
node scratch/test_phase2_3_4.js

# Verify category recommendations and authentic reviews
node scratch/test_recommendations_and_reviews.js

# Verify client production compilation
cd client && npm run build
```

---

## 🛡️ Git Safety & Rollback Reference

A known-good baseline reference tag is permanently preserved:
```bash
git checkout baseline-known-good
```
All feature additions strictly maintain schema backward-compatibility. Old database records safely load defaults without requiring destructive migrations.

---

## 📄 License
This project is licensed under the **ISC License**.
