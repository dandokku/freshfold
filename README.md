# FreshFold – Laundry Booking Web Application (Client)

## Overview

**FreshFold** is the client-side of a MERN stack laundry booking web application.
It allows users to browse laundry services, book appointments, manage their profiles, and track booking history.
This is the **React/Tailwind front-end**, which communicates with a backend API ([freshfoldserver](https://freshfoldserver.onrender.com)) for authentication, bookings, and pricing data.

## Tech Stack

* **React 18** – Component-based UI
* **React Router v6** – Page routing
* **Redux Toolkit** – State management
* **React Query** – Data fetching & caching
* **Axios** – HTTP requests
* **Tailwind CSS 3** – Styling
* **Framer Motion** – Animations
* **React Toastify** – Notifications
* **Stripe** – Payment integration
* **Styled Components** – Scoped styling for specific sections
* **React Datepicker / React Select** – Form UI components
* **Swiper** – Sliders for showcasing services

## Features

* **User Authentication** – JWT-based login & registration
* **Service Booking** – Browse services, select a slot, book and pay
* **Profile Management** – View & edit personal information
* **Booking History** – Review and track past and upcoming orders
* **Dynamic Pricing Page** – Service cost breakdown
* **Contact Form** – Integrated with EmailJS for direct messages
* **Protected Routes** – Pages accessible only to logged-in users
* **Responsive Design** – Fully functional on mobile, tablet, and desktop

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/dandokku/freshfold.git
   cd freshfold
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables**
   Create a `.env` file with:

   ```env
   REACT_APP_API_URL=https://freshfoldserver.onrender.com
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

## API Integration

The app expects a backend with endpoints for:

* **Auth** – `/api/users/login`, `/api/users/register`, `/api/users/me`
* **Bookings** – `/api/bookings`
* **Services & Prices** – `/api/services`, `/api/prices`

JWT is stored in `localStorage` as `"user-jwt"` and sent in the `x-auth-token` header.

## Deployment

Can be deployed to **Netlify**, **Vercel**, or similar platforms.
Make sure the backend is deployed and CORS is configured to allow requests from your frontend domain.

 
