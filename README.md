# 🛒 SHOPEZ - MERN E-Commerce Platform

A full-stack E-Commerce web application built using the **MERN Stack** that provides a complete online shopping experience with secure user authentication, product browsing, shopping cart, and order management.

---

## 🌐 Live Demo

### 🚀 Frontend
https://shopez-pi.vercel.app

### ⚙️ Backend API
https://shopez-rffp.onrender.com

---

## 📸 Features

- 🔐 JWT Authentication (Register & Login)
- 🛍️ Browse Products
- 🔎 Product Search
- 📄 Product Details Page
- 🛒 Shopping Cart
- ➕ Update Product Quantity
- ❌ Remove Cart Items
- 🧹 Clear Cart
- 📦 Place Orders
- 📋 View Order History
- 👨‍💼 Admin Product Management APIs
- 📄 Pagination
- 📱 Responsive UI
- ☁️ MongoDB Atlas Integration
- 🚀 Fully Deployed

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- React Icons
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- CORS
- dotenv

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
SHOPEZ
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Kotesh127/SHOPEZ.git
```

Move into the project

```bash
cd SHOPEZ
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run Backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm start
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Products

| Method | Endpoint |
|---------|----------|
| GET | `/api/products` |
| GET | `/api/products/:id` |
| GET | `/api/products/search` |

### Cart

| Method | Endpoint |
|---------|----------|
| GET | `/api/cart` |
| POST | `/api/cart` |
| PUT | `/api/cart/:id` |
| DELETE | `/api/cart/:id` |
| DELETE | `/api/cart` |

### Orders

| Method | Endpoint |
|---------|----------|
| GET | `/api/orders` |
| POST | `/api/orders` |

---

## 🔒 Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

Protected APIs require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📷 Screenshots

> Add screenshots of:
>
> - Home Page
> - Product Details
> - Cart
> - Orders
> - Login
> - Register

---

## 🚀 Future Enhancements

- Online Payment Gateway (Stripe/Razorpay)
- Wishlist
- Product Reviews & Ratings
- Admin Dashboard
- Image Uploads
- User Profile
- Order Tracking
- Email Notifications
- Coupon System

---

## 👨‍💻 Author

**Kotesh Ambati**

GitHub:
https://github.com/Kotesh127



---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
