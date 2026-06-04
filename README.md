# Outdoor Gear Product Detail Page (PDP)

## Overview

This project is a responsive Product Detail Page (PDP) built using React, Vite, TypeScript, and SCSS Modules. The application demonstrates a modern e-commerce product page with product variants, inventory management, cart functionality, and responsive design.

## Live Demo

Vercel:  https://outdoor-gear-store-nine.vercel.app

## GitHub Repository

GitHub: https://github.com/Dhaya063/outdoor-gear-store

---

## Features

### Product Information

* Product details fetched from Fake Store API
* Product image gallery with thumbnails
* Product title, price, and description

### Product Variants

* Color selection (Black, Blue, Green)
* Capacity selection (15L, 20L, 25L)
* Variant-specific stock management

### Inventory Management

* Available stock indication
* Low stock warning
* Sold-out state handling
* Quantity restriction based on available inventory

### Shopping Cart

* Add to Cart functionality
* Cart sidebar
* Cart item count
* Remove items from cart
* Clear cart functionality
* Cart persistence using localStorage

### User Experience

* Responsive design
* URL synchronization for selected variants
* Loading states
* Error handling
* Sticky cart sidebar

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Axios

### State Management

* Context API

### Styling

* SCSS Modules

### Deployment

* Vercel

### API

* Fake Store API

---

## Project Structure

```text
src/
│
├── app/
│   └── router/
│
├── assets/
│   └── images/
│
├── features/
│   ├── product/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   └── types/
│   │
│   └── cart/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       └── services/
│
└── shared/
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd outdoor-gear-pdp
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## Build

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

The application is deployed using Vercel.

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

---

## Assumptions

* Product variants are mocked locally.
* Product stock is managed on the frontend.
* Cart data is stored in localStorage.
* Product information is retrieved from Fake Store API.

---

## Future Improvements

* Backend inventory management
* Authentication and user accounts
* Wishlist functionality
* Product recommendations
* Checkout flow
* Unit and integration tests

---

## Author

Dhaya Baskar
