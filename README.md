# Dright — Premium Car Rental Marketplace

[![Live Deployment](https://img.shields.io/badge/Live_Demo-drightapp.vercel.app-0070f3?style=for-the-badge&logo=vercel)](https://drightapp.vercel.app/)
[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_+_Express_5-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47a248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

> **Dright** is a full-stack car rental application designed to provide a seamless experience for both users looking to rent cars and car owners wanting to list their vehicles. Built on the MERN stack with modern Tailwind CSS and Framer Motion animations, Dright features dynamic date-based availability, chauffeur options, home delivery fulfillment, and dual dashboards.

---

## 🚀 Implemented Features

### 🔍 Discovery & Availability
- **Car Discovery & Search:** Browse an extensive fleet with dynamic brand, model, transmission, and category keyword filtering.
- **Location-Based Search:** Search across 18 major metropolitan locations with a centralized, unified location engine.
- **Date-Based Automatic Availability:** Calculates availability dynamically on demand based on rental period overlap with active bookings.
- **Top 3 Category Recommendations:** Automatically surfaces the top 3 recommended vehicles in every category (SUVs, Sedans, Vans) ranked deterministically by model year and rate.

### 🚗 Booking & Rental Experience
- **Intuitive Booking Process:** Select pickup and return dates with interactive calendar restrictions preventing past dates or invalid ranges.
- **Car-Only / Chauffeur Option:** Choose between Self-Drive (*Car Only*) and *Car + Driver* when booking. Disabled with a clear alert if the owner does not offer driver service.
- **Pickup vs. Home Delivery:** Select *Pick up at location* or *Deliver to address* with direct street address capture.
- **User Dashboard (`/my-bookings`):** Track all current and past bookings with driver option, fulfillment tags, and delivery destinations.

### 💼 Owner Fleet Management (`/owner`)
- **Owner Dashboard:** Track fleet metrics, active bookings, completed rentals, and monthly revenue.
- **Add / Manage Cars:** List new vehicles with ImageKit cloud image optimization and toggle driver service availability.
- **Real-Time Booking Management:** Accept or decline incoming customer booking requests (`pending`, `confirmed`, `cancelled`).

### 🛡️ Authentication & Reviews
- **JWT Authentication:** Secure user and owner login and registration with bcrypt password encryption.
- **Authentic Reviews:** Rich, varied customer reviews covering chauffeur experience, vehicle condition, cleanliness, delivery ease, and booking value.

---

## 🛠 Technology Stack

### Client (Frontend)
- **React 19:** Component-based UI library.
- **Vite:** Next-generation frontend build tooling.
- **Tailwind CSS (v4):** Modern utility-first styling.
- **Framer Motion:** Declarative page transitions and micro-animations.
- **Axios:** Promise-based HTTP client for API communication.
- **React Router (v7):** Single Page Application client-side routing.
- **React Hot Toast:** Notification alerts for user feedback.

### Server (Backend)
- **Node.js:** Server-side JavaScript runtime.
- **Express.js (v5):** RESTful API micro-framework.
- **MongoDB Atlas & Mongoose:** NoSQL database with strict schema modeling.
- **JSON Web Tokens (JWT):** Stateless bearer token authentication.
- **Bcrypt:** Cryptographic salt-and-hash password encryption.
- **Multer:** Middleware for `multipart/form-data` uploads.
- **ImageKit:** Cloud media CDN for real-time WebP conversion and optimization.

---

## 🏗 Architecture & System Overview

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

- **React Client:** Serves the responsive SPA interface. Handles token persistence in `localStorage`, client-side date restrictions, and reactive filtering.
- **Express Server:** Provides modular controllers and routes (`/api/user`, `/api/bookings`, `/api/owner`) protected with custom JWT verification middleware.
- **MongoDB & Mongoose:** Enforces backward-compatible document schemas for `User`, `Car`, and `Booking`.
- **Authentication:** Stateless authentication via JWT headers (`Authorization: <token>`). Roles distinguish standard users from car owners.
- **Image Handling:** Vehicle images uploaded by owners are passed through Multer into memory buffers, uploaded directly to ImageKit, and transformed into optimized WebP URLs.

---

## 🔄 Core User Flows

### Customer Flow
```
Browse Fleet ──▶ Select Car ──▶ Choose Dates ──▶ Rental Option ──▶ Fulfillment ──▶ Confirm Booking
(Search/Filter) (Car Details)   (Calendar Min)   (Car/Driver)     (Pickup/Home)  (/my-bookings)
```

### Owner Flow
```
Login ──▶ Owner Portal ──▶ List Car ──▶ Set Driver Option ──▶ Manage Bookings ──▶ Confirm / Cancel
```

---

## 📅 Automatic Availability Logic

Car availability is evaluated dynamically without cron jobs or background pollers:

$$\text{Existing Booking: } \text{pickupDate} \le \text{Requested Return} \quad \text{AND} \quad \text{returnDate} \ge \text{Requested Pickup}$$

1. **Active Bookings:** Bookings with `status: "pending"` or `"confirmed"` mark the car as unavailable for overlapping dates.
2. **Cancelled Bookings:** Bookings with `status: "cancelled"` release the car immediately.
3. **Double-Booking Guard:** If two users request the same car for overlapping dates, the first submitted booking claims the vehicle; subsequent requests are rejected.

---

## 📁 Project Structure

```text
Dright/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── assets/             # Images, icons, and centralized cityList
│   │   ├── components/         # Reusable UI components (Navbar, CarCard, Recommendations, etc.)
│   │   ├── context/            # AppContext (global state, auth, cars, dates)
│   │   ├── pages/              # Pages: Home, Cars, CarDetails, MyBookings, Legal
│   │   │   └── owner/          # Owner Pages: Dashboard, AddCar, ManageCars, ManageBookings
│   │   ├── App.jsx             # Route definitions
│   │   └── main.jsx            # Entry point
│   ├── .env.example            # Client environment template
│   ├── package.json
│   ├── vercel.json             # Vercel SPA client-side rewrite rules
│   └── vite.config.js
│
├── server/                     # Express.js REST API Backend
│   ├── configs/                # MongoDB & ImageKit configurations
│   ├── controllers/            # userController, ownerController, bookingController
│   ├── middleware/             # authMiddleware (JWT verification)
│   ├── models/                 # Mongoose models: User, Car, Booking
│   ├── routes/                 # Express routers: userRoutes, ownerRoutes, bookingRoutes
│   ├── .env.example            # Server environment template
│   ├── package.json
│   ├── server.js               # Application entry point
│   └── vercel.json             # Serverless deployment configuration
│
├── README.md                   # Production documentation
└── .gitignore
```

---

## 📊 Database Schemas

### `User` Schema
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed with bcrypt)
- `role` (String, enum: `["user", "owner"]`, default: `"user"`)
- `image` (String, default avatar)

### `Car` Schema
- `owner` (ObjectId $\rightarrow$ User)
- `brand`, `model`, `image`, `description` (String, required)
- `year`, `pricePerDay`, `seating_capacity` (Number, required)
- `category` (String: Sedan, SUV, Van)
- `fuel_type` (String: Gas, Diesel, Petrol, Electric, Hybrid)
- `transmission` (String: Automatic, Manual, Semi-Automatic)
- `location` (String, matches centralized `cityList`)
- `isAvaliable` (Boolean, default: `true`, listing-level availability)
- `driverAvailable` (Boolean, default: `true`, chauffeur option availability)

### `Booking` Schema
- `car` (ObjectId $\rightarrow$ Car)
- `user` (ObjectId $\rightarrow$ User)
- `owner` (ObjectId $\rightarrow$ User)
- `pickupDate`, `returnDate` (Date, required)
- `price` (Number, total rental cost)
- `status` (String, enum: `["pending", "confirmed", "cancelled"]`, default: `"pending"`)
- `withDriver` (Boolean, default: `false`)
- `pickupOption` (String, enum: `["pickup", "delivery"]`, default: `"pickup"`)
- `deliveryAddress` (String, optional street address)

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Public | Register new user account |
| `POST` | `/api/user/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/user/data` | Authenticated | Fetch current user session data |
| `GET` | `/api/user/cars` | Public | List all active available cars |
| `POST` | `/api/bookings/check-availability` | Public | Check available vehicles for date range & city |
| `POST` | `/api/bookings/create` | Authenticated | Create booking with driver & fulfillment choice |
| `GET` | `/api/bookings/user` | Authenticated | Retrieve customer booking history |
| `GET` | `/api/bookings/owner` | Owner | Retrieve bookings for owner fleet |
| `POST` | `/api/bookings/change-status` | Owner | Update booking status (`confirmed`, `cancelled`) |
| `POST` | `/api/owner/change-role` | Authenticated | Upgrade user to owner role |
| `POST` | `/api/owner/add-car` | Owner | Add vehicle with image upload & driver toggle |
| `GET` | `/api/owner/cars` | Owner | List cars owned by logged-in user |
| `POST` | `/api/owner/toggle-car` | Owner | Toggle car listing availability |
| `POST` | `/api/owner/delete-car` | Owner | Remove car from marketplace |
| `GET` | `/api/owner/dashboard` | Owner | Fleet metrics and revenue analytics |


---

## 🔮 Future Scope

- **Online Payment Gateways:** (Stripe, Razorpay, UPI) — Currently using offline reservation settlement.
- **Email / SMS Notification Services:** (Resend, SendGrid, Twilio) — Newsletter and alerts reserved for post-submission.
- **Live GPS & Telematics:** Real-time driver navigation and route tracking.


---

## 📄 License
All rights reserved.
