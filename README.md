# Dright - Car Rental Platform

Dright is a full-stack car rental application designed to provide a seamless experience for both users looking to rent cars and car owners wanting to list their vehicles.

## 🚀 Features

### For Users
-   **Browse Cars:** Extensive catalog of available cars with filtering options.
-   **Car Details:** Detailed information including high-quality images, pricing, and specifications.
-   **Booking System:** Intuitive booking process with calendar selection.
-   **User Dashboard:** Manage current and past bookings.
-   **Responsive Design:** Optimized experience across desktop and mobile devices.

### For Car Owners
-   **Owner Dashboard:** Comprehensive dashboard to track earnings and car status.
-   **Add/Manage Cars:** Easy-to-use interface for listing new vehicles with image uploads.
-   **Booking Management:** Accept or decline booking requests in real-time.

## 🛠 Tech Stack

### Client (Frontend)
-   **React (Vite):** Fast and lightweight frontend build tool.
-   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
-   **Framer Motion:** Library for smooth animations and gesture interactions.
-   **Axios:** Promise-based HTTP client for API requests.
-   **React Router:** Declarative routing for single-page applications.
-   **React Hot Toast:** Elegant notifications for user feedback.

### Server (Backend)
-   **Node.js & Express:** Scalable server-side event-driven architecture.
-   **MongoDB & Mongoose:** NoSQL database with elegant object modeling.
-   **JWT (JSON Web Tokens):** Secure, stateless authentication mechanism.
-   **ImageKit:** Cloud service for real-time image optimization and storage.
-   **Multer:** Middleware for handling `multipart/form-data` (file uploads).

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   A MongoDB Database URI (local or Atlas).
-   An ImageKit Account (for handling image uploads).

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anshsingh004/Dright.git
    cd Dright
    ```

### Server Setup

2.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `server` directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    ```

5.  **Start the Server:**
    ```bash
    npm run server
    # OR
    npm start
    ```
    The server should now be running on `http://localhost:3000`.

### Client Setup

6.  **Open a new terminal and navigate to the client directory:**
    ```bash
    cd ../client
    ```

7.  **Install dependencies:**
    ```bash
    npm install
    ```

8.  **Configure Environment Variables:**
    Create a `.env` file in the `client` directory and add the following variables:
    ```env
    VITE_BASE_URL=http://localhost:3000
    VITE_CURRENCY=$
    ```
    *(Note: Ensure `VITE_BASE_URL` matches your server's address).*

9.  **Start the Client:**
    ```bash
    npm run dev
    ```
    The application should be accessible at `http://localhost:5173`.

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.
