# Store 🛍️

A full-stack e-commerce web application with a clean UI, secure authentication, 
cart management, and integrated online payments via Stripe.

## Tech Stack

**Frontend**
- React + Vite
- TanStack Query (data fetching & caching)
- React Router DOM
- Tailwind CSS
- Axios
- Formik + Yup (form validation)
- React Slick (category slider)
- Lucide React (icons)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe (checkout sessions + webhooks)

## Features

- Browse products by category
- Product search and filtering
- User authentication (register / login / logout)
- Shopping cart with real-time item count
- Cash on delivery orders
- Online payment via Stripe hosted checkout
- Automatic order creation via Stripe webhook
- Order history in user profile
- Fully responsive design

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Stripe account + Stripe CLI (for local webhook testing)

### Installation

# Clone the repo
git clone https://github.com/your-username/store.git

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd frontend && npm install

### Environment Variables

**Backend `.env`**
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
CLIENT_URL=http://localhost:5555

**Frontend `.env`**
VITE_API_URL=http://localhost:5000/api/v1

### Running Locally

# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev

# Terminal 3 — Stripe webhook forwarding
stripe listen --forward-to localhost:5000/webhook-checkout
```

---

### GitHub repo topics to add
```
react nodejs mongodb express stripe tailwindcss ecommerce fullstack tanstack-query
